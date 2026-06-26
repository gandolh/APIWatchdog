import db from '../config/db';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '@apiwatchdog/shared';
import { updateAllAppsStatus } from '../controllers/appController';

type DbEndpoint = { id: string; app_id: string; name: string; status: string };

async function pollEndpoint(endpoint: DbEndpoint): Promise<void> {
  try {
    const res = await fetch(endpoint.name);
    const logId = uuidv4();
    db.prepare('INSERT INTO logs (id, endpoint_id, response, time) VALUES (?, ?, ?, ?)').run(
      logId, endpoint.id, res.status, new Date().toISOString()
    );

    // Keep only last 10 logs per endpoint
    const logs = db.prepare('SELECT id FROM logs WHERE endpoint_id = ? ORDER BY time ASC').all(endpoint.id) as { id: string }[];
    if (logs.length > 10) {
      const toDelete = logs.slice(0, logs.length - 10).map(l => l.id);
      const placeholders = toDelete.map(() => '?').join(',');
      db.prepare(`DELETE FROM logs WHERE id IN (${placeholders})`).run(...toDelete);
    }
  } catch {
    // Network error = endpoint down, record a 503
    const logId = uuidv4();
    db.prepare('INSERT INTO logs (id, endpoint_id, response, time) VALUES (?, ?, ?, ?)').run(
      logId, endpoint.id, 503, new Date().toISOString()
    );
  }
}

async function pollAll(): Promise<void> {
  const endpoints = db.prepare('SELECT * FROM endpoints').all() as DbEndpoint[];
  await Promise.allSettled(endpoints.map(pollEndpoint));
  updateAllAppsStatus();
}

export function startPolling(intervalSeconds: number): ReturnType<typeof setInterval> {
  return setInterval(() => { void pollAll(); }, intervalSeconds * 1000);
}
