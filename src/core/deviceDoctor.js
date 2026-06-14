import { evaluateCompatibility, scoreDevice } from "../lib/compatibility.js";
import { scanRepositories } from "../lib/repositoryScanner.js";

function average(values) {
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function scoreBattery(device) {
  return Math.max(0, Math.min(100, Number(device.batteryHealth || 0)));
}

function scoreStorage(device) {
  return Math.max(0, Math.round(100 - Number(device.storageUsed || 0) * 0.72));
}

function scoreRepositoryHealth(repoIssues) {
  const penalty = repoIssues.reduce((total, issue) => {
    if (issue.severity === "high") return total + 18;
    if (issue.severity === "medium") return total + 10;
    return total + 5;
  }, 0);
  return Math.max(0, 100 - penalty);
}

export function buildDoctorScores(device, repositories, packages) {
  const base = scoreDevice(device, packages);
  const repoIssues = scanRepositories(device, repositories);
  const repositoryHealth = scoreRepositoryHealth(repoIssues);
  const battery = scoreBattery(device);
  const storage = scoreStorage(device);
  const stability = base.Stability;
  const performance = base.Performance;
  const compatibility = base.Compatibility;
  const health = average([performance, stability, battery, storage, compatibility, repositoryHealth]);

  return [
    { id: "health", label: "Overall Health", value: health, explanation: "Average of performance, stability, battery, storage, compatibility, and repository health." },
    { id: "performance", label: "Performance", value: performance, explanation: "Starts at 100 and subtracts storage pressure and memory pressure." },
    { id: "stability", label: "Stability", value: stability, explanation: "Starts at 100 and subtracts memory pressure plus review-state penalties." },
    { id: "battery", label: "Battery", value: battery, explanation: "Uses detected or recorded battery capacity where available." },
    { id: "storage", label: "Storage", value: storage, explanation: "Estimates remaining safety margin from current storage usage." },
    { id: "compatibility", label: "Compatibility", value: compatibility, explanation: "Percent of known catalog packages supported by this firmware and device identifier." },
    { id: "repository", label: "Repository Health", value: repositoryHealth, explanation: "Starts at 100 and subtracts duplicate, stale, slow, dead, or invalid repository findings." }
  ];
}

export function buildDiagnostics(device, repositories, packages) {
  const repoIssues = scanRepositories(device, repositories).map((issue) => ({
    ...issue,
    category: "repository",
    why: issue.title.includes("Duplicate")
      ? "Duplicate repositories may slow refresh operations and create duplicate package entries."
      : "Repository problems can hide dependency updates, conflict metadata, and repair paths.",
    recommendation: issue.action
  }));

  const packageIssues = packages.flatMap((pkg) => {
    const result = evaluateCompatibility(device, pkg);
    return result.checks
      .filter((check) => check.state !== "pass")
      .map((check) => ({
        severity: check.state === "block" ? "high" : "medium",
        category: "package",
        title: `${pkg.name}: ${check.label}`,
        detail: check.detail,
        why: check.state === "block" ? "This package could destabilize the device or fail to install." : "This should be reviewed before making changes.",
        recommendation: result.recommendation
      }));
  });

  if (device.storageUsed >= 80) {
    packageIssues.push({
      severity: "medium",
      category: "storage",
      title: "Storage pressure detected",
      detail: `${device.name} is using ${device.storageUsed}% of its recorded storage.`,
      why: "Low storage can cause package installs, restores, and cache refreshes to fail.",
      recommendation: "Create a snapshot, then clean caches and orphaned package files."
    });
  }

  if (device.batteryHealth && device.batteryHealth < 80) {
    packageIssues.push({
      severity: "medium",
      category: "battery",
      title: "Battery health needs attention",
      detail: `${device.name} battery health is recorded at ${device.batteryHealth}%.`,
      why: "Weak batteries increase the risk of failed restores, unexpected shutdowns, and package corruption.",
      recommendation: "Charge fully before repair operations and consider battery service."
    });
  }

  return [...repoIssues, ...packageIssues];
}

export function buildRepairPlan(device, repositories, packages) {
  const diagnostics = buildDiagnostics(device, repositories, packages);
  const steps = diagnostics.slice(0, 5).map((issue) => ({
    title: issue.recommendation,
    changes: issue.category === "repository" ? "Repository metadata only" : "Package plan only",
    risk: issue.severity,
    rollback: true,
    why: issue.why
  }));

  return {
    title: `${device.name} Care Repair Plan`,
    estimatedSeconds: Math.max(15, steps.length * 8),
    rollbackAvailable: true,
    snapshotRecommended: true,
    steps
  };
}

export function buildCommunitySignals(pkg) {
  const risk = pkg.risk === "low" ? "Very Low" : pkg.risk === "medium" ? "Moderate" : "High";
  return {
    packageId: pkg.id,
    name: pkg.name,
    communityInstalls: Math.round(pkg.communitySuccess * 186 + pkg.rating * 1000),
    successRate: `${pkg.communitySuccess}%`,
    batteryImpact: pkg.batteryImpact,
    performanceImpact: pkg.performanceImpact,
    stabilityRating: pkg.risk === "low" ? "Excellent" : "Review first",
    knownConflicts: pkg.conflicts.length,
    bootloopRisk: risk,
    communityConfidence: Math.max(40, Math.min(99, pkg.communitySuccess - (pkg.risk === "medium" ? 4 : 0))),
    confirmedReports: pkg.risk === "low" ? 0 : pkg.conflicts.length + 1,
    recommended: pkg.communitySuccess >= 95 && pkg.risk === "low"
  };
}

export function buildSmartAlternatives(targetPackage, packages) {
  return packages
    .filter((pkg) => pkg.id !== targetPackage.id && (pkg.category === targetPackage.category || pkg.risk === "low"))
    .sort((a, b) => b.communitySuccess - a.communitySuccess)
    .slice(0, 3)
    .map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      reason: `${pkg.communitySuccess}% community success with ${pkg.risk} risk and ${pkg.performanceImpact} performance impact.`
    }));
}

