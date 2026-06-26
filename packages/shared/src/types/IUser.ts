export interface IUser {
  id: string;
  username: string;
  email: string;
  password?: string;
  apps: string[];
  frequency: number;
  period: number;
}
