import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export async function readJsonStore(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

export async function writeJsonStore(filePath, data) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return data;
}

export async function updateJsonStore(filePath, fallback, updater) {
  const current = await readJsonStore(filePath, fallback);
  const next = await updater(current);
  await writeJsonStore(filePath, next);
  return next;
}
