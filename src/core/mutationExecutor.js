const allowedMutationTypes = new Set(["install-package", "add-repository", "remove-repository", "repair-action"]);

function preflightError(message) {
  return { ok: false, message };
}

export function buildRollbackPreview({ device, snapshot, plan }) {
  return {
    available: Boolean(snapshot?.id),
    snapshotId: snapshot?.id || null,
    deviceId: device?.id || plan?.deviceId || null,
    restoreScope: snapshot ? ["repositories", "packages", "preferences", "metadata"] : [],
    note: snapshot
      ? "Rollback preview is available before mutation execution."
      : "A verified snapshot is required before any mutation can execute."
  };
}

export function preflightMutation({ device, plan, snapshot, confirmationPhrase }) {
  if (!device) return preflightError("Device profile is required.");
  if (!plan) return preflightError("Operation plan is required.");
  if (!allowedMutationTypes.has(plan.type)) return preflightError(`Unsupported mutation type: ${plan.type}.`);
  if (plan.safeToQueue === false) return preflightError("Plan is blocked by safety checks.");
  if (plan.requiresSnapshot && !snapshot?.id) return preflightError("Verified snapshot is required.");
  if (plan.requiresExplicitConfirmation && confirmationPhrase !== plan.confirmationPhrase) {
    return preflightError(`Confirmation phrase must match: ${plan.confirmationPhrase}`);
  }
  return { ok: true, message: "Preflight passed." };
}

export function queueMutation({ device, plan, snapshot, confirmationPhrase, executorEnabled = false }) {
  const preflight = preflightMutation({ device, plan, snapshot, confirmationPhrase });
  const rollback = buildRollbackPreview({ device, snapshot, plan });

  if (!preflight.ok) {
    return {
      status: "blocked",
      execution: "none",
      preflight,
      rollback,
      deviceMutationEnabled: false
    };
  }

  return {
    status: executorEnabled ? "ready-for-executor" : "queued-dry-run",
    execution: executorEnabled ? "requires-native-executor" : "dry-run",
    preflight,
    rollback,
    deviceMutationEnabled: Boolean(executorEnabled),
    operation: {
      id: `op-${Date.now()}`,
      deviceId: device.id,
      type: plan.type,
      targetPackageId: plan.targetPackageId || null,
      warnings: plan.warnings || [],
      createdAt: new Date().toISOString()
    },
    note: executorEnabled
      ? "A native executor must re-run preflight immediately before touching the device."
      : "Commercial build queues a dry run only. No device was changed."
  };
}
