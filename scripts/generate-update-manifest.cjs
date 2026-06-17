const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const tauriConfig = JSON.parse(fs.readFileSync(path.join(repoRoot, "src-tauri", "tauri.conf.json"), "utf8"));
const version = tauriConfig.version;
const notes = "LegacyDock desktop updater is now wired for signed Windows update artifacts, local update checks, and hosted manifest publishing.";
const nsisDir = path.join(repoRoot, "src-tauri", "target", "release", "bundle", "nsis");
const installerName = `LegacyDock_${version}_x64-setup.exe`;
const installerPath = path.join(nsisDir, installerName);
const signaturePath = `${installerPath}.sig`;

if (!fs.existsSync(installerPath)) {
  throw new Error(`Missing installer: ${installerPath}`);
}

if (!fs.existsSync(signaturePath)) {
  throw new Error(`Missing updater signature: ${signaturePath}`);
}

const manifest = {
  version,
  notes,
  pub_date: new Date().toISOString(),
  platforms: {
    "windows-x86_64": {
      signature: fs.readFileSync(signaturePath, "utf8").trim(),
      url: `https://bnauijvhhsawcvscsefx.supabase.co/storage/v1/object/public/legacydock-updates/releases/v${version}/${installerName}`
    }
  }
};

const outputPath = path.join(repoRoot, "updates", "stable.json");
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Updater manifest written to ${outputPath}`);
