# Integration Research

LegacyDock should use open-source ecosystem work respectfully and legally. This repository does not vendor third-party jailbreak projects or app archives. Instead, it defines adapter boundaries where compatible metadata integrations can be added later.

## Candidate Adapter Areas

| Adapter | Purpose | Notes |
| --- | --- | --- |
| libimobiledevice | Device identity, pairing, lockdown services, battery/storage metadata | Best candidate for cross-platform local detection |
| AFC | File access for package manager metadata and preferences | Requires careful read-only defaults |
| SSH | Advanced repair channel for jailbroken devices | Must be explicit, secured, and optional |
| APT repository parser | Packages, dependencies, conflicts, changelogs, repository health | Can power local compatibility checks |
| Archive discovery | Metadata search for preserved software and historical package references | Must avoid unauthorized redistribution |

## iOS Obscura Server Credit

The project [CatsLover2006/iOSobscuraServer](https://github.com/CatsLover2006/iOSobscuraServer) is useful prior art for searching legacy iOS app archival metadata. It is GPL-3.0 licensed at the time this research note was written.

LegacyDock may eventually add a metadata-only archive discovery adapter inspired by that ecosystem. Any future integration should:

- credit the upstream project,
- respect its license,
- avoid copying code without preserving license obligations,
- avoid distributing copyrighted applications,
- focus on metadata, compatibility, and user-controlled preservation workflows.

## Non-Goals

- No piracy marketplace.
- No paid app redistribution.
- No exploit hosting.
- No license circumvention.
- No hidden telemetry.
