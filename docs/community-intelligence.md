# Community Intelligence

Community intelligence is LegacyDock's long-term moat, but it must be opt-in, privacy-focused, and explainable.

## Signals

The product can collect anonymous reports only after user consent:

- package install success or failure,
- device identifier,
- firmware,
- package version,
- repository source,
- battery impact,
- performance impact,
- crash or springboard restart categories,
- rollback outcome,
- dependency conflicts.

## Privacy Rules

- No account required for local use.
- Telemetry off by default.
- Anonymous install IDs should rotate.
- No personal files, device names, serial numbers, Apple IDs, or exact user notes.
- Users can inspect and export pending reports before upload.
- Cloud backups should be encrypted where feasible.

## Recommendation Inputs

Recommendations should combine:

- local compatibility rules,
- installed package conflicts,
- repository trust and freshness,
- opt-in community success rates,
- device performance profile,
- firmware-specific known issues,
- and snapshot availability.

The UI must always explain why something is recommended or blocked.
