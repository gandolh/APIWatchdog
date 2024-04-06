import iLog from './ILog';
import { Status } from './Status';

export default interface iEndpoint {
    name: String;
    status: Status;
    logs?: [iLog];
};