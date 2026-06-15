# Release And Updates

LegacyDock will ship Windows first, then macOS and Linux after signing and QA are ready.

## Packaging Targets

- First: Windows `nsis` and `msi`
- Later: macOS `dmg`
- Later: Linux `appimage` and `deb`

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
- `npm run desktop:build`
- Signed Windows installer
- Checksums and provenance
- Third-party license review
- Hardware QA notes for any device-facing release
