const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "..");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const values = {};
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

function resolveMaybeFile(value) {
  if (!value) return null;
  const resolved = path.isAbsolute(value) ? value : path.join(repoRoot, value);
  return fs.existsSync(resolved) ? fs.readFileSync(resolved, "utf8").trim() : null;
}

const fileEnv = {
  ...parseEnvFile(path.join(repoRoot, ".env")),
  ...parseEnvFile(path.join(repoRoot, ".env.local"))
};

const env = {
  ...fileEnv,
  ...process.env
};

const nodeBin = path.dirname(process.execPath);
if (nodeBin && !String(env.PATH || "").toLowerCase().includes(nodeBin.toLowerCase())) {
  env.PATH = `${nodeBin}${path.delimiter}${env.PATH || ""}`;
}

const defaultCargoBin = path.join(process.env.USERPROFILE || "", ".cargo", "bin");
if (defaultCargoBin && fs.existsSync(defaultCargoBin) && !String(env.PATH || "").toLowerCase().includes(defaultCargoBin.toLowerCase())) {
  env.PATH = `${defaultCargoBin}${path.delimiter}${env.PATH || ""}`;
}

if (!env.TAURI_SIGNING_PRIVATE_KEY && env.TAURI_SIGNING_PRIVATE_KEY_PATH) {
  const privateKey = resolveMaybeFile(env.TAURI_SIGNING_PRIVATE_KEY_PATH);
  if (privateKey) env.TAURI_SIGNING_PRIVATE_KEY = privateKey;
}

if (!env.TAURI_PUBLIC_KEY && env.TAURI_PUBLIC_KEY_PATH) {
  const publicKey = resolveMaybeFile(env.TAURI_PUBLIC_KEY_PATH);
  if (publicKey) env.TAURI_PUBLIC_KEY = publicKey;
}

const tauriEntry = path.join(repoRoot, "desktop", "node_modules", "@tauri-apps", "cli", "tauri.js");
const result = spawnSync(process.execPath, [tauriEntry, ...process.argv.slice(2)], {
  cwd: repoRoot,
  env,
  stdio: "inherit",
  shell: false
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 0);
