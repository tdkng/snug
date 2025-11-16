#!/usr/bin/env bash
# DOES NOT WORK
# Helper to run 'act' with recommended flags for this repo
# Usage:
#   ./scripts/run-act.sh [GOOGLE_PLACES_API_KEY]
# Example:
#   ./scripts/run-act.sh test-dummy-key

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# Allow overriding the full-image mapping via env var or first arg
# Usage: ./scripts/run-act.sh [GOOGLE_PLACES_API_KEY] [IMAGE]
DEFAULT_IMAGE="ghcr.io/catthehacker/ubuntu:full-20.04"
IMAGE=${2:-${ACT_IMAGE:-$DEFAULT_IMAGE}}
ARCH="linux/amd64"

# First arg is API key (optional). Second arg is IMAGE (optional).
API_KEY=${1:-test-dummy-key}

if ! command -v act >/dev/null 2>&1; then
  echo "error: 'act' is not installed. See https://github.com/nektos/act for installation instructions." >&2
  exit 1
fi

echo "Running act with mapped ubuntu image and Docker socket..."
echo "  image: $IMAGE"
echo "  arch:  $ARCH"

cd "$REPO_ROOT"

# If the mapped image is not present locally, pre-pull it so you can see progress
# and cancel if it's taking too long. Pulling the full image can be several hundred MBs.
if ! docker image inspect "$IMAGE" >/dev/null 2>&1; then
  echo "Image $IMAGE not found locally. Pulling now (this can take several minutes)..."
  if ! docker pull "$IMAGE"; then
    echo "Warning: failed to pull $IMAGE. You can set ACT_IMAGE to a different mapping or pre-pull the image manually." >&2
    echo "Example: docker pull $IMAGE" >&2
    # continue to run act anyway; act will try to pull too
  fi
fi

# Recommended flags:
# -P map ubuntu-latest to a fuller image with working apt and common tools
# --container-architecture set to amd64 on Apple Silicon if needed
# -s pass the Google API key as a secret (workflow expects it)
# --privileged -v /var/run/docker.sock mount Docker socket for docker build steps

## Safer local toolcache: create a writable toolcache & temp inside the repo so setup actions
## don't try to write to /opt/hostedtoolcache as a non-root user.
TOOLCACHE_DIR=${RUNNER_TOOL_CACHE:-"$REPO_ROOT/.act_toolcache"}
RUNNER_TEMP_DIR=${RUNNER_TEMP:-"$REPO_ROOT/.act_runnertemp"}

mkdir -p "$TOOLCACHE_DIR" "$RUNNER_TEMP_DIR"
chmod 0777 "$TOOLCACHE_DIR" "$RUNNER_TEMP_DIR"
export RUNNER_TOOL_CACHE="$TOOLCACHE_DIR"
export RUNNER_TEMP="$RUNNER_TEMP_DIR"

echo "Using RUNNER_TOOL_CACHE=$RUNNER_TOOL_CACHE"

# Write a small env-file for act to load so the variables are visible inside containers.
ENV_FILE="$REPO_ROOT/.act_env"
cat > "$ENV_FILE" <<EOF
RUNNER_TOOL_CACHE=$RUNNER_TOOL_CACHE
RUNNER_TEMP=$RUNNER_TEMP
EOF

chmod 0600 "$ENV_FILE"
trap 'rm -f "$ENV_FILE"' EXIT

# Prepare container options: mount toolcache and temp dirs plus host Maven cache to avoid
# re-downloading tools and dependencies on each run. Also mount Docker socket so jobs
# that run `docker build` can use the host daemon. Run as root inside container so
# setup actions can write into mounted locations.
HOST_M2_DIR="${M2_DIR:-$HOME/.m2}"
mkdir -p "$HOST_M2_DIR"

## Prefer running the container as your local user and add the docker socket's group
## so the job can access the Docker daemon without running as root. This is safer
## than always using `--user 0`.
DOCKER_SOCK="/var/run/docker.sock"
DOCKER_GID=""
# Create a writable HOME for the container processes so npm and other tools
# have a sane, writable home directory instead of falling back to '/'.
ACT_HOME_DIR="$REPO_ROOT/.act_home"
mkdir -p "$ACT_HOME_DIR"
chmod 0777 "$ACT_HOME_DIR"
export HOME="$ACT_HOME_DIR"

