import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const productChips = new Map([
  ["iPhone3,1", "A4"],
  ["iPhone3,2", "A4"],
  ["iPhone3,3", "A4"],
  ["iPhone4,1", "A5"],
  ["iPhone5,1", "A6"],
  ["iPhone5,2", "A6"],
  ["iPhone5,3", "A6"],
  ["iPhone5,4", "A6"],
  ["iPad2,1", "A5"],
  ["iPad2,2", "A5"],
  ["iPad2,3", "A5"],
  ["iPad2,4", "A5"],
  ["iPad2,5", "A5"],
  ["iPad2,6", "A5"],
  ["iPad2,7", "A5"],
  ["iPad3,1", "A5X"],
  ["iPad3,2", "A5X"],
  ["iPad3,3", "A5X"],
  ["iPod5,1", "A5"]
]);

function parseKeyValueOutput(text) {
  return String(text)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce((result, line) => {
      const index = line.indexOf(":");
      if (index === -1) return result;
      result[line.slice(0, index).trim()] = line.slice(index + 1).trim();
      return result;
    }, {});
}

function capacityPercent(total, available) {
  const totalNumber = Number(total);
  const availableNumber = Number(available);
  if (!Number.isFinite(totalNumber) || !Number.isFinite(availableNumber) || totalNumber <= 0) return null;
  return Math.round(((totalNumber - availableNumber) / totalNumber) * 100);
}

async function defaultRun(command, args, options = {}) {
  const { stdout } = await execFileAsync(resolveTool(command), args, {
    timeout: options.timeout || 8000,
    windowsHide: true
  });
  return stdout;
}

function executableName(tool) {
  return process.platform === "win32" && !tool.endsWith(".exe") ? `${tool}.exe` : tool;
}

function resolveTool(tool) {
  const executable = executableName(tool);
  const configuredRoot = process.env.LEGACYDOCK_LIBIMOBILEDEVICE_DIR;
  const candidates = [
    configuredRoot && join(isAbsolute(configuredRoot) ? configuredRoot : process.cwd(), executable),
    join(process.cwd(), "tools", "libimobiledevice", "win-x64", executable)
  ].filter(Boolean);

  const installed = candidates.find((candidate) => existsSync(candidate));
  return installed || executable;
}

function missingToolResult(tool, error) {
  return {
    available: false,
    tool,
    error: error.code === "ENOENT" ? `${tool} is not installed or not on PATH.` : error.message,
    setup: "Install libimobiledevice, pair the device, unlock it, and reconnect USB before retrying."
  };
}

export function mapLockdownInfoToDevice(info, udid) {
  const identifier = info.ProductType || "Unknown";
  const firmware = info.ProductVersion || "Unknown";
  const storageUsed = capacityPercent(info.TotalDataCapacity, info.AmountDataAvailable);
  const batteryHealth = Number(info.BatteryCurrentCapacity);

  return {
    id: udid,
    udid,
    name: info.DeviceName || identifier,
    identifier,
    chip: productChips.get(identifier) || "Unknown",
    firmware,
    os: "iOS",
    jailbreak: "unknown",
    manager: "unknown",
    packageCount: 0,
    repositoryCount: 0,
    storageUsed: storageUsed ?? 0,
    memoryPressure: 0,
    batteryHealth: Number.isFinite(batteryHealth) ? batteryHealth : null,
    status: "detected",
    services: ["Lockdown"],
    installedPackages: [],
    repositories: [],
    notes: "Detected through libimobiledevice. Package state requires AFC or SSH read access."
  };
}

export function createLibimobiledeviceAdapter(options = {}) {
  const run = options.run || defaultRun;

  async function listDeviceIds() {
    try {
      const output = await run("idevice_id", ["-l"]);
      return String(output).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    } catch (error) {
      return missingToolResult("idevice_id", error);
    }
  }

  async function readLockdownInfo(udid) {
    try {
      const output = await run("ideviceinfo", ["-u", udid]);
      return { available: true, info: parseKeyValueOutput(output) };
    } catch (error) {
      return missingToolResult("ideviceinfo", error);
    }
  }

  async function discoverDevices() {
    const ids = await listDeviceIds();
    if (!Array.isArray(ids)) return { available: false, devices: [], diagnostics: [ids] };
    const devices = [];
    const diagnostics = [];

    for (const udid of ids) {
      const result = await readLockdownInfo(udid);
      if (result.available) devices.push(mapLockdownInfoToDevice(result.info, udid));
      else diagnostics.push({ udid, ...result });
    }

    return { available: true, devices, diagnostics };
  }

  return { listDeviceIds, readLockdownInfo, discoverDevices };
}
