# Tauri Desktop Build

LegacyDock now has a Tauri desktop scaffold with a React, Vite, and Tailwind frontend plus a Rust native backend.

## Stack

- Frontend: React, Vite, Tailwind, lucide-react
- Shell: Tauri v2
- Native layer: Rust commands
- Data: SQLite through `rusqlite`
- Repository checks: Rust `reqwest`
- Device detection: `libimobiledevice` command boundary

## Workspace

```text
desktop/        React + Vite frontend
src-tauri/      Tauri configuration and Rust backend
assets/         Existing LegacyDock brand assets reused by the desktop app
```

## Commands

These require local setup of Node packages, Rust, and Tauri prerequisites:

```bash
npm run desktop:install
npm run desktop:dev
npm run desktop:build
```

The normal repository checks do not require that setup:

```bash
npm run check
npm test
```

## Native Commands

The Rust backend currently exposes:

```text
initialize_database
discover_devices
run_device_doctor
check_repository_health
parse_packages_index
plan_safe_mutation
```

The mutation command is dry-run only. It requires a snapshot and exact confirmation phrase before queuing, and still does not change a device.

## Setup Still Required

- Install Rust and platform build tools.
- Install Tauri prerequisites for Windows, macOS, or Linux.
- Run `npm run desktop:install`.
- Install `libimobiledevice` for real USB detection.
- Add signing certificates before stable installers.
- Add physical device QA before enabling native mutation executors.
