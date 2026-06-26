import type { IApp } from '@apiwatchdog/shared';
import api from './client';

export async function getAllApps(): Promise<IApp[]> {
  const { data } = await api.get<IApp[]>('/api/app/getAll');
  return data;
}

export async function getUserApps(email: string): Promise<string[]> {
  const { data } = await api.post<string[]>('/api/user/getApps', { email });
  return data;
}

export async function createApp(appName: string): Promise<string> {
  const { data } = await api.post<{ appId: string }>('/api/app/create', { appName });
  return data.appId;
}

export async function addAppToUser(appId: string, email: string): Promise<void> {
  await api.post('/api/user/addApp', { appId, email });
}

export async function addEndpointToApp(appId: string, endpointName: string): Promise<void> {
  await api.post('/api/app/addEndpoint', { appId, endpointName });
}

export async function getAppWithLogs(appId: string, hours: number): Promise<IApp> {
  const { data } = await api.post<IApp>('/api/app/getWithLogs', { appId, hours });
  return data;
}

export async function createBugReport(
  appId: string, endpointName: string, state: string, message: string, email: string,
): Promise<void> {
  await api.post('/api/app/addReport', { appId, endpointName, state, message, email });
}

export async function markReportFixed(appId: string, reportId: string): Promise<void> {
  await api.post('/api/app/updateReport', { appId, reportId });
}

export async function setPollingInterval(interval: number): Promise<void> {
  await api.post('/api/setInterval', { interval });
}
