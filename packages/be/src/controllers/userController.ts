import { v4 as uuidv4 } from 'uuid';
import db from '../config/db';
import bcrypt from 'bcrypt';
import type { IUser } from '@apiwatchdog/shared';

type DbUser = { id: string; username: string; email: string; password: string; update_interval: number };

function mapUser(row: DbUser): IUser {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    apps: getUserAppIds(row.id),
    frequency: row.update_interval,
    period: 24,
  };
}

function getUserAppIds(userId: string): string[] {
  const rows = db.prepare('SELECT app_id FROM user_apps WHERE user_id = ?').all(userId) as { app_id: string }[];
  return rows.map(r => r.app_id);
}

export function loginUser(email: string, password: string): { status: number; user?: IUser } {
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as DbUser | undefined;
  if (!row) return { status: 404 };
  const match = bcrypt.compareSync(password, row.password);
  if (!match) return { status: 401 };
  return { status: 200, user: mapUser(row) };
}

export function registerUser(username: string, email: string, password: string): number {
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) return 409;
  const hash = bcrypt.hashSync(password, 10);
  const id = uuidv4();
  db.prepare('INSERT INTO users (id, username, email, password, update_interval) VALUES (?, ?, ?, ?, 60)').run(id, username, email, hash);
  return 200;
}

export function getUserByEmail(email: string): IUser | null {
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as DbUser | undefined;
  if (!row) return null;
  return mapUser(row);
}

export function addAppToUser(email: string, appId: string): number {
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email) as DbUser | undefined;
  if (!user) return 404;
  db.prepare('INSERT OR IGNORE INTO user_apps (user_id, app_id) VALUES (?, ?)').run(user.id, appId);
  return 200;
}

export function removeAppFromUser(email: string, appId: string): number {
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email) as DbUser | undefined;
  if (!user) return 404;
  db.prepare('DELETE FROM user_apps WHERE user_id = ? AND app_id = ?').run(user.id, appId);
  return 200;
}

export function getUserApps(email: string): { status: number; apps: string[] } {
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email) as DbUser | undefined;
  if (!user) return { status: 404, apps: [] };
  return { status: 200, apps: getUserAppIds(user.id) };
}

export function updateInterval(email: string, interval: number): number {
  const result = db.prepare('UPDATE users SET update_interval = ? WHERE email = ?').run(interval, email);
  return result.changes > 0 ? 200 : 404;
}
