# LegacyDock Architecture

LegacyDock is designed as a local-first system with optional cloud services. The web prototype in this repository is intentionally static, but the code is organized around the same boundaries the native desktop app should use.

## Layers

| Layer | Responsibility |
| --- | --- |
| Landing site | Public project explanation, roadmap, trust model, and demo entry point |
| Console UI | Separate `console.html` app surface for device dashboard, marketplace, health scans, snapshots, preservation reports, and cloud settings |
| Data catalog | Seed data for devices, repositories, packages, snapshots, and plans |
| Local engines | iOS 6.x.x-9.x.x version catalog, compatibility scoring, repository scanning, snapshot creation, manifest diffing, report generation |
| Local core | CLI-ready modules for libimobiledevice discovery, Device Doctor diagnostics, Care repair planning, Debian package index parsing, dependency resolution, guarded install planning, and JSON persistence |
| Schemas | Stable contracts for device profiles, packages, repositories, snapshots, and community reports |
| Restoration Lab | SHSH preservation planning, restore-readiness guidance, jailbreak method lookup, and external toolkit handoff |
| Future adapters | libimobiledevice, AFC, SSH, package index parsers, restore-tool handoff, archive discovery connectors |

## Current Local Core

The repository now includes an executable local core under `src/core/`:

- `deviceAdapter.js` wraps `idevice_id` and `ideviceinfo` when `libimobiledevice` is installed.
- `deviceDoctor.js` builds explainable health scores, diagnostics, Care repair plans, community intelligence, bootloop risk, smart alternatives, modernization guidance, snapshot intelligence, and timeline data.
- `packageIndex.js` parses Debian `Packages` metadata into LegacyDock package records.
- `dependencyResolver.js` builds install plans, missing dependency lists, and conflict reports.
- `operationPlanner.js` combines compatibility, dependency, risk, snapshot, and confirmation requirements before any future mutation executor can run.
- `workspaceStore.js` persists local CLI state as JSON while the project is still pre-SQLite.

The current CLI is intentionally conservative: it can discover, inspect, parse, plan, snapshot, and report, but it does not mutate a connected device.

## Native App Direction

The likely production shape is:

1. Tauri desktop shell for macOS, Windows, and Linux.
2. Rust local core for device adapters, file IO, SQLite, and snapshot storage.
3. Web UI reused from this project.
4. Optional local HTTP or IPC API between the UI and the local core.
5. Cloud sync as an optional account-backed service, never required for local use.
6. External toolkit handoff for dangerous restore or jailbreak workflows until native safety gates are mature.

Electron remains a fallback if Node-native device libraries or cross-platform USB handling prove substantially easier there.

## Safety Boundary

LegacyDock should not run exploit chains, distribute copyrighted apps, bypass licensing, or hide risk. The product should manage user-owned devices, metadata, package state, repository health, backups, and preservation reports.

Every operation that changes a device should require:

- compatibility preview,
- explicit risk level,
- known issues,
- recovery option,
- snapshot recommendation,
- and clear user confirmation.
