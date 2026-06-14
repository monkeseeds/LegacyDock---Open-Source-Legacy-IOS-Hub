# Device Doctor And LegacyDock Care

Device Doctor is LegacyDock's free diagnostics surface. LegacyDock Care is the premium intelligence layer that turns those diagnostics into safer, explainable repair decisions.

## Product Principle

Scanning is free. Intelligence is premium.

Free users should always be able to see what is wrong with a device. Care users get the safest recommended path to fix it, backed by local checks, snapshot awareness, and community intelligence.

## Free Device Doctor

Device Doctor includes:

- Overall health score.
- Performance score.
- Stability score.
- Battery score.
- Storage score.
- Compatibility score.
- Repository health score.
- Basic diagnostics for broken packages, missing dependencies, duplicate repositories, stale repositories, storage pressure, battery warnings, and compatibility problems.
- Basic explanations for what was found and why it matters.
- Snapshot reminders before risky changes.

Every score must remain explainable. Users should be able to see how LegacyDock calculated the result instead of trusting an opaque number.

## LegacyDock Care

LegacyDock Care adds:

- Intelligent repair plans.
- Community installs and success rates.
- Battery, performance, stability, crash, and conflict signals.
- Bootloop risk analysis.
- Smart alternatives for risky or poorly supported packages.
- Advanced device-specific and firmware-specific compatibility intelligence.
- Device modernization recommendations.
- Snapshot intelligence and rollback estimates.
- Health timeline for scans, repairs, snapshots, repository changes, installs, restores, and removals.

Care should educate users. It should explain what changed, why the recommendation exists, expected impact, risks, rollback availability, and confidence level.

## Safety Boundary

Device Doctor and Care should plan before they mutate.

Before any real device-changing action, LegacyDock should require:

- Device and firmware confirmation.
- Compatibility preview.
- Dependency and conflict review.
- Bootloop and stability risk.
- Snapshot or rollback state.
- Explicit user confirmation.

The current implementation plans and stages actions only. It does not execute destructive repairs on connected devices.
