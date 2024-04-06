import iEndpoint from './endpoint';
import iReport from './report';

export default interface iApp {
    appName: string;
    endpoints: Array<iEndpoint>;
    reports: Array<iReport>;
};