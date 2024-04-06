import iEndpoint from "./IEndpoint";
import iReport from "./IReport";
import { Status } from "./Status";

export default interface iApp {
    _id : String;
    appName: String;
    status: Status;
    endpoints?: [iEndpoint];
    reports?: [iReport];
};