# Try to read docker socket gid (works on Linux and macOS with different stat flags)
if [ -e "$DOCKER_SOCK" ]; then
  if DOCKER_GID=$(stat -c '%g' "$DOCKER_SOCK" 2>/dev/null); then
    :
  else
    DOCKER_GID=$(stat -f '%g' "$DOCKER_SOCK" 2>/dev/null || true)
  fi
fi

# Prefetch commonly-used action repos into the act cache to avoid occasional
# git reset/clone errors that can happen when act fetches actions (particularly
# on networks or when tags/refs are ambiguous). This creates entries like:
#   $ACT_HOME_DIR/.cache/act/actions-setup-java@v4
# which act will copy into containers instead of cloning.
ACT_CACHE_DIR="$ACT_HOME_DIR/.cache/act"
mkdir -p "$ACT_CACHE_DIR"

prefetch_action() {
  local repo_url=$1
  local dest_name=$2
  local ref=$3
  local dest="$ACT_CACHE_DIR/$dest_name@$ref"
  if [ -d "$dest" ]; then
    echo "Action cache exists: $dest"
    return 0
  fi
  echo "Prefetching action $repo_url (ref=$ref) -> $dest"
  # Try shallow clone of the specified ref (branch or tag). If it fails, fall back
  # to a full clone to maximize chance of success.
  if git clone --depth 1 --branch "$ref" "$repo_url" "$dest" 2>/dev/null; then
    echo "Cloned $repo_url@$ref"
  else
    echo "Shallow clone failed; trying full clone for $repo_url@$ref"
    rm -rf "$dest"
    if git clone "$repo_url" "$dest"; then
      (cd "$dest" && git checkout "$ref" 2>/dev/null || true)
    else
      echo "Warning: could not prefetch $repo_url@$ref"
      rm -rf "$dest" || true
    fi
  fi
  chmod -R 0777 "$dest" || true
}

# Prefetch setup-java v4 (seen failing in act clones) and setup-node v3 as a no-op
prefetch_action "https://github.com/actions/setup-java" "actions-setup-java" "v4"

USER_ID=$(id -u)
USER_GID=$(id -g)

# On macOS file-sharing mounts often don't support chown from inside containers.
# Detect macOS and prefer the root fallback to avoid chown errors; on Linux we'll
# try to run as the non-root user and add the docker group so the container can
# access the socket without being root.
OS_NAME=$(uname -s || echo Unknown)
if [ "$OS_NAME" = "Darwin" ]; then
  echo "Detected macOS (Darwin). Shared mounts may not support chown from containers — running as root for compatibility."
  CONTAINER_OPTS=(--privileged --user 0)
else
  if [ -n "$DOCKER_GID" ] && [ "$DOCKER_GID" != "0" ]; then
    echo "Detected docker socket gid=$DOCKER_GID — running container as non-root user $USER_ID:$USER_GID with group-add"
    CONTAINER_OPTS=("--user" "$USER_ID:$USER_GID" "--group-add" "$DOCKER_GID")
  else
    echo "Could not determine docker socket gid or it's root; falling back to running as root inside container for compatibility"
    CONTAINER_OPTS=(--privileged --user 0)
  fi
fi

CONTAINER_OPTS+=("--volume" "$HOST_M2_DIR:/root/.m2")
CONTAINER_OPTS+=("--volume" "$TOOLCACHE_DIR:$TOOLCACHE_DIR")
CONTAINER_OPTS+=("--volume" "$RUNNER_TEMP_DIR:$RUNNER_TEMP_DIR")
# Mount HOME into the container so npm and other installers don't try to write to '/'
CONTAINER_OPTS+=("--volume" "$ACT_HOME_DIR:$ACT_HOME_DIR")
## Do NOT add an explicit mount for /var/run/docker.sock here - act will auto-mount
## the socket when available. Explicitly mounting it caused a "Duplicate mount point" error.
## If you hit permission denied for docker access, keep --privileged and --user 0 so the
## container process can use the auto-mounted socket.

