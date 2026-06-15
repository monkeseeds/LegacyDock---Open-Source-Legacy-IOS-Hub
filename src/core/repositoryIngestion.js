import { createHash } from "node:crypto";
import { parsePackageIndex } from "./packageIndex.js";

function sha256(value) {
  return `sha256:${createHash("sha256").update(String(value)).digest("hex")}`;
}

export function classifyRepositoryTrust(repository = {}) {
  if (repository.verified) return "verified";
  if (repository.category === "Archive") return "archive-review";
  if (repository.sslSupport === false) return "legacy-http";
  return "community";
}

export function packageIndexCachePolicy({ fetchedAt = new Date(), ttlHours = 12 } = {}) {
  const fetched = new Date(fetchedAt);
  const expires = new Date(fetched.getTime() + ttlHours * 60 * 60 * 1000);
  return {
    fetchedAt: fetched.toISOString(),
    expiresAt: expires.toISOString(),
    ttlHours,
    stale: Date.now() > expires.getTime()
  };
}

export function ingestPackageIndex({ repository, text, fetchedAt = new Date(), ttlHours = 12 }) {
  if (!repository?.id) throw new Error("Repository id is required.");
  if (!text || typeof text !== "string") throw new Error("Packages index text is required.");
  const packages = parsePackageIndex(text, repository.id);
  const cache = packageIndexCachePolicy({ fetchedAt, ttlHours });
  return {
    repositoryId: repository.id,
    url: repository.url,
    trust: classifyRepositoryTrust(repository),
    packageCount: packages.length,
    packageIndexHash: sha256(text),
    cache,
    packages,
    redistributionPolicy: "metadata-only",
    note: "LegacyDock stores metadata and package index facts. It must not mirror package payloads unless licensing explicitly allows it."
  };
}

export async function fetchPackageIndex(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || 8000);
  try {
    const response = await fetch(url, { signal: controller.signal, redirect: "follow" });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      redirected: response.redirected,
      finalUrl: response.url,
      text,
      fetchedAt: new Date().toISOString()
    };
  } finally {
    clearTimeout(timeout);
  }
}

export function repositoryHealthFromFetch(result) {
  if (!result?.ok) return { status: "offline", packageIndexAvailable: false, detail: `HTTP ${result?.status || "unavailable"}` };
  if (result.redirected) return { status: "degraded", packageIndexAvailable: Boolean(result.text), detail: "Redirect detected." };
  return { status: "online", packageIndexAvailable: Boolean(result.text), detail: "Package index fetched." };
}
