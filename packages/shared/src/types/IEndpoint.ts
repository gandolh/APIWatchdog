import type { ILog } from './ILog.js';
import type { Status } from './Status.js';

export interface IEndpoint {
  id: string;
  appId: string;
  name: string;
  status: Status;
  logs?: ILog[];
}
