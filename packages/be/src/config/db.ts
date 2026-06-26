import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.resolve(__dirname, '../../data/watchdog.db');

const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS apps (
    id TEXT PRIMARY KEY,
    app_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Stable'
  );

  CREATE TABLE IF NOT EXISTS endpoints (
    id TEXT PRIMARY KEY,
    app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Stable'
  );

  CREATE TABLE IF NOT EXISTS logs (
    id TEXT PRIMARY KEY,
    endpoint_id TEXT NOT NULL REFERENCES endpoints(id) ON DELETE CASCADE,
    response INTEGER NOT NULL,
    time TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
    endpoint_name TEXT NOT NULL,
    state TEXT NOT NULL,
    message TEXT NOT NULL DEFAULT '',
    fixed INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    update_interval INTEGER NOT NULL DEFAULT 60
  );

  CREATE TABLE IF NOT EXISTS user_apps (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, app_id)
  );
`);

export default db;
