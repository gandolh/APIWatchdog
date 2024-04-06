import iLog from "./log";
import { Status } from "./status";

export default interface iEndpoint {
    endpointName: string;
    url: string;
    method: string;
    status: Status;
    logs: Array<iLog>;
};