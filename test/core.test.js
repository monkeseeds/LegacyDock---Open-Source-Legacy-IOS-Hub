import test from "node:test";
import assert from "node:assert/strict";
import { devices, packages } from "../src/data/catalog.js";
import { mapLockdownInfoToDevice } from "../src/core/deviceAdapter.js";
import { parsePackageIndex, parseRelationshipList } from "../src/core/packageIndex.js";
import { resolveInstallPlan } from "../src/core/dependencyResolver.js";
import { planInstallOperation } from "../src/core/operationPlanner.js";

test("maps libimobiledevice lockdown output into a LegacyDock device profile", () => {
  const device = mapLockdownInfoToDevice({
    DeviceName: "Ryan's iPhone",
    ProductType: "iPhone5,2",
    ProductVersion: "8.4.1",
    BatteryCurrentCapacity: "87",
    TotalDataCapacity: "1000",
    AmountDataAvailable: "250"
  }, "udid-123");

  assert.equal(device.identifier, "iPhone5,2");
  assert.equal(device.chip, "A6");
  assert.equal(device.storageUsed, 75);
  assert.equal(device.batteryHealth, 87);
});

test("parses Debian package indexes and relationship fields", () => {
  assert.deepEqual(parseRelationshipList("mobilesubstrate (>= 0.9), preferenceloader | alt"), ["mobilesubstrate", "preferenceloader"]);

  const parsed = parsePackageIndex(`Package: com.example.tweak
Name: Example Tweak
Version: 1.0
Depends: mobilesubstrate, preferenceloader
Conflicts: oldtweak
Description: Useful legacy tweak
`, "fixture");

  assert.equal(parsed[0].id, "com.example.tweak");
  assert.equal(parsed[0].repository, "fixture");
  assert.deepEqual(parsed[0].dependencies, ["mobilesubstrate", "preferenceloader"]);
  assert.deepEqual(parsed[0].conflicts, ["oldtweak"]);
});

test("resolves install plans with missing dependencies", () => {
  const device = devices.find((item) => item.id === "ipad2-wifi-16");
  const pkg = packages.find((item) => item.id === "openssh");
  const plan = resolveInstallPlan(device, pkg, packages);

  assert.equal(plan.ready, false);
  assert.deepEqual(plan.missing, ["openssl", "berkeleydb"]);
});

test("blocks unsafe install plans before device mutation", () => {
  const device = devices.find((item) => item.id === "iphone4-black-32");
  const pkg = packages.find((item) => item.id === "batterylife");
  const plan = planInstallOperation(device, pkg, packages);

  assert.equal(plan.safeToQueue, false);
  assert.match(plan.confirmationPhrase, /INSTALL batterylife ON iPhone3,1/);
  assert.ok(plan.blocks.some((block) => block.includes("not in package metadata")));
});
