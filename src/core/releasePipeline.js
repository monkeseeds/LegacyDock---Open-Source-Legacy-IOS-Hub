export function releaseManifest(version = "0.1.0") {
  return {
    product: "LegacyDock",
    version,
    channels: ["dev", "beta", "stable"],
    targets: [
      { os: "windows", format: "msi/nsis", signing: "required-before-stable", active: true },
      { os: "macos", format: "dmg", signing: "deferred", active: false },
      { os: "linux", format: "appimage/deb", signing: "deferred", active: false }
    ],
    checks: [
      "npm run check",
      "npm test",
      "desktop smoke launch",
      "API health smoke",
      "beta release checklist",
      "hardware QA matrix",
      "third-party license review"
    ],
    artifacts: ["installer", "checksums", "SBOM", "release notes", "provenance attestation"],
    autoUpdate: {
      channelAware: true,
      requiresSignedArtifacts: true,
      rollback: "retain previous installer metadata"
    },
    crashReporting: {
      default: "off",
      requiresConsent: true,
      redaction: ["udid", "serial", "device name", "repo credentials"]
    }
  };
}

export function buildProvenance({ gitCommit, version, artifacts = [] } = {}) {
  return {
    schema: "legacydock.release-provenance.v1",
    product: "LegacyDock",
    version: version || "0.1.0",
    gitCommit: gitCommit || "unknown",
    generatedAt: new Date().toISOString(),
    artifacts: artifacts.map((artifact) => ({
      name: artifact.name,
      sha256: artifact.sha256,
      size: artifact.size || null
    }))
  };
}
