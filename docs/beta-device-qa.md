# Beta Device QA Runbook

LegacyDock beta builds must be tested with real legacy iOS hardware before release. This pass is read-only: no repo changes, package installs, restores, or repair actions should run automatically.

## Required Device Coverage

- at least one iOS 6 device
- at least one iOS 9 device
- one device with Cydia sources populated
- one device with any available Zebra, Installer 5, or Sileo state for detection checks

## Windows Tool Checks

Run these before launching the app:

```powershell
idevice_id -l
idevicepair pair
idevicepair validate
ideviceinfo
```

Expected result:

- `idevice_id -l` returns a UDID locally
- `idevicepair validate` succeeds after the device trusts the computer
- `ideviceinfo` returns model and `ProductVersion`
- no UDID, backup, or package data is sent to hosted services during local QA

## App Flow

1. Open LegacyDock.
2. Run `Setup > Detect`.
3. Confirm model, firmware, battery/storage fields, and connection status.
4. Open `Console > Devices` and confirm the detected profile appears.
5. Open `Console > Repositories` and verify curated repo guidance is still manual.
6. Open `Console > Packages` and check package-manager labels for Cydia, Zebra, Installer 5, or Sileo where available.
7. Open `Console > Device Doctor` and confirm findings are explanatory and non-mutating.
8. Open `Console > Reports` and export the setup report, workspace JSON, and QA checklist.

## Release Gate

A build can move toward beta only after:

- real-device detection works on the target Windows machine
- package-manager state is read-only detected
- exports contain no secrets
- hosted auth remains optional
- updater regression has been tested from the prior version
- privacy, terms, and third-party license review remain current
