import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

function deriveKey(secret) {
  return createHash("sha256").update(secret).digest();
}

export function encryptSyncPayload(payload, secret = "development-sync-secret") {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", deriveKey(secret), iv);
  const plaintext = JSON.stringify(payload);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    algorithm: "aes-256-gcm",
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64")
  };
}

export function decryptSyncPayload(envelope, secret = "development-sync-secret") {
  const decipher = createDecipheriv("aes-256-gcm", deriveKey(secret), Buffer.from(envelope.iv, "base64"));
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(envelope.ciphertext, "base64")),
    decipher.final()
  ]).toString("utf8");
  return JSON.parse(plaintext);
}

export function createCompatibilitySubmission({ deviceId, packageId, iosVersion, status, notes, contributor = "anonymous" }) {
  if (!deviceId || !packageId || !iosVersion || !status) throw new Error("Device, package, iOS version, and status are required.");
  return {
    id: `submission-${Date.now()}`,
    type: "compatibility-report",
    status: "pending-moderation",
    createdAt: new Date().toISOString(),
    contributor,
    payload: { deviceId, packageId, iosVersion, status, notes: notes || "" }
  };
}

export function cloudServiceStatus() {
  return {
    sync: "contract-ready",
    backups: "contract-ready",
    teamWorkspaces: "contract-ready",
    communityReports: "moderated-submissions-ready",
    hostedRecommendationEngine: "not-connected",
    auth: "decision-pending",
    rls: "schema-scaffolded",
    dataPolicy: "encrypt before upload; free diagnostics remain local"
  };
}
