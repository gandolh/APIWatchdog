import type { IEndpoint } from './IEndpoint.js';
import type { IReport } from './IReport.js';
import type { Status } from './Status.js';

export interface IApp {
  id: string;
  appName: string;
  status: Status;
  endpoints?: IEndpoint[];
  reports?: IReport[];
}
