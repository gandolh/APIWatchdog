import Endpoint from "./Endpoint.ts";
import Report from "./Report.ts";

export default interface App {
    name: string;
    endpoints: Endpoint[];
    reports: Report[];
};