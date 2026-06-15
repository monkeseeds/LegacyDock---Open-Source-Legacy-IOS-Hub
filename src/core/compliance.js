export function privacyChecklist() {
  return [
    { id: "local-first", status: "complete", label: "Free diagnostics and snapshots work without an account." },
    { id: "telemetry-consent", status: "required", label: "Telemetry must be opt-in with a visible disable control." },
    { id: "data-export", status: "required", label: "Users need export for devices, snapshots, reports, submissions, and settings." },
    { id: "data-delete", status: "required", label: "Users need local and hosted deletion flows." },
    { id: "credential-safety", status: "required", label: "SSH credentials must never be persisted raw." },
    { id: "third-party-review", status: "required", label: "Repository/package prior-art and license review before bundling or mirroring." }
  ];
}

export function legalNotices() {
  return {
    jailbreakDisclaimer: "LegacyDock documents and plans user-controlled maintenance workflows. It must not bypass device ownership, licensing, DRM, or third-party terms.",
    repositoryPolicy: "Repository Hub is metadata-first and links to third-party sources with attribution. Package payload mirroring requires explicit license permission.",
    restorationPolicy: "Restoration guides should cite upstream projects and clearly separate LegacyDock planning from external execution tools.",
    license: "AGPL-3.0-only for this repository unless a future commercial licensing model is added by the owner."
  };
}

export function buildDataExport({ devices = [], snapshots = [], reports = [], settings = {}, submissions = [] } = {}) {
  return {
    schema: "legacydock.data-export.v1",
    generatedAt: new Date().toISOString(),
    devices,
    snapshots,
    reports,
    settings,
    submissions
  };
}

export function commercialComplianceStatus() {
  const checklist = privacyChecklist();
  return {
    ready: checklist.every((item) => item.status === "complete"),
    checklist,
    notices: legalNotices()
  };
}
