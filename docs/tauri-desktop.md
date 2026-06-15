# Tauri Desktop Build

LegacyDock now has a Tauri desktop scaffold with a React, Vite, and Tailwind frontend plus a Rust native backend.

The first desktop experience is a Setup Wizard that guides beginners through device detection, compatibility, curated repositories, essential setup, Device Doctor, legacy service restoration, and a final local report.

## Stack

- Frontend: React, Vite, Tailwind, lucide-react
- Shell: Tauri v2
- Native layer: Rust commands
- Data: SQLite through `rusqlite`
- Repository checks: Rust `reqwest`
- Device detection: `libimobiledevice` command boundary
- Packaging: Windows `nsis` and `msi` first

## Workspace

```text
desktop/        React + Vite frontend
src-tauri/      Tauri configuration and Rust backend
assets/         Existing LegacyDock brand assets reused by the desktop app
```

## Commands

Node desktop dependencies have been installed and the React/Vite frontend build has been verified.

```bash
npm run desktop:install
npm run desktop:frontend
```

These still require Rust, Cargo, and Tauri platform prerequisites:

```bash
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

## Setup Wizard

The MVP wizard is local-only:

- No backend, accounts, cloud sync, or payments.
- Curated repository and compatibility data are bundled.
- Device detection uses the local Rust command boundary when available.
- No automatic installs or device mutations.
- Final summary can export a text report, copy repo URLs, and save the profile locally.

## Storage

`initialize_database` runs the Rust migration runner in `src-tauri/src/migrations.rs`. The first migration creates tables for devices, snapshots, repositories, package indexes, health history, submissions, settings, and entitlements.

## Setup Still Required

- Install Rust and platform build tools.
- Install Tauri prerequisites for Windows, macOS, or Linux.
- Install `libimobiledevice` for real USB detection.
- Add signing certificates before stable installers.
- Add physical device QA before enabling native mutation executors.

## Current Local Verification

- `npm run desktop:install` completed.
- `npm run desktop:frontend` completed.
- `npm --prefix desktop audit --json` reports 0 vulnerabilities.
- Rust/Cargo are not installed on this machine yet, so native Tauri compilation was not run.
