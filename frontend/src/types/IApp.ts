import iEndpoint from "./IEndpoint";
import iReport from "./IReport";
import { Status } from "./Status";

export default interface iApp {
    _id : string;
    appName: string;
    status: Status;
    endpoints?: [iEndpoint];
    reports?: [iReport];
};