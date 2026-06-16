# Release And Updates

LegacyDock will ship Windows first. macOS and Linux are deferred until the Windows installer, signing, update, and hardware QA path is stable.

## Packaging Targets

- Active: Windows `nsis` setup `.exe`
- Active: Windows `msi`
- Deferred: macOS `dmg`
- Deferred: Linux `appimage` and `deb`

## Build Artifacts

GitHub Actions builds the first desktop installers:

- `LegacyDock-Windows`: NSIS `.exe` and MSI artifacts

Local Windows release command:

```bash
npm run desktop:build:windows
```

## Update Feed

The repository includes a placeholder Tauri-style update feed at:

```text
updates/stable.json
```

The production endpoints are planned as:

```text
https://updates.legacydock.com/latest.json
https://downloads.legacydock.com/releases/
```

Stable auto-update must stay disabled until release artifacts are signed and the feed contains real signatures.

## Release Requirements

- `npm run check`
- `npm test`
- `npm run desktop:frontend`
- `npm run desktop:build:windows`
- Signed Windows installer
- Checksums and provenance
- Third-party license review
- Hardware QA notes for any device-facing release
