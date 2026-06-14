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
| Legacy iOS Kit handoff | Restore/downgrade research, SHSH preservation, jailbreak method lookup, SSH ramdisk planning | Should be external, credited, and gated behind warnings |

## iOS Obscura Server Credit

The project [CatsLover2006/iOSobscuraServer](https://github.com/CatsLover2006/iOSobscuraServer) is useful prior art for searching legacy iOS app archival metadata. It is GPL-3.0 licensed at the time this research note was written.

LegacyDock may eventually add a metadata-only archive discovery adapter inspired by that ecosystem. Any future integration should:

- credit the upstream project,
- respect its license,
- avoid copying code without preserving license obligations,
- avoid distributing copyrighted applications,
- focus on metadata, compatibility, and user-controlled preservation workflows.

## Legacy iOS Kit Credit

The project [LukeZGD/Legacy-iOS-Kit](https://github.com/LukeZGD/Legacy-iOS-Kit) is highly relevant prior art. Its README describes it as an all-in-one tool to restore or downgrade, save SHSH blobs, jailbreak legacy iOS devices, and more. It also documents broad 32-bit device support, selected 64-bit support, app management, data management, and miscellaneous utilities. The GitHub repository is listed as GPL-3.0 licensed.

The [Legacy iOS Kit Jailbreaking wiki](https://github.com/LukeZGD/Legacy-iOS-Kit/wiki/Jailbreaking) is especially useful as a compatibility reference because it separates jailbreak methods by device class and firmware range, and it calls out when sideloading, Safari-based flows, or PC/Mac execution are required.

LegacyDock should treat Legacy iOS Kit as:

- credited ecosystem prior art,
- an external handoff target for advanced restore, downgrade, jailbreak, and SSH ramdisk workflows,
- a source to study when designing device support matrices,
- and a reason to add SHSH and restore-readiness fields to preservation reports.

LegacyDock should not silently wrap destructive restore or jailbreak operations. A safe integration would:

- show exact device model, chip, and firmware,
- export a preservation report first,
- explain risk and tethered/semi-tethered constraints,
- link to the upstream guide,
- require explicit user confirmation before any future local execution,
- preserve GPL obligations if code is ever copied or derived.

Current repository status: no Legacy iOS Kit code is vendored or copied.

## Non-Goals

- No piracy marketplace.
- No paid app redistribution.
- No exploit hosting.
- No license circumvention.
- No hidden telemetry.
