import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { readJsonStore, updateJsonStore } from "./workspaceStore.js";

export const sqliteSchema = [
  `create table if not exists devices (
    id text primary key,
    payload text not null,
    updated_at text not null
  )`,
  `create table if not exists snapshots (
    id text primary key,
    device_id text not null,
    payload text not null,
    created_at text not null
  )`,
  `create table if not exists preservation_reports (
    id text primary key,
    device_id text not null,
    payload text not null,
    created_at text not null
  )`,
  `create table if not exists repositories (
    id text primary key,
    url text not null,
    payload text not null,
    checked_at text
  )`,
  `create table if not exists package_indexes (
    repository_id text primary key,
    payload text not null,
    fetched_at text not null,
    expires_at text not null
  )`,
  `create table if not exists health_history (
    id text primary key,
    device_id text not null,
    payload text not null,
    created_at text not null
  )`,
  `create table if not exists submissions (
    id text primary key,
    type text not null,
    status text not null,
    payload text not null,
    created_at text not null
  )`,
  `create table if not exists settings (
    key text primary key,
    value text not null,
    updated_at text not null
  )`,
  `create table if not exists entitlements (
    id text primary key,
    payload text not null,
    updated_at text not null
  )`
];

const defaultState = {
  devices: [],
  snapshots: [],
  reports: [],
  repositories: [],
  packageIndexes: [],
  healthHistory: [],
  submissions: [],
  settings: {},
  entitlements: []
};

function now() {
  return new Date().toISOString();
}

function id(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function commercialStoragePlan() {
  return {
    engine: "SQLite",
    status: "schema-ready",
    tables: sqliteSchema.map((statement) => statement.match(/table if not exists (\w+)/)?.[1]).filter(Boolean),
    migrationCount: sqliteSchema.length,
    fallback: "JSON store is used when node:sqlite or a native SQLite driver is unavailable."
  };
}

async function tryOpenSqlite(databasePath) {
  try {
    const sqlite = await import("node:sqlite");
    const DatabaseSync = sqlite.DatabaseSync || sqlite.default?.DatabaseSync;
    if (!DatabaseSync) return null;
    await mkdir(dirname(databasePath), { recursive: true });
    const database = new DatabaseSync(databasePath);
    for (const statement of sqliteSchema) database.exec(statement);
    return database;
  } catch {
    return null;
  }
}

export async function createDurableStore(options = {}) {
  const jsonPath = options.jsonPath || "work/commercial-store.json";
  const sqlitePath = options.sqlitePath || "work/legacydock.sqlite";
  const database = options.disableSqlite ? null : await tryOpenSqlite(sqlitePath);

  if (database) {
    const writePayload = database.prepare("insert or replace into settings (key, value, updated_at) values (?, ?, ?)");
    const readPayload = database.prepare("select value from settings where key = ?");

    return {
      engine: "sqlite",
      path: sqlitePath,
      schema: sqliteSchema,
      async get(key, fallback = null) {
        const row = readPayload.get(key);
        return row ? JSON.parse(row.value) : fallback;
      },
      async set(key, value) {
        writePayload.run(key, JSON.stringify(value), now());
        return value;
      },
      async append(collection, value) {
        const current = await this.get(collection, []);
        const item = { id: value.id || id(collection), createdAt: value.createdAt || now(), ...value };
        await this.set(collection, [item, ...current]);
        return item;
      },
      close() {
        database.close();
      }
    };
  }

  return {
    engine: "json-fallback",
    path: jsonPath,
    schema: sqliteSchema,
    async get(key, fallback = null) {
      const store = await readJsonStore(jsonPath, defaultState);
      return store[key] ?? fallback;
    },
    async set(key, value) {
      await updateJsonStore(jsonPath, defaultState, (store) => ({ ...store, [key]: value }));
      return value;
    },
    async append(collection, value) {
      const item = { id: value.id || id(collection), createdAt: value.createdAt || now(), ...value };
      await updateJsonStore(jsonPath, defaultState, (store) => ({
        ...store,
        [collection]: [item, ...(store[collection] || [])]
      }));
      return item;
    },
    close() {}
  };
}
