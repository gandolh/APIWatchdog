import { Status } from './status';

export default interface iReport {
    endpointName: string;
    status: Status;
    message: string;
    fixed: boolean;
};