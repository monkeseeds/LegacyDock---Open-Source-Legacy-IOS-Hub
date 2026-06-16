# Privacy

LegacyDock is local-first. Free diagnostics, snapshots, repository metadata, and preservation reports should work without an account.

## Data Stored Locally

- Device profiles and firmware metadata
- Repository URLs and package index metadata
- Snapshots and preservation reports
- Settings, entitlement state, and optional community submissions

## Telemetry

Telemetry must be off unless the user opts in. Crash reports and analytics must redact UDIDs, serial numbers, device names, credentials, repository secrets, and local file paths.

The desktop app now includes visible local consent controls for telemetry, crash reporting, privacy review, and terms review. Those controls are stored locally. Telemetry and crash reporting still remain inactive until hosted services are enabled and redaction rules are finalized.

## Export And Deletion

Users can export a text setup report and a local JSON workspace bundle from the desktop app. Users can also delete local LegacyDock browser-state records from the desktop app. Hosted cloud data deletion is still required before paid cloud features launch.

## Local Tools

LegacyDock can use a repo-local `libimobiledevice` install at `tools/libimobiledevice/win-x64` or a path supplied through `LEGACYDOCK_LIBIMOBILEDEVICE_DIR`. Device detection remains local-first and should not upload UDIDs or pairing metadata.

## Credentials

SSH passwords and private keys must never be stored raw. Device credentials must be user-provided per session or stored only through a secure OS keychain integration.
