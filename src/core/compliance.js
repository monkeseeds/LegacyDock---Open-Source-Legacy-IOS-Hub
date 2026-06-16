export function privacyChecklist() {
  return [
    { id: "local-first", status: "complete", label: "Free diagnostics and snapshots work without an account." },
    { id: "telemetry-consent", status: "complete", label: "Telemetry and crash reporting are opt-in, disabled by default, and surfaced in desktop controls." },
    { id: "data-export", status: "complete", label: "Users can export devices, snapshots, reports, submissions, and settings from local flows." },
    { id: "data-delete", status: "complete", label: "Users can delete local LegacyDock workspace data; hosted deletion remains gated until cloud launch." },
    { id: "credential-safety", status: "complete", label: "SSH credentials are redacted and must never be persisted raw." },
    { id: "third-party-review", status: "required", label: "Repository/package prior-art and license review before bundling or mirroring." }
  ];
}

export function legalNotices() {
  return {
    jailbreakDisclaimer: "LegacyDock documents and plans user-controlled maintenance workflows. It must not bypass device ownership, licensing, DRM, or third-party terms.",
    repositoryPolicy: "Repository Hub is metadata-first and links to third-party sources with attribution. Package payload mirroring requires explicit license permission.",
    restorationPolicy: "Restoration guides should cite upstream projects and clearly separate LegacyDock planning from external execution tools.",
    privacyPolicy: "Telemetry, analytics, and crash reporting remain off until the user opts in and can export or delete the related local data.",
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
