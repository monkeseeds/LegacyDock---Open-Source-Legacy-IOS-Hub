# Terms

LegacyDock is a preservation, diagnostics, and planning tool for user-controlled legacy iOS devices.

## User Responsibility

Users are responsible for complying with:

- device ownership rules
- local law
- Apple platform terms
- upstream software licenses
- repository and package maintainer terms

LegacyDock does not grant permission to bypass ownership, DRM, upstream licenses, or service terms.

## Repository And Package Policy

LegacyDock is metadata-first.

That means the project may store and present:

- repository names
- repository URLs
- package names
- compatibility notes
- community verification data
- install guidance

It must not mirror, vendor, or redistribute third-party package payloads unless the upstream license explicitly allows that distribution.

## Jailbreak And Restoration Workflows

LegacyDock may document or hand off to external jailbreak, restore, SHSH, ramdisk, or service-restoration tools. Those upstream projects remain separate and must be credited.

LegacyDock planning is not the same as LegacyDock executing an upstream tool. Commercial builds should keep that boundary obvious in the UI and docs.

## Safety And Mutations

Device-changing actions must require:

- explicit user confirmation
- snapshot checks
- rollback planning
- readable preflight explanations

Current mutation support remains dry-run only.

## Local Controls

LegacyDock includes local export, consent, and local data deletion controls in the desktop app. These controls apply to LegacyDock-managed local records only and do not delete:

- third-party repository data
- external tool data
- device-side package changes
- hosted cloud records that may exist later

## Hosted Services

Future hosted services such as sync, backups, teams, moderation, and billing remain optional. They should not block the local-first desktop experience.

No hosted account promises should be treated as production-ready until:

- privacy and retention terms are finalized
- export/delete parity is implemented
- Supabase auth and row-level security are active
- paid entitlements are wired and tested

## Release Channels

Preview and beta builds may be unsigned or partially operational until Windows code signing, hardware QA, and legal review are complete. Commercial marketing copy should not describe those builds as fully production-ready until those gates are actually closed.
