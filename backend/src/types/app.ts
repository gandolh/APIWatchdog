import { Document } from "mongoose";
import iEndpoint from "./endpoint";
import iReport from "./report";
import { Status } from "./status";

export default interface iApp{
    appName: String;
    status: Status;
    endpoints?: [iEndpoint];
    reports?: [iReport];
};

export interface iAppDocument extends iApp, Document {};