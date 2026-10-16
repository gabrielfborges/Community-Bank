import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { createRequire } from "node:module";

export type SqliteStatement = {
  run(...params: unknown[]): { changes: number; lastInsertRowid: number | bigint };
};

export type SqliteDatabase = {
  exec(sql: string): void;
  prepare(sql: string): SqliteStatement;
};

type DatabaseSyncConstructor = new (filename: string) => SqliteDatabase;

const require = createRequire(import.meta.url);
const { DatabaseSync } = require("node:sqlite") as {
  DatabaseSync: DatabaseSyncConstructor;
};

export function createSqliteDatabase(
  filename = "data/community-bank.db"
): SqliteDatabase {
  mkdirSync(dirname(filename), { recursive: true });
  const database = new DatabaseSync(filename);

  database.exec(`
    CREATE TABLE IF NOT EXISTS credit_requests (
      id TEXT PRIMARY KEY,
      enterprise_name TEXT NOT NULL,
      enterprise_document TEXT NOT NULL,
      requested_amount REAL NOT NULL,
      purpose TEXT NOT NULL,
      term_months INTEGER NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  return database;
}