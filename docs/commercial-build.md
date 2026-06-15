# Commercial Build

This is the start of the commercial-ready product path. The current milestone adds a local API boundary plus a Tauri desktop scaffold with a React/Vite/Tailwind frontend and Rust native command layer.

## Local API

Run:

```bash
npm run api
```

Default URL:

```text
http://127.0.0.1:4317
```

## Endpoints

```text
GET  /api/status
GET  /api/commercial/readiness
GET  /api/commercial/desktop
GET  /api/storage/status
GET  /api/pricing/plans
GET  /api/devices
GET  /api/devices/:id
GET  /api/devices/:id/doctor
GET  /api/repositories
GET  /api/packages
POST /api/inspect/read-only
POST /api/install-plan
POST /api/mutations/queue
POST /api/repositories/ingest
POST /api/snapshots
GET  /api/preservation/:deviceId
GET  /api/entitlements/status
POST /api/entitlements/verify
GET  /api/cloud/status
POST /api/cloud/submissions
GET  /api/security/compliance
GET  /api/security/export
GET  /api/release/manifest
```

The API is local-first and conservative. It plans operations, creates local snapshots, generates reports, and exposes commercial readiness gates. It does not mutate connected devices.

## Commercial Contracts Added

- Tauri desktop workspace in `desktop/` and `src-tauri/`.
- Desktop Setup Wizard for welcome, detection, compatibility, repo health, essential setup, Device Doctor, service restoration, and final summary.
- Windows-first Tauri packaging targets: `nsis` and `msi`.
- Tauri update-feed scaffold at `updates/stable.json`.
- Rust SQLite migration runner in `src-tauri/src/migrations.rs`.
- Installed desktop npm dependencies, generated `desktop/package-lock.json`, fixed npm audit findings, and verified the React/Vite production frontend build.
- Desktop shell contract for menus, tray behavior, bundled local API startup, permissions, and update channels.
- Durable storage abstraction with a SQLite schema and JSON fallback when SQLite is unavailable.
- Read-only live device inspection parsers for Cydia sources, dpkg package state, package manager inference, and SSH credential policy.
- Safe mutation queue with snapshot, confirmation phrase, preflight, and rollback preview requirements.
- Package index ingestion for Debian `Packages` metadata, cache expiry, repository trust labels, and metadata-only redistribution policy.
- Local entitlement payloads with signed licenses, offline grace periods, feature gates, and Stripe integration requirements.
- Encrypted cloud sync envelopes, compatibility submissions, and hosted-service status contracts.
- Privacy/legal compliance checklist, data export contract, and release manifest for installers, checksums, provenance, and auto-update requirements.

## Console Integration

`console.html` now attempts to connect to the local API at startup. If the API is available, the console hydrates devices, repositories, packages, and pricing plans from the service. Snapshot capture, preservation report export, and package install planning also route through the API.

If the API is not running, the console stays usable in offline catalog mode with the built-in fixture data. A different API base can be supplied with:

```text
console.html?api=http://127.0.0.1:4317
```

The override is stored in local storage for future console sessions.

## Next Commercial Milestones

- Install local Rust, Cargo, and Tauri platform prerequisites.
- Connect real hardware through libimobiledevice, AFC, and opt-in SSH testing.
- Upgrade setup report export from text to PDF after the desktop PDF pipeline is selected.
- Add Stripe keys, price IDs, customer portal, and webhook deployment.
- Add hosted cloud storage, moderation queues, and recommendation services.
- Add signing certificates, notarization, installer publishing, and real signed auto-update feed entries.
- Add telemetry consent UI and hosted data deletion flows.
