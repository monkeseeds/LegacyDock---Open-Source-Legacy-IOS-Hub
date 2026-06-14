# LegacyDock Product Blueprint

## Product Position

LegacyDock is a local-first operating center for iOS 6 through iOS 9 devices. It should be treated as preservation and maintenance infrastructure, not as a jailbreak tool, piracy surface, or package manager clone.

The durable promise is simple: connect a legacy Apple device, understand its state, and safely manage packages, repositories, repairs, snapshots, and archival records from one trusted app.

## MVP Scope

1. Desktop companion for macOS, Windows, and Linux.
2. Local device detection with model, identifier, firmware, jailbreak status, package manager, installed packages, repositories, storage, memory, and battery state.
3. Compatibility-aware package and repository browser.
4. Dependency and conflict explanation layer.
5. Health Center for dead repositories, duplicate sources, broken dependencies, cache waste, and risky packages.
6. Snapshot engine that captures packages, repositories, versions, preferences, metadata, and restore notes.
7. Preservation Mode that generates reproducible device reports and manifests.

## Technical Architecture

| Layer | Recommended Shape |
| --- | --- |
| Desktop shell | Tauri or Electron, chosen after validating device-library bindings on all target OSes |
| Local core | Rust or TypeScript service with a stable local API |
| Device adapters | Pluggable adapter interface for libimobiledevice, AFC, SSH, package-manager parsing, and future connectors |
| Local data | SQLite for device profiles, manifests, snapshots, health scans, and repository metadata |
| Package intelligence | Local compatibility rules first, cloud/community signals optional |
| Snapshot storage | Content-addressed local archive with JSON manifests and checksums |
| Cloud | Optional sync, encrypted backups, community compatibility aggregation, workspaces, and analytics |

## Data Model

Core local entities:

- `DeviceProfile`: model, identifier, chip, firmware, jailbreak, services, storage, battery, and owner notes.
- `Repository`: source URL, status, last refresh, package index hash, duplicates, and trust metadata.
- `Package`: identifier, version, dependencies, conflicts, firmware ranges, screenshots, changelog, and source.
- `InstallReport`: device, package, result, risk, logs, timing, and optional anonymous community signal.
- `Snapshot`: package list, repositories, preferences, hashes, metadata, created date, and restore plan.
- `HealthIssue`: severity, explanation, affected component, recommendation, and recovery option.

## Safety Rules

- Every install, uninstall, repository repair, and cleanup action should have a preview.
- Risk warnings should be explicit and never hidden behind convenience language.
- Compatibility failures should explain the device, firmware, dependency, repository, or conflict that caused them.
- Risky operations should offer snapshot creation before execution.
- Telemetry and community reporting should be opt-in and exportable.

## Open-Core Boundary

Open-source local components can include the desktop app, local service, CLI, package scanner, compatibility checker, repository manager, local health scanner, and snapshot engine.

Cloud-owned components can include hosted sync, cloud backup infrastructure, community compatibility database, recommendation engine, analytics, team collaboration, hosted APIs, and premium workspace features.

This supports the business principle: the software is free, the convenience is paid.

## Roadmap

### Phase 1: Trustworthy Local Core

- Detect connected devices.
- Import installed package and repository state.
- Build local SQLite profile storage.
- Add read-only marketplace metadata.
- Create manual snapshots and preservation reports.

### Phase 2: Safe Management

- Add repository add, remove, verify, update, duplicate detection, and repair flows.
- Add dependency graph resolution.
- Add install previews with risk scoring.
- Add health scan recommendations.
- Add one-click restore from a local snapshot.

### Phase 3: Community Intelligence

- Add opt-in anonymous install and failure reporting.
- Build compatibility scoring by device, firmware, and package version.
- Add community success rate, battery impact, performance impact, and conflict reports.
- Add smart recommendations that work locally when cached.

### Phase 4: Cloud Convenience

- Add encrypted snapshot sync.
- Add device history, shared collections, favorites, and cross-device workspaces.
- Add Plus recommendations and Studio inventory features.
- Add hosted APIs for repair shops, researchers, and preservation partners.

## Pricing Shape

- Free: unlimited local devices, local snapshots, package management, repository management, compatibility checking, health scanning, and offline cache.
- Cloud at about $3/month: cloud sync, cloud backups, device history, collections, and favorites.
- Plus at about $7/month: unlimited history, smart recommendations, analytics, shared collections, and premium community features.
- Studio at about $15/month: team workspaces, inventory, shared backups, repair history, customer management, and priority support.

## Prototype Notes

The included static prototype demonstrates the intended first-run product shape:

- dashboard-first operating center,
- device-aware compatibility scores,
- package safety review before install,
- health scan repair recommendations,
- local snapshot timeline,
- preservation manifest preview,
- optional cloud positioning.

