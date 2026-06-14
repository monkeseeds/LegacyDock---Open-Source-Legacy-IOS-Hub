export function scanRepositories(device, repositories) {
  const selected = repositories.filter((repo) => device.repositories.includes(repo.id));
  const hashMap = new Map();
  const issues = [];

  selected.forEach((repo) => {
    if (repo.status === "slow") {
      issues.push({
        severity: "low",
        title: `${repo.name} is slow`,
        detail: `${repo.name} has not refreshed in ${repo.lastRefreshDays} days.`,
        action: "Refresh source"
      });
    }

    if (repo.lastRefreshDays > 30) {
      issues.push({
        severity: "medium",
        title: `${repo.name} package lists are stale`,
        detail: "Stale package indexes can hide dependency updates and conflict metadata.",
        action: "Rebuild index"
      });
    }

    const existing = hashMap.get(repo.packageIndexHash);
    if (existing) {
      issues.push({
        severity: "medium",
        title: "Duplicate repository index",
        detail: `${repo.name} mirrors the same package index as ${existing.name}.`,
        action: "Merge duplicate"
      });
    } else {
      hashMap.set(repo.packageIndexHash, repo);
    }
  });

  if (!device.services.includes("SSH")) {
    issues.push({
      severity: "low",
      title: "SSH repair channel unavailable",
      detail: "Some advanced recovery workflows need SSH. Only enable it when needed and secure credentials.",
      action: "Review access"
    });
  }

  return issues;
}
