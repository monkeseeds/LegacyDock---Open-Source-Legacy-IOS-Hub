# LegacyDock Architecture

LegacyDock is designed as a local-first system with optional cloud services. The web prototype in this repository is intentionally static, but the code is organized around the same boundaries the native desktop app should use.

## Layers

| Layer | Responsibility |
| --- | --- |
| Landing site | Public project explanation, roadmap, trust model, and demo entry point |
| Console UI | Device dashboard, marketplace, health scans, snapshots, preservation reports, and cloud settings |
| Data catalog | Seed data for devices, repositories, packages, snapshots, and plans |
| Local engines | Compatibility scoring, repository scanning, snapshot creation, manifest diffing, report generation |
| Schemas | Stable contracts for device profiles, packages, repositories, snapshots, and community reports |
| Future adapters | libimobiledevice, AFC, SSH, package index parsers, archive discovery connectors |

## Native App Direction

The likely production shape is:

1. Tauri desktop shell for macOS, Windows, and Linux.
2. Rust local core for device adapters, file IO, SQLite, and snapshot storage.
3. Web UI reused from this project.
4. Optional local HTTP or IPC API between the UI and the local core.
5. Cloud sync as an optional account-backed service, never required for local use.

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
