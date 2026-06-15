# Commercial Readiness Plan

LegacyDock now has a production-oriented local core, but the project should still be treated as a pre-release product until real device execution, signing, and operational systems are finished.

## What Is Real In This Repository

- Static marketing site, docs, changelog, pricing, and console UI.
- iOS 6.x.x through iOS 9.x.x compatibility catalog.
- Package compatibility scoring.
- Repository health checks.
- Explainable Device Doctor score model.
- Basic diagnostics for repositories, packages, dependencies, storage, battery, and compatibility.
- LegacyDock Care repair-plan, community-intelligence, bootloop-risk, smart-alternative, modernization, snapshot-intelligence, and health-timeline models.
- Snapshot and preservation report generation.
- `libimobiledevice` discovery adapter boundary.
- Debian `Packages` index parser.
- Dependency resolver.
- Safety-gated install operation planner.
- Local JSON workspace persistence for CLI workflows.
- Local API service for desktop-shell integration and commercial readiness checks.
- Console runtime bridge that hydrates catalog data from the local API and routes snapshots, install plans, and preservation reports through it when available.
- Node test suite for core product logic.

## Local Core Commands

```bash
npm run cli -- devices
npm run cli -- discover
npm run cli -- doctor iphone4-black-32
npm run cli -- plan-install iphone4-black-32 winterboard
npm run cli -- snapshot iphone4-black-32
npm run cli -- report iphone4-black-32
npm run cli -- parse-index ./Packages bigboss
npm run api
```

`discover` requires `libimobiledevice` tools such as `idevice_id` and `ideviceinfo` to be installed and available on `PATH`.

## Commercial Release Gates

- Build the native desktop shell with Tauri or Electron.
- Add signed installers for Windows, macOS, and Linux.
- Replace fixture package and device data with live adapters.
- Add read-only AFC package-state discovery.
- Add optional SSH repair adapter with credential safety.
- Add a durable SQLite store.
- Add cryptographic snapshot manifests and restore previews.
- Add device mutation executors only after preflight checks, snapshots, and rollback plans are stable.
- Add account, billing, encrypted cloud sync, and team inventory services for paid plans.
- Add privacy policy, terms, telemetry consent, and data export flows.
- Run physical QA across representative iOS 6, 7, 8, and 9 devices.
- Complete license review before copying, linking, or bundling GPL ecosystem tools.
