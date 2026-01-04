# Snug

Snug is an interactive web app for finding nearby cafes and study spots.
Now viewable at [snug-spot.vercel.app](snug-spot.vercel.app), but still WIP.

Built with:
- Frontend: React, Vite, Tailwind, Vercel
- Backend: Spring Boot, PostgreSQL, Google Places API, Render

<!-- 
Quick start (consumers)
------------------------

If you only want to run Snug (not develop it), use Docker:

```bash
docker pull timothydknguyen/snug-backend:latest
docker run --rm -p 8080:8080 tdkng/snug-backend:latest
```
 -->


Developer docs
--------------

For build, test, and development instructions, see `DEVELOPMENT.md`.
<!-- 
Developer helper scripts
------------------------

If you run CI locally with `act`, a convenience script is available at `scripts/run-act.sh` that runs `act` with the recommended flags (maps `ubuntu-latest` to a fuller image, forces amd64 on Apple Silicon, mounts the Docker socket, and passes a test Google API key by default).
 -->

Support
-------

Open an issue or contact [@tdkng](https://github.com/tdkng) for help.
