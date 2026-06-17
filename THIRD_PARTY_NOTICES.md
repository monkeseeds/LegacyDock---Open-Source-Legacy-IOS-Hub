# Third-Party Notices

This file is the release-facing notice companion to [docs/third-party-license-review.md](docs/third-party-license-review.md).

## Current Handling

LegacyDock currently ships its own code and documentation plus open-source runtime dependencies resolved through the standard app build.

LegacyDock currently references, credits, or links to:

- Legacy iOS Kit
- iOS Obscura Server / iPhoneOS Obscura
- BigBoss
- SkyGlow
- Yzu
- Galactic Server
- MapsX
- TubeRepair
- Veteris
- SBSettings
- Activator
- iCleaner
- iFile
- RecordMyScreen
- ColoredKnob
- LiveWallpaper

These references are currently treated as prior art, metadata, compatibility notes, or user-controlled install guidance. They are not blanket permission to redistribute upstream binaries, packages, indexes, screenshots, or branding.

## Release Rule

Before any commercial or beta installer bundles an external binary or mirrored asset, add:

- upstream project name
- source URL
- version or commit
- attribution requirement
- redistribution decision
- review date

If that information is missing, do not bundle the asset.
