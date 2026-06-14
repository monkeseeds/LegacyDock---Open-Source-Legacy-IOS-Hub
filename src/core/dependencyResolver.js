function packageMap(packages) {
  return new Map(packages.map((pkg) => [pkg.id, pkg]));
}

export function resolveInstallPlan(device, targetPackage, availablePackages) {
  const available = packageMap(availablePackages);
  const installed = new Set(device.installedPackages || []);
  const queue = [targetPackage.id];
  const installOrder = [];
  const missing = [];
  const conflicts = [];
  const seen = new Set();

  while (queue.length) {
    const id = queue.shift();
    if (installed.has(id) || seen.has(id)) continue;
    seen.add(id);

    const pkg = available.get(id);
    if (!pkg) {
      missing.push(id);
      continue;
    }

    for (const conflict of pkg.conflicts || []) {
      if (installed.has(conflict) || seen.has(conflict)) conflicts.push({ packageId: pkg.id, conflict });
    }

    for (const dependency of pkg.dependencies || []) {
      if (!installed.has(dependency)) queue.push(dependency);
    }

    installOrder.push(pkg.id);
  }

  return {
    target: targetPackage.id,
    installOrder,
    missing: [...new Set(missing)],
    conflicts,
    ready: missing.length === 0 && conflicts.length === 0
  };
}

export function summarizeDependencyPlan(plan) {
  if (plan.ready && plan.installOrder.length === 0) return `${plan.target} is already installed or already satisfied.`;
  if (plan.ready) return `Ready to install ${plan.installOrder.length} package(s).`;
  const parts = [];
  if (plan.missing.length) parts.push(`Missing: ${plan.missing.join(", ")}`);
  if (plan.conflicts.length) parts.push(`Conflicts: ${plan.conflicts.map((item) => `${item.packageId}/${item.conflict}`).join(", ")}`);
  return parts.join(". ");
}
