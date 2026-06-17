# Privacy

LegacyDock is local-first. Free diagnostics, snapshots, repository metadata, compatibility notes, and preservation reports should work without an account.

## Principles

- Keep device inspection local unless the user explicitly enables hosted features later.
- Keep telemetry and crash reporting off by default.
- Make consent visible, reversible, exportable, and deletable.
- Treat UDIDs, serials, pairing data, SSH credentials, repository secrets, and local file paths as sensitive.

## Data Stored Locally

LegacyDock can store:

- device profiles and firmware metadata
- repository URLs and package index metadata
- snapshots and preservation reports
- consent settings and local-only preferences
- optional compatibility submissions before upload
- entitlement state and update-channel preferences

Local exports now include the current consent state and data-handling contract so users can see exactly what LegacyDock is storing.

## Telemetry And Crash Reporting

Telemetry and crash reporting remain disabled unless the user opts in. When they are eventually enabled, they must:

- redact UDIDs, serial numbers, device names, repository credentials, and local file paths
- stay visible in the desktop app
- be included in export/delete flows
- remain optional for all local-first workflows

The desktop app currently exposes visible controls for:

- local-only mode
- telemetry opt-in
- crash-report opt-in
- privacy acknowledgement
- terms acknowledgement

Those controls are stored locally today.

## Export And Deletion

Users can currently:

- export a plain-text setup report
- export a local JSON workspace bundle
- save a local device profile
- delete local LegacyDock workspace data with an explicit confirmation phrase

The local delete flow clears LegacyDock-managed desktop records only. It does not remove:

- third-party repository data
- upstream tool data
- Cydia package changes already made on a device
- future hosted cloud data

Hosted account deletion, retention timing, and support response guarantees must be completed before cloud sync launches.

## Local Tools

LegacyDock can use a repo-local `libimobiledevice` install at `tools/libimobiledevice/win-x64` or a path supplied through `LEGACYDOCK_LIBIMOBILEDEVICE_DIR`.

Device detection remains local-first and should not upload:

- UDIDs
- pairing records
- lockdown values
- device-side package-state payloads

## Hosted Cloud Plan

Supabase is the planned optional backend for:

- encrypted sync
- hosted backups
- team workspaces
- moderation queues
- compatibility submissions
- paid entitlements later

Before that launches:

- row-level security must be active on every user table
- the service key must remain server-only
- storage buckets must be private by default
- delete/export parity must exist between local and hosted records

See [Supabase Cloud Contract](supabase-cloud.md) for the current scaffold.

## Credentials

SSH passwords and private keys must never be stored raw. Device credentials must be user-provided per session or stored only through a secure OS keychain integration.

## Support Boundary

LegacyDock is a preservation and diagnostics tool, not a warranty service. Privacy requests for hosted features should not be promised publicly until the hosted backend, support ownership, and deletion audit path are actually in place.
