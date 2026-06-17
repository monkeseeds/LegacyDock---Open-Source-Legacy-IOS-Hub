# Third-Party License Review

This review is the commercial-release inventory for upstream tools, libraries, ecosystem references, and repository metadata represented by LegacyDock.

## Current Rule

Right now LegacyDock may:

- credit upstream projects
- link to upstream repos, wikis, and community resources
- store metadata and compatibility notes
- show user-controlled install guidance

Right now LegacyDock must not:

- bundle third-party package payloads without permission
- mirror repository contents without permission
- ship external screenshots or branded assets without review
- imply ownership of upstream tweaks, repos, or restoration services

## Review Status Matrix

| Component | Current use | Bundled now | Commercial action before beta |
| --- | --- | --- | --- |
| React/Vite/Tailwind desktop frontend | App runtime and UI build chain | Yes, through the app build | Keep notices and dependency audit current |
| Tauri and Rust desktop shell | Native app shell, updater, commands | Yes, through the app build | Keep license notices and update policy documented |
| `libimobiledevice` tooling | Optional local device detection | Not committed as a shipped binary here | Verify redistribution rights before bundling in installers |
| Legacy iOS Kit | Prior art, restore/jailbreak guidance | No | Keep attribution and do not vendor code or binaries without review |
| iOS Obscura Server / iPhoneOS Obscura | Prior art, archive/reference links | No | Keep attribution and link-only handling unless permission changes |
| BigBoss, SkyGlow, Yzu, Galactic Server, and similar repos | Repository metadata examples | Metadata only | Confirm wording stays attribution-first and does not suggest repo ownership |
| MapsX, TubeRepair, Veteris, SBSettings, Activator, iCleaner, iFile, RecordMyScreen, ColoredKnob, LiveWallpaper | Compatibility and restoration examples | Metadata only | Do not bundle payloads or screenshots without explicit permission |
| GitHub-hosted update artifacts | App release delivery | Yes | Keep artifact provenance, checksums, and signing records |

## Required Audit Fields

Every bundled dependency, external tool, mirrored index, or packaged asset needs:

- component name
- source URL or repository
- version or commit
- current use inside LegacyDock
- whether it is bundled, downloaded, linked, or user-supplied
- attribution requirements
- redistribution status
- commercial compatibility decision
- owner of the review
- review date

## Before Bundling Any External Binary

Do all of the following first:

1. Confirm the upstream license or distribution terms.
2. Preserve required notices.
3. Credit the maintainer in user-visible docs when required.
4. Keep acquisition and installation user-controlled unless redistribution is explicitly allowed.
5. Record the decision in a reusable notice file or release artifact.

## Repository And Package Metadata Rule

LegacyDock should treat repository and package data as metadata unless explicit redistribution permission exists. Package indexes, screenshots, or mirrored archives should not be bundled by default just because they are publicly reachable.

## Current Release Decision

Status: **in progress**

What is ready:

- prior-art credits exist
- metadata-only handling is documented
- bundling rules are explicit

What is still required before a beta or commercial installer can claim full readiness:

- final review of every binary or tool placed in an installer
- review of any third-party screenshots or branded art
- explicit decision on whether `libimobiledevice` will be bundled or remain user-installed
- reusable third-party notice output for release artifacts
