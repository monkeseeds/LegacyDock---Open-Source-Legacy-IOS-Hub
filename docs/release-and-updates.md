# Release And Updates

LegacyDock will ship Windows and macOS first. Linux packaging comes later after the first desktop release flow is stable.

## Packaging Targets

- First: Windows `nsis` setup `.exe`
- First: Windows `msi`
- First: macOS `dmg`
- Later: Linux `appimage` and `deb`

## Build Artifacts

GitHub Actions builds the first desktop installers:

- `LegacyDock-Windows`: NSIS `.exe` and MSI artifacts
- `LegacyDock-macOS`: DMG artifacts

Local Windows/macOS release commands:

```bash
npm run desktop:build:windows
npm run desktop:build:macos
```

## Update Feed

The repository includes a placeholder Tauri-style update feed at:

```text
updates/stable.json
```

Stable auto-update must stay disabled until release artifacts are signed and the feed contains real signatures.

## Release Requirements

- `npm run check`
- `npm test`
- `npm run desktop:frontend`
- `npm run desktop:build:windows`
- `npm run desktop:build:macos`
- Signed Windows installer
- Checksums and provenance
- Third-party license review
- Hardware QA notes for any device-facing release
