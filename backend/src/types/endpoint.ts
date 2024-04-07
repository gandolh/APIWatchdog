import iLog from './log';
import { Status } from './status';

export default interface iEndpoint {
    name: String;
    status: Status;
    logs: iLog[];
};