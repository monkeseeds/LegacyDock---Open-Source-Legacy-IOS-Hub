import { createHmac, timingSafeEqual } from "node:crypto";

export const commercialFeatures = {
  free: ["doctor.scan", "repositories.health", "snapshots.local", "reports.export", "packages.compatibility"],
  care: ["care.repairPlan", "care.bootloopRisk", "care.timeline", "cloud.sync", "cloud.backup"],
  studio: ["team.workspaces", "shop.inventory", "priority.support", "moderation.queue"]
};

export function planFeatures(plan = "free") {
  if (plan === "studio") return [...commercialFeatures.free, ...commercialFeatures.care, ...commercialFeatures.studio];
  if (plan === "care" || plan === "care-yearly") return [...commercialFeatures.free, ...commercialFeatures.care];
  return [...commercialFeatures.free];
}

export function createLicensePayload({ customerId, plan = "free", issuedAt = new Date(), graceDays = 14 } = {}) {
  const issued = new Date(issuedAt);
  const offlineUntil = new Date(issued.getTime() + graceDays * 24 * 60 * 60 * 1000);
  return {
    customerId: customerId || "local-user",
    plan,
    features: planFeatures(plan),
    issuedAt: issued.toISOString(),
    offlineGraceUntil: offlineUntil.toISOString()
  };
}

export function signLicense(payload, secret = "development-only-secret") {
  return createHmac("sha256", secret).update(JSON.stringify(payload)).digest("hex");
}

export function verifyLicense({ payload, signature, secret = "development-only-secret", now = new Date() }) {
  if (!payload || !signature) return { valid: false, reason: "Missing license payload or signature." };
  const expected = signLicense(payload, secret);
  if (expected.length !== String(signature).length) return { valid: false, reason: "License signature mismatch." };
  const validSignature = timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  if (!validSignature) return { valid: false, reason: "License signature mismatch." };
  const expired = new Date(payload.offlineGraceUntil).getTime() < new Date(now).getTime();
  return {
    valid: !expired,
    reason: expired ? "Offline grace period expired." : "License valid.",
    plan: payload.plan,
    features: payload.features,
    offlineGraceUntil: payload.offlineGraceUntil
  };
}

export function stripeIntegrationPlan() {
  return {
    status: "deferred-for-windows-production-phase",
    checkout: "requires STRIPE_SECRET_KEY and published price ids when billing setup begins",
    customerPortal: "requires Stripe billing portal configuration when billing setup begins",
    webhooks: ["checkout.session.completed", "customer.subscription.updated", "customer.subscription.deleted"],
    localPolicy: "LegacyDock keeps free local diagnostics available without an account."
  };
}
