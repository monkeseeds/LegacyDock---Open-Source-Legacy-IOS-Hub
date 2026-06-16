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
- Desktop shell contract for app menus, tray behavior, bundled local service startup, permissions, and update policy.
- Tauri v2 desktop scaffold with React, Vite, Tailwind, and Rust command modules for diagnostics, repository checks, package parsing, database initialization, device discovery, and dry-run mutation planning.
- Desktop Setup Wizard for local, beginner-friendly legacy iOS setup across detection, compatibility, repositories, recommendations, Device Doctor, service restoration, and summary reports.
- Windows-only Tauri packaging targets, updater plugin wiring, signed update-artifact generation, static manifest generation, signing-secret placeholders, privacy notes, terms, and preliminary third-party license review.
- SQLite schema and durable storage abstraction with JSON fallback for development environments.
- Read-only live inspection parsers for Cydia sources, dpkg status, package manager inference, and SSH credential policy.
- Safe mutation queue with preflight checks, required snapshots, confirmation phrases, and rollback previews.
- Package index ingestion pipeline for Debian `Packages` metadata, cache expiry, trust labels, and metadata-only repository handling.
- Local entitlement model with signed license payloads, offline grace periods, feature gates, and deferred billing integration requirements.
- Encrypted cloud sync envelope, compatibility submission, moderation status, and hosted cloud service contracts.
- Privacy/legal compliance checklist, data export contract, and release manifest.
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

- Install and configure the local Windows Tauri desktop toolchain.
- Add signed Windows installers for Windows 10 and Windows 11.
- Publish the generated updater manifest and signed installer artifacts to the hosted update endpoints.
- Replace fixture package and device data with live hardware adapters after physical-device QA.
- Package a real SQLite driver and migration runner inside the desktop app.
- Add native AFC/SSH execution paths after read-only inspection is validated.
- Add cryptographic snapshot manifests and restore previews.
- Enable device mutation executors only after hardware preflight, snapshots, rollback, and recovery workflows are proven.
- Add Supabase-hosted optional sync, reports, moderation, backups, and team inventory services.
- Add billing checkout, portal, webhooks, and hosted entitlements later.
- Extend the completed local consent/export/delete flows with hosted account deletion before cloud launch.
- Run physical QA across representative iOS 6, 7, 8, and 9 devices.
- Complete license review before copying, linking, or bundling GPL ecosystem tools.

See [Windows Production Setup](windows-production-setup.md) for the current Windows-only release checklist.
