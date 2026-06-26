import type { IUser } from '@apiwatchdog/shared';
import api from './client';

export function getStoredUser(): IUser | null {
  const raw = localStorage.getItem('watchdog_user');
  if (!raw) return null;
  try { return JSON.parse(raw) as IUser; } catch { return null; }
}

export function storeUser(user: IUser): void {
  localStorage.setItem('watchdog_user', JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem('watchdog_user');
}

export async function login(email: string, password: string): Promise<IUser> {
  const { data } = await api.post<IUser>('/api/user/login', { email, password });
  return data;
}

export async function register(username: string, email: string, password: string): Promise<void> {
  await api.post('/api/user/register', { username, email, password });
}
