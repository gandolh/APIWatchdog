import { Status } from "./status";

export default interface iReport {
    _id: String;
    endpoint: String;
    state: Status;
    message: String;
    fixed: Boolean;
};