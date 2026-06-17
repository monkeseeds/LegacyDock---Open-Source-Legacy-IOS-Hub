# Beta Release Checklist

This is the working gate for a LegacyDock desktop beta. A release should not be called beta-ready unless every required item here is complete or explicitly waived.

## 1. Product Scope

- [ ] Version number, release notes, and changelog are finalized
- [ ] Release channel is set correctly: `beta`
- [ ] No placeholder pricing, support, or cloud claims remain in-app or on the site
- [ ] Docs match the current desktop behavior

## 2. Windows Build And Packaging

- [ ] `npm test` passes
- [ ] `npm run desktop:frontend` passes
- [ ] `npm run desktop:build:windows` passes
- [ ] NSIS installer generated
- [ ] MSI installer generated
- [ ] checksums recorded
- [ ] updater manifest generated
- [ ] previous installer retained for rollback

## 3. Signing And Update Flow

- [ ] updater artifacts signed
- [ ] Windows code-signing certificate applied
- [ ] hosted manifest points to the correct versioned installer
- [ ] in-app update check finds the hosted manifest
- [ ] update download verifies successfully
- [ ] upgrade path tested from previous version to new version
- [ ] rollback installer is available if update fails

## 4. Privacy, Terms, And Consent

- [ ] privacy notes reviewed in desktop app
- [ ] terms reviewed in desktop app
- [ ] local-only mode works
- [ ] telemetry stays off by default
- [ ] crash reporting stays off by default
- [ ] local export works
- [ ] local delete works
- [ ] hosted retention/delete policy is written before any cloud launch

## 5. License And Attribution

- [ ] third-party license review is updated
- [ ] prior-art credits are present
- [ ] no unreviewed third-party binaries are bundled
- [ ] no third-party package payloads are redistributed without permission
- [ ] screenshots and branding from upstream projects are reviewed

## 6. Real Device QA

Minimum matrix before beta sign-off:

| Device | Firmware | USB detect | Repo guidance | Doctor scan | Export/delete | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| iPhone 4 | iOS 6.1.3 | [ ] | [ ] | [ ] | [ ] | |
| iPhone 4s | iOS 8.x | [ ] | [ ] | [ ] | [ ] | |
| iPad 2 | iOS 9.3.5/9.3.6 | [ ] | [ ] | [ ] | [ ] | |
| iPod touch 4/5 | iOS 6-9 | [ ] | [ ] | [ ] | [ ] | |

## 7. Updater Regression Checks

- [ ] install previous version
- [ ] check for updates
- [ ] update is found
- [ ] signature verifies
- [ ] installer launches
- [ ] app restarts cleanly
- [ ] version label changes to the new version
- [ ] no consent, profile, or report data is unexpectedly lost

## 8. Go / No-Go Rules

Release is **no-go** if any of the following are true:

- Windows installer is unsigned
- updater manifest points to the wrong artifact
- export/delete is broken
- consent defaults are wrong
- real-device USB detection has not been validated on representative hardware
- third-party bundling status is unknown

Release can move to **beta go** when:

- Windows build, signing, updater, docs, privacy controls, and attribution are all verified
- at least one device per major supported iOS band has passed QA
- rollback path is documented and tested
