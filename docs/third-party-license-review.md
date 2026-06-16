# Third-Party License Review

This repository currently uses third-party ecosystem names, URLs, and metadata as credited references. It does not vendor jailbreak tools, repository packages, or package payloads.

## Internal Audit Fields

Every dependency or bundled resource needs:

- dependency
- version
- source
- license
- attribution requirements
- redistribution rights
- modification rights
- commercial compatibility

## Reviewed References

| Reference | Use | Current Handling |
| --- | --- | --- |
| Legacy iOS Kit | Restore, downgrade, jailbreak, SHSH, and ramdisk prior art | Linked and credited only |
| iOS Obscura Server | Archive/search prior art | Linked and credited only |
| BigBoss, Cydia/Telesphoreo, ModMyi, Chariz, SkyGlow, Yzu, Galactic Server | Repository metadata examples | Metadata and links only |
| TubeRepair, MapsX, Veteris, SBSettings, iFile, Activator, iCleaner, RecordMyScreen, ColoredKnob, LiveWallpaper | Package/service examples | Catalog references only |

## Bundling Rule

Before bundling code, binaries, package payloads, screenshots, or mirrored indexes:

- Confirm the upstream license.
- Credit the maintainer.
- Preserve required notices.
- Avoid redistributing copyrighted package payloads without permission.
- Keep user acquisition and installation user-controlled.

## Current Status

Commercial releases should treat this as a preliminary review, not final legal approval.

No third-party binaries, package payloads, mirrored indexes, screenshots, or external resources should be bundled until the audit fields above are complete.
