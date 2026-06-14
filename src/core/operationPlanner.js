import { evaluateCompatibility } from "../lib/compatibility.js";
import { resolveInstallPlan, summarizeDependencyPlan } from "./dependencyResolver.js";

const riskWeights = { low: 1, medium: 2, high: 3 };

export function planInstallOperation(device, targetPackage, availablePackages, options = {}) {
  const compatibility = evaluateCompatibility(device, targetPackage);
  const dependencyPlan = resolveInstallPlan(device, targetPackage, availablePackages);
  const riskWeight = riskWeights[targetPackage.risk] || 2;
  const blocks = [];
  const warnings = [];

  for (const check of compatibility.checks) {
    if (check.state === "block") blocks.push(check.detail);
    if (check.state === "warn") warnings.push(check.detail);
  }

  if (dependencyPlan.missing.length) blocks.push(`Unresolved dependencies: ${dependencyPlan.missing.join(", ")}.`);
  if (dependencyPlan.conflicts.length) warnings.push(`Known conflicts: ${dependencyPlan.conflicts.map((item) => item.conflict).join(", ")}.`);
  if (!options.snapshotId) warnings.push("No pre-install snapshot has been attached.");
  if (riskWeight >= 2) warnings.push(`${targetPackage.name} is marked ${targetPackage.risk} risk.`);

  const safeToQueue = blocks.length === 0;

  return {
    type: "install-package",
    safeToQueue,
    requiresSnapshot: true,
    requiresExplicitConfirmation: true,
    confirmationPhrase: `INSTALL ${targetPackage.id} ON ${device.identifier}`,
    targetPackageId: targetPackage.id,
    deviceId: device.id,
    compatibility,
    dependencyPlan,
    summary: summarizeDependencyPlan(dependencyPlan),
    blocks,
    warnings,
    execution: safeToQueue ? "queue-only" : "blocked",
    note: "LegacyDock plans operations locally first. A future device executor must re-check this plan immediately before mutating a device."
  };
}
