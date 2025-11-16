<!--
TIM NOTES (private):
- This file contains developer-focused instructions. Keep personal notes for Tim in HTML comments so they don't display to consumers.
-- Examples: TODOs, preferred Maven/JDK versions, local debugging hints.
-- Remove or migrate private notes as needed before public sharing.
-- End of private notes.
-->

# Development - Snug

This document contains instructions for developers who want to build, test, and run Snug from source.

Contents:
- Building the backend
- Building the frontend
- Running tests
- Dockerized builds (no local Maven/JDK required)
- Local CI with `act` and troubleshooting

---

## Build the backend (native)

Requirements:
- JDK (recommended: Temurin 17+ or JDK 24 depending on branch)
- Maven 3.6+

Install examples:

- macOS (Homebrew):
```bash
brew install maven
```

- Ubuntu/Debian:
```bash
sudo apt-get update && sudo apt-get install -y maven
```

Build:

```bash
cd backend
mvn -B clean package
```

The compiled JAR will be in `backend/target/`.

## Build the frontend (native)

Install Node.js (LTS). From repo root:

```bash
cd frontend
npm install
npm run build
```

## Run (recommended): Docker-first (no Maven or JDK required locally)

The backend uses a multi-stage Dockerfile. The final image includes only the JRE and the built JAR, so consumers don't need Maven or a JDK.

Build the backend image locally:

```bash
docker build -t tdkng/snug-backend:latest ./backend
```

Run the backend:

```bash
docker run --rm -p 8080:8080 tdkng/snug-backend:latest
```

## Dockerized builds (no local Maven required)

If you or contributors do not want to install Maven/JDK locally, use the official Maven container to build:

```bash
docker run --rm -v "$PWD/backend":/usr/src/app -w /usr/src/app maven:3.9-eclipse-temurin-17 mvn -B clean package
```

This produces the JAR under `backend/target/`. Use the repo `backend/Dockerfile` (multi-stage) to produce a runtime image.

Build runtime image:

```bash
docker build -t tdkng/snug-backend:latest ./backend
```

Run runtime image:

```bash
docker run --rm -p 8080:8080 tdkng/snug-backend:latest
```

## Running tests

Backend:

```bash
cd backend
mvn test
```

Frontend:

```bash
cd frontend
npm test
```

## Local CI with `act` (notes & tips)

`act` is useful for running GitHub Actions locally but the default images are minimal and differ from GitHub-hosted runners. Common gotchas:

- `mvn: command not found` — lightweight node images used by `act` don't include Maven. Two options:
  1. Map `ubuntu-latest` to a fuller image and force container architecture on Apple Silicon:

     ```bash
     act -P ubuntu-latest=ghcr.io/catthehacker/ubuntu:full-20.04 --container-architecture linux/amd64 \
       -s GOOGLE_PLACES_API_KEY=test-dummy-key --privileged -v /var/run/docker.sock:/var/run/docker.sock
     ```

  2. Let the workflow install Maven when missing (the backend CI already has an `Ensure Maven is installed` step to help with local runs under `act`).

- `docker build` steps need Docker socket access. Use `--privileged -v /var/run/docker.sock:/var/run/docker.sock` with `act`.

- To run a single job locally with `act`:

```bash
act -j "Backend CI (Spring Boot + Maven)/build"
```

## Troubleshooting

- Apple M-series: some images are amd64-only. Use `--container-architecture linux/amd64` with `act` or use arm64-compatible images.
- If CI passes on GitHub but fails locally with `act`, it's usually due to missing preinstalled tools or lack of docker socket access.

## Notes about secrets and config

- The backend requires a Google Places API key in production. Tests and local profiles may override this. See `backend/src/main/resources/application.properties` and `application-test.properties` for configuration keys.
