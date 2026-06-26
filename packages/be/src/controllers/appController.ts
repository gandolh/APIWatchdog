import { v4 as uuidv4 } from 'uuid';
import db from '../config/db';
import { Status } from '@apiwatchdog/shared';
import type { IApp, IEndpoint, ILog, IReport } from '@apiwatchdog/shared';
import { Mail } from '../utils/mail';

type DbApp = { id: string; app_name: string; status: string };
type DbEndpoint = { id: string; app_id: string; name: string; status: string };
type DbLog = { id: string; endpoint_id: string; response: number; time: string };
type DbReport = { id: string; app_id: string; endpoint_name: string; state: string; message: string; fixed: number };

function mapApp(row: DbApp): IApp {
  return { id: row.id, appName: row.app_name, status: row.status as Status };
}

function mapEndpoint(row: DbEndpoint): IEndpoint {
  return { id: row.id, appId: row.app_id, name: row.name, status: row.status as Status };
}

function mapLog(row: DbLog): ILog {
  return { id: row.id, endpointId: row.endpoint_id, response: row.response, time: row.time };
}

function mapReport(row: DbReport): IReport {
  return { id: row.id, appId: row.app_id, endpoint: row.endpoint_name, state: row.state, message: row.message, fixed: row.fixed === 1 };
}

export function createApp(appName: string): { status: number; appId: string } {
  const id = uuidv4();
  db.prepare('INSERT INTO apps (id, app_name, status) VALUES (?, ?, ?)').run(id, appName, Status.STABLE);
  return { status: 200, appId: id };
}

export function getAllApps(): IApp[] {
  const apps = db.prepare('SELECT * FROM apps').all() as DbApp[];
  return apps.map(app => {
    const endpoints = db.prepare('SELECT * FROM endpoints WHERE app_id = ?').all(app.id) as DbEndpoint[];
    return {
      ...mapApp(app),
      endpoints: endpoints.map(ep => ({ ...mapEndpoint(ep), logs: [] })),
    };
  });
}

export function getAppById(appId: string): IApp | null {
  const app = db.prepare('SELECT * FROM apps WHERE id = ?').get(appId) as DbApp | undefined;
  if (!app) return null;
  const endpoints = db.prepare('SELECT * FROM endpoints WHERE app_id = ?').all(appId) as DbEndpoint[];
  const reports = db.prepare('SELECT * FROM reports WHERE app_id = ?').all(appId) as DbReport[];
  return {
    ...mapApp(app),
    endpoints: endpoints.map(mapEndpoint),
    reports: reports.map(mapReport),
  };
}

export function getAppWithLatestLogs(appId: string, hours: number): IApp | null {
  const app = db.prepare('SELECT * FROM apps WHERE id = ?').get(appId) as DbApp | undefined;
  if (!app) return null;

  const cutoff = new Date(Date.now() - hours * 3_600_000).toISOString();
  const endpoints = db.prepare('SELECT * FROM endpoints WHERE app_id = ?').all(appId) as DbEndpoint[];
  const reports = db.prepare('SELECT * FROM reports WHERE app_id = ?').all(appId) as DbReport[];

  const endpointsWithLogs: IEndpoint[] = endpoints.map(ep => {
    const logs = db.prepare(
      'SELECT * FROM logs WHERE endpoint_id = ? AND time >= ? ORDER BY time ASC'
    ).all(ep.id, cutoff) as DbLog[];
    return { ...mapEndpoint(ep), logs: logs.map(mapLog) };
  });

  return {
    ...mapApp(app),
    endpoints: endpointsWithLogs,
    reports: reports.map(mapReport),
  };
}

export function addEndpointToApp(appId: string, endpointName: string): number {
  const app = db.prepare('SELECT id FROM apps WHERE id = ?').get(appId);
  if (!app) return 404;
  const id = uuidv4();
  db.prepare('INSERT INTO endpoints (id, app_id, name, status) VALUES (?, ?, ?, ?)').run(id, appId, endpointName, Status.STABLE);
  const logId = uuidv4();
  db.prepare('INSERT INTO logs (id, endpoint_id, response, time) VALUES (?, ?, ?, ?)').run(logId, id, 201, new Date().toISOString());
  return 200;
}

