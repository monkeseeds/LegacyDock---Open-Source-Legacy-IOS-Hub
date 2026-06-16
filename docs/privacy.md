# Privacy

LegacyDock is local-first. Free diagnostics, snapshots, repository metadata, and preservation reports should work without an account.

## Data Stored Locally

- Device profiles and firmware metadata
- Repository URLs and package index metadata
- Snapshots and preservation reports
- Settings, entitlement state, and optional community submissions

## Telemetry

Telemetry must be off unless the user opts in. Crash reports and analytics must redact UDIDs, serial numbers, device names, credentials, repository secrets, and local file paths.

Crash reporting and analytics are architecture-only for now. They must remain disabled by default until consent UI, redaction, export, and deletion flows are complete.

## Export And Deletion

Users must be able to export local data and delete local workspace data. Hosted cloud data deletion is required before paid cloud features launch.

## Credentials

SSH passwords and private keys must never be stored raw. Device credentials must be user-provided per session or stored only through a secure OS keychain integration.
