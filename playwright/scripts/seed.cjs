// CommonJS seed script — writes directly to data/watchdog.db (what the server uses)
// Run from repo root: node playwright/scripts/seed.cjs
'use strict';
const Database = require('better-sqlite3');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const path = require('path');
const { mkdirSync } = require('fs');

// Backend resolves DB to packages/be/data/watchdog.db (__dirname = packages/be/src/config → ../../data)
const dbPath = path.resolve(__dirname, '../../packages/be/data/watchdog.db');
mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Ensure tables exist (idempotent)
db.exec(`
  CREATE TABLE IF NOT EXISTS apps (id TEXT PRIMARY KEY, app_name TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Stable');
  CREATE TABLE IF NOT EXISTS endpoints (id TEXT PRIMARY KEY, app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE, name TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Stable');
  CREATE TABLE IF NOT EXISTS logs (id TEXT PRIMARY KEY, endpoint_id TEXT NOT NULL REFERENCES endpoints(id) ON DELETE CASCADE, response INTEGER NOT NULL, time TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS reports (id TEXT PRIMARY KEY, app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE, endpoint_name TEXT NOT NULL, state TEXT NOT NULL, message TEXT NOT NULL DEFAULT '', fixed INTEGER NOT NULL DEFAULT 0);
  CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, update_interval INTEGER NOT NULL DEFAULT 60);
  CREATE TABLE IF NOT EXISTS user_apps (user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE, PRIMARY KEY (user_id, app_id));
`);

// Wipe existing test data
db.prepare("DELETE FROM users WHERE email = 'test@watchdog.dev'").run();
db.prepare("DELETE FROM apps WHERE app_name IN ('Production API', 'Staging API')").run();

const userId = uuidv4();
const hash = bcrypt.hashSync('password123', 10);
db.prepare('INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)').run(userId, 'testuser', 'test@watchdog.dev', hash);

const app1Id = uuidv4(); const app2Id = uuidv4();
db.prepare('INSERT INTO apps (id, app_name, status) VALUES (?, ?, ?)').run(app1Id, 'Production API', 'Stable');
db.prepare('INSERT INTO apps (id, app_name, status) VALUES (?, ?, ?)').run(app2Id, 'Staging API', 'Unstable');

const ep1Id = uuidv4(); const ep2Id = uuidv4(); const ep3Id = uuidv4();
db.prepare('INSERT INTO endpoints (id, app_id, name, status) VALUES (?, ?, ?, ?)').run(ep1Id, app1Id, 'https://httpstat.us/200', 'Stable');
db.prepare('INSERT INTO endpoints (id, app_id, name, status) VALUES (?, ?, ?, ?)').run(ep2Id, app1Id, 'https://httpstat.us/500', 'Down');
db.prepare('INSERT INTO endpoints (id, app_id, name, status) VALUES (?, ?, ?, ?)').run(ep3Id, app2Id, 'https://httpstat.us/200', 'Stable');

const now = new Date();
for (let i = 0; i < 8; i++) {
  const t = new Date(now - i * 60000).toISOString();
  db.prepare('INSERT INTO logs (id, endpoint_id, response, time) VALUES (?, ?, ?, ?)').run(uuidv4(), ep1Id, 200, t);
  db.prepare('INSERT INTO logs (id, endpoint_id, response, time) VALUES (?, ?, ?, ?)').run(uuidv4(), ep2Id, 500, t);
}
db.prepare('INSERT INTO reports (id, app_id, endpoint_name, state, message) VALUES (?, ?, ?, ?, ?)').run(uuidv4(), app1Id, 'https://httpstat.us/500', 'Down', 'Endpoint is returning 500');
db.prepare('INSERT INTO user_apps (user_id, app_id) VALUES (?, ?)').run(userId, app1Id);
db.prepare('INSERT INTO user_apps (user_id, app_id) VALUES (?, ?)').run(userId, app2Id);

db.close();
console.log('Seeded data/watchdog.db — user: test@watchdog.dev / password123');