export function addLogToEndpoint(appId: string, endpointName: string, response: number): number {
  const endpoint = db.prepare('SELECT id FROM endpoints WHERE app_id = ? AND name = ?').get(appId, endpointName) as DbEndpoint | undefined;
  if (!endpoint) return 404;

  const logId = uuidv4();
  db.prepare('INSERT INTO logs (id, endpoint_id, response, time) VALUES (?, ?, ?, ?)').run(logId, endpoint.id, response, new Date().toISOString());

  // Keep only last 10 logs
  const logs = db.prepare('SELECT id FROM logs WHERE endpoint_id = ? ORDER BY time ASC').all(endpoint.id) as { id: string }[];
  if (logs.length > 10) {
    const toDelete = logs.slice(0, logs.length - 10).map(l => l.id);
    const placeholders = toDelete.map(() => '?').join(',');
    db.prepare(`DELETE FROM logs WHERE id IN (${placeholders})`).run(...toDelete);
  }

  return 200;
}

export function addReportToApp(appId: string, endpointName: string, state: string, message: string, email: string): number {
  const app = db.prepare('SELECT id FROM apps WHERE id = ?').get(appId);
  if (!app) return 404;
  const id = uuidv4();
  db.prepare('INSERT INTO reports (id, app_id, endpoint_name, state, message, fixed) VALUES (?, ?, ?, ?, ?, 0)').run(id, appId, endpointName, state, message);
  Mail.sendMail(email, 'New bug reported', 'A new bug has been reported on your app.');
  return 200;
}

export function updateReport(appId: string, reportId: string): number {
  const result = db.prepare('UPDATE reports SET fixed = 1 WHERE id = ? AND app_id = ?').run(reportId, appId);
  return result.changes > 0 ? 200 : 404;
}

export function updateAllAppsStatus(): void {
  const apps = db.prepare('SELECT id FROM apps').all() as { id: string }[];
  for (const app of apps) {
    const endpoints = db.prepare('SELECT id, name, status FROM endpoints WHERE app_id = ?').all(app.id) as DbEndpoint[];

    for (const ep of endpoints) {
      const logs = db.prepare('SELECT response FROM logs WHERE endpoint_id = ? ORDER BY time DESC LIMIT 10').all(ep.id) as { response: number }[];
      if (logs.length === 0) continue;

      const badCount = logs.filter(l => l.response !== 200 && l.response !== 201 && l.response !== 302).length;
      let epStatus: Status;
      if (badCount === 0) epStatus = Status.STABLE;
      else if (badCount === logs.length) epStatus = Status.DOWN;
      else epStatus = Status.UNSTABLE;

      db.prepare('UPDATE endpoints SET status = ? WHERE id = ?').run(epStatus, ep.id);
    }

    const updatedEndpoints = db.prepare('SELECT status FROM endpoints WHERE app_id = ?').all(app.id) as { status: string }[];
    const stableCount = updatedEndpoints.filter(e => e.status === Status.STABLE).length;
    let appStatus: Status;
    if (updatedEndpoints.length === 0) appStatus = Status.STABLE;
    else if (stableCount === updatedEndpoints.length) appStatus = Status.STABLE;
    else if (stableCount === 0) appStatus = Status.DOWN;
    else appStatus = Status.UNSTABLE;

    const openReports = db.prepare('SELECT id FROM reports WHERE app_id = ? AND fixed = 0').all(app.id);
    if (openReports.length > 0 && appStatus === Status.STABLE) appStatus = Status.UNSTABLE;

    db.prepare('UPDATE apps SET status = ? WHERE id = ?').run(appStatus, app.id);
  }
}