# Join container options into a single string for act
CONTAINER_OPTS_STR=""
for opt in "${CONTAINER_OPTS[@]}"; do
  if [ -z "$CONTAINER_OPTS_STR" ]; then
    CONTAINER_OPTS_STR="$opt"
  else
    CONTAINER_OPTS_STR="$CONTAINER_OPTS_STR $opt"
  fi
done

echo "Mounting host Maven repo: $HOST_M2_DIR -> /root/.m2"
echo "Mounting toolcache: $TOOLCACHE_DIR"

# Run act with a default of single-job concurrency to avoid parallel docker cp
# races on some Docker/macOS setups. You can override by setting ACT_JOBS.
ACT_JOBS=${ACT_JOBS:-1}
echo "Running act with concurrency: $ACT_JOBS" 

# Diagnostic: list available workflows/jobs before running to help debug "no stages" errors.
echo "Listing workflows act sees..."
ACT_LIST_OUT="$REPO_ROOT/.act_list.txt"
act --list -P "ubuntu-latest=$IMAGE" --container-architecture "$ARCH" --env-file "$ENV_FILE" --container-options "$CONTAINER_OPTS_STR" >"$ACT_LIST_OUT" 2>&1 || true
cat "$ACT_LIST_OUT"

# If the user already provided -W (workflow file) or explicitly provided a job filter,
# forward the args directly to act (respect user's explicit selection).
if printf '%s\n' "$@" | grep -q -- '-W'; then
  echo "User provided -W; forwarding arguments to act."
  echo "About to run act with the following command:" >&2
  echo "act -P ubuntu-latest=$IMAGE --container-architecture $ARCH --env-file $ENV_FILE --container-options '$CONTAINER_OPTS_STR' -s GOOGLE_PLACES_API_KEY=$API_KEY -j $ACT_JOBS $*" >&2
  exec act -P "ubuntu-latest=$IMAGE" \
    --container-architecture "$ARCH" \
    --env-file "$ENV_FILE" \
    -s "GOOGLE_PLACES_API_KEY=$API_KEY" \
    --container-options "$CONTAINER_OPTS_STR" \
    -j "$ACT_JOBS" \
    "$@"
fi

# Detect duplicate job names (column 3 in act --list output). If duplicates exist,
# run act once per workflow file using -W so act can disambiguate jobs with the same name.
DUPLICATES=$(awk 'NF && $1 ~ /^[0-9]+/ {print $3}' "$ACT_LIST_OUT" | sort | uniq -c | awk '$1>1{print $2}' || true)
if [ -n "$DUPLICATES" ]; then
  echo "Detected duplicate job names: $DUPLICATES"
  echo "Running act once per workflow file with -W to disambiguate."
  rc=0
  for wf in .github/workflows/*.{yml,yaml}; do
    [ -e "$wf" ] || continue
    echo "Running workflow file: $wf"
    echo "act -P ubuntu-latest=$IMAGE --container-architecture $ARCH --env-file $ENV_FILE --container-options '$CONTAINER_OPTS_STR' -W $wf -s GOOGLE_PLACES_API_KEY=$API_KEY -j $ACT_JOBS $*" >&2
    if ! act -P "ubuntu-latest=$IMAGE" --container-architecture "$ARCH" --env-file "$ENV_FILE" --container-options "$CONTAINER_OPTS_STR" -W "$wf" -s "GOOGLE_PLACES_API_KEY=$API_KEY" -j "$ACT_JOBS" "$@"; then
      rc=$?
      echo "Workflow $wf failed with exit $rc"
      exit $rc
    fi
  done
  exit $rc
fi

# No duplicates detected — run act normally.
echo "About to run act with the following command:" >&2
echo "act -P ubuntu-latest=$IMAGE --container-architecture $ARCH --env-file $ENV_FILE --container-options '$CONTAINER_OPTS_STR' -s GOOGLE_PLACES_API_KEY=$API_KEY -j $ACT_JOBS $*" >&2

exec act -P "ubuntu-latest=$IMAGE" \
  --container-architecture "$ARCH" \
  --env-file "$ENV_FILE" \
  -s "GOOGLE_PLACES_API_KEY=$API_KEY" \
  --container-options "$CONTAINER_OPTS_STR" \
  -j "$ACT_JOBS" \
  "$@"
