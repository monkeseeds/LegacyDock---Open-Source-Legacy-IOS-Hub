function appendField(record, field, value) {
  if (!field) return;
  record[field] = record[field] ? `${record[field]}\n${value}` : value;
}

export function parseDebianPackageIndex(text) {
  const records = [];
  let current = {};
  let activeField = null;

  for (const rawLine of String(text).split(/\r?\n/)) {
    if (!rawLine.trim()) {
      if (Object.keys(current).length) records.push(current);
      current = {};
      activeField = null;
      continue;
    }

    if (/^\s/.test(rawLine)) {
      appendField(current, activeField, rawLine.trim());
      continue;
    }

    const separator = rawLine.indexOf(":");
    if (separator === -1) continue;
    activeField = rawLine.slice(0, separator);
    current[activeField] = rawLine.slice(separator + 1).trim();
  }

  if (Object.keys(current).length) records.push(current);
  return records;
}

export function parseRelationshipList(value = "") {
  return String(value)
    .split(",")
    .map((item) => item.trim().split("|")[0].trim())
    .map((item) => item.replace(/\s*\(.+?\)\s*/g, "").trim())
    .filter(Boolean);
}

export function normalizePackageRecord(record, repositoryId = "local-index") {
  const id = record.Package;
  if (!id) return null;

  return {
    id,
    name: record.Name || record.Package,
    category: record.Section || "package",
    version: record.Version || "unknown",
    repository: repositoryId,
    firmwareRange: ["6.0", "9.3.6"],
    devices: [],
    dependencies: parseRelationshipList(record.Depends),
    conflicts: parseRelationshipList(record.Conflicts),
    rating: 0,
    communitySuccess: 90,
    risk: record.Section?.includes("System") ? "medium" : "low",
    batteryImpact: "unknown",
    performanceImpact: "unknown",
    summary: record.Description || "Imported from a Debian package index.",
    notes: record.Maintainer ? `Maintainer: ${record.Maintainer}` : "Imported package metadata."
  };
}

export function parsePackageIndex(text, repositoryId) {
  return parseDebianPackageIndex(text)
    .map((record) => normalizePackageRecord(record, repositoryId))
    .filter(Boolean);
}
