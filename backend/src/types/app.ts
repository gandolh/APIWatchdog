import iEndpoint from "./endpoint";
import iReport from "./report";

export default interface iApp {
    appName: String;
    status?: String;
    endpoints?: [iEndpoint];
    reports?: [iReport];
};