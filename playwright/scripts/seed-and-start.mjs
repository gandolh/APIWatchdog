/**
 * Seeds a throwaway test SQLite database and starts the backend on port 3001.
 * Run from the repo root: node playwright/scripts/seed-and-start.mjs
 *
 * Teardown: Ctrl+C, then delete data/test-watchdog.db
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../../');
const dbPath = resolve(repoRoot, 'data/test-watchdog.db');

// Remove stale test DB
if (existsSync(dbPath)) {
  rmSync(dbPath);
  console.log('Removed stale test DB');
}
mkdirSync(resolve(repoRoot, 'data'), { recursive: true });

// Seed the DB directly (better-sqlite3 is synchronous, safe to import here)
const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS apps (
    id TEXT PRIMARY KEY, app_name TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Stable'
  );
  CREATE TABLE IF NOT EXISTS endpoints (
    id TEXT PRIMARY KEY, app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
    name TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Stable'
  );
  CREATE TABLE IF NOT EXISTS logs (
    id TEXT PRIMARY KEY, endpoint_id TEXT NOT NULL REFERENCES endpoints(id) ON DELETE CASCADE,
    response INTEGER NOT NULL, time TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY, app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
    endpoint_name TEXT NOT NULL, state TEXT NOT NULL, message TEXT NOT NULL DEFAULT '',
    fixed INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, username TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL, update_interval INTEGER NOT NULL DEFAULT 60
  );
  CREATE TABLE IF NOT EXISTS user_apps (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, app_id)
  );
`);

// Seed user
const userId = uuidv4();
const hashedPassword = bcrypt.hashSync('password123', 10);
db.prepare(`INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)`)
  .run(userId, 'testuser', 'test@watchdog.dev', hashedPassword);

// Seed apps
const app1Id = uuidv4();
const app2Id = uuidv4();
db.prepare(`INSERT INTO apps (id, app_name, status) VALUES (?, ?, ?)`)
  .run(app1Id, 'Production API', 'Stable');
db.prepare(`INSERT INTO apps (id, app_name, status) VALUES (?, ?, ?)`)
  .run(app2Id, 'Staging API', 'Unstable');

// Seed endpoints
const ep1Id = uuidv4();
const ep2Id = uuidv4();
const ep3Id = uuidv4();
db.prepare(`INSERT INTO endpoints (id, app_id, name, status) VALUES (?, ?, ?, ?)`)
  .run(ep1Id, app1Id, 'https://httpstat.us/200', 'Stable');
db.prepare(`INSERT INTO endpoints (id, app_id, name, status) VALUES (?, ?, ?, ?)`)
  .run(ep2Id, app1Id, 'https://httpstat.us/500', 'Down');
db.prepare(`INSERT INTO endpoints (id, app_id, name, status) VALUES (?, ?, ?, ?)`)
  .run(ep3Id, app2Id, 'https://httpstat.us/200', 'Stable');

// Seed some logs
const now = new Date();
for (let i = 0; i < 8; i++) {
  const t = new Date(now - i * 60_000).toISOString();
  db.prepare(`INSERT INTO logs (id, endpoint_id, response, time) VALUES (?, ?, ?, ?)`)
    .run(uuidv4(), ep1Id, 200, t);
  db.prepare(`INSERT INTO logs (id, endpoint_id, response, time) VALUES (?, ?, ?, ?)`)
    .run(uuidv4(), ep2Id, 500, t);
}

// Seed one open bug report
db.prepare(`INSERT INTO reports (id, app_id, endpoint_name, state, message) VALUES (?, ?, ?, ?, ?)`)
  .run(uuidv4(), app1Id, 'https://httpstat.us/500', 'Down', 'Endpoint is returning 500');

// Link user to apps
db.prepare(`INSERT INTO user_apps (user_id, app_id) VALUES (?, ?)`)
  .run(userId, app1Id);
db.prepare(`INSERT INTO user_apps (user_id, app_id) VALUES (?, ?)`)
  .run(userId, app2Id);

db.close();
console.log(`✓ Seeded test DB at ${dbPath}`);
console.log('  User: test@watchdog.dev / password123');
console.log('  Apps: "Production API" (Stable), "Staging API" (Unstable)');

// Start backend on port 3001 pointing at the test DB
// The compiled backend reads DB_PATH from env, but our db.ts hardcodes __dirname.
// We start via ts-node (dev mode) with overridden PORT.
const beProcess = spawn(
  'npm', ['run', 'dev:be'],
  {
    cwd: repoRoot,
    env: { ...process.env, PORT: '3001' },
    stdio: 'inherit',
    shell: true,
  }
);

console.log('\n✓ Backend starting on http://localhost:3001 ...');
console.log('  Start frontend separately: VITE_API_URL=http://localhost:3001 npm run dev:fe');
console.log('  Press Ctrl+C to stop.\n');

process.on('SIGINT', () => {
  beProcess.kill();
  process.exit(0);
});