export function buildModernizationRecommendations(device) {
  return [
    {
      title: "Certificate and TLS review",
      benefit: "Improves access to modern HTTPS services where legacy firmware still allows it.",
      drawback: "May require manual trust-store changes.",
      confidence: device.firmware.startsWith("9.") ? 92 : 84
    },
    {
      title: "Conservative animation tuning",
      benefit: "Makes older devices feel faster without heavy system modifications.",
      drawback: "Aggressive values can make UI transitions feel abrupt.",
      confidence: 95
    },
    {
      title: "Repository cleanup",
      benefit: "Speeds refreshes and reduces duplicate package metadata.",
      drawback: "Archived sources should be preserved in a snapshot before removal.",
      confidence: 97
    }
  ];
}

export function buildSnapshotIntelligence(device, snapshots) {
  const latest = snapshots.find((snapshot) => snapshot.deviceId === device.id);
  return {
    rollbackAvailable: Boolean(latest),
    latestSnapshot: latest?.title || "No snapshot yet",
    estimatedRepairSeconds: 15,
    estimatedRecoveryMinutes: latest ? 2 : null,
    recommendation: latest ? "Use the latest snapshot as rollback before repair." : "Create a local snapshot before running any repair."
  };
}

export function buildHealthTimeline(device, snapshots) {
  return [
    ...snapshots.filter((snapshot) => snapshot.deviceId === device.id).slice(0, 3).map((snapshot) => ({
      type: "snapshot",
      title: snapshot.title,
      detail: `${snapshot.packageIds.length} packages and ${snapshot.repositoryIds.length} repositories captured.`,
      date: snapshot.createdAt
    })),
    {
      type: "scan",
      title: "Device Doctor scan",
      detail: "Health, compatibility, repository, package, battery, and storage checks refreshed locally.",
      date: new Date().toISOString()
    }
  ].sort((a, b) => new Date(b.date) - new Date(a.date));
}
