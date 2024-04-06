import iEndpoint from './endpoint';
import iReport from './report';
import { Status } from './status';

export default interface iApp {
    appName: string;
    status: Status;
    endpoints: Array<iEndpoint>;
    reports: Array<iReport>;
};