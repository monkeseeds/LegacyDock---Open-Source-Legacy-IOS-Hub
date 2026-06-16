# Windows Production Setup

LegacyDock is targeting Windows 10 and Windows 11 first. macOS and Linux remain future targets, but the active development, QA, packaging, signing, and update flow is Windows-only for this phase.

## Local Toolchain

Required on a Windows build machine:

- Node.js LTS or newer
- pnpm
- Rust and Cargo
- Microsoft C++ Build Tools or Visual Studio Build Tools
- WebView2 Runtime
- `libimobiledevice` tools on `PATH` for real device detection

Verify:

```bash
node -v
pnpm.cmd -v
rustc --version
cargo --version
idevice_id --version
```

On this machine, Node is available and `pnpm.cmd` reports `11.0.9`. Rust/Cargo and `libimobiledevice` were not detected on `PATH`, so native Tauri packaging and real USB device validation still require local setup.

## Commands

```bash
npm run check
npm test
npm run desktop:frontend
npm run desktop:build:windows
```

The Windows installer target builds NSIS `.exe` and MSI artifacts only.

## Configuration

Copy `.env.example` to `.env` for local development. Never commit real secrets.

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
TAURI_PUBLIC_KEY=
UPDATE_ENDPOINT=https://updates.legacydock.com/latest.json
APP_ENV=development
```

Cloud features must remain optional. The app should still run local diagnostics, repository management, compatibility checks, snapshots, backups, restoration guidance, and reports without an account or internet connection.

## Signing

Production Windows releases need an OV code-signing certificate first, with future EV compatibility. Store certificate material only in local secret storage or GitHub Actions secrets:

```text
WINDOWS_CERTIFICATE
WINDOWS_CERTIFICATE_PASSWORD
WINDOWS_CERTIFICATE_THUMBPRINT
```

Do not hardcode signing credentials in source control. Unsigned builds are preview-only.

## Secure Updates

The intended production update endpoints are:

```text
https://updates.legacydock.com/latest.json
https://downloads.legacydock.com/releases/
```

Updater signing keys must be generated outside the repository. Commit only the public key after it exists; keep the private key in a secret manager:

```text
TAURI_PUBLIC_KEY
TAURI_SIGNING_PRIVATE_KEY
TAURI_SIGNING_PRIVATE_KEY_PASSWORD
```

Stable auto-update must stay disabled until signed installers, signed update metadata, rollback metadata, checksums, and release provenance are all verified.

## Supabase Architecture

Supabase is the preferred backend when cloud features begin. Planned tables/services:

- Auth and user profiles
- Device metadata
- Community reports
- Compatibility database
- Package metadata
- Collections and teams
- Snapshots and repair reports
- Moderation queues
- Storage for user-controlled backups

Every table needs Row Level Security before production. Service keys must never ship in the desktop app. The app should use a small API abstraction so hosted sync can be disabled without breaking local workflows.

## Privacy And Telemetry

Telemetry, analytics, and crash reporting are disabled by default. Any future collection must be explicit opt-in, redacted, visible to the user, exportable, and removable. Local-only mode must remain available.

## Device Integration

All device communication stays behind an adapter boundary. The app should not couple UI or product logic directly to `libimobiledevice`.

Current expected adapter capabilities:

- Device detection
- Pair validation
- Device metadata retrieval
- Firmware, model, and identifier lookup
- Connection and disconnect handling
- Clear errors when drivers, trust, or pairing are missing

## Release Flow

```text
Development -> Internal testing -> Beta -> Production -> Signed Windows installer -> Secure updates -> Rollback support
```

Every production release should be signed, versioned, reproducible, checksumed, and supported by QA notes for Windows 10, Windows 11, and actual iOS 6-9 hardware.
