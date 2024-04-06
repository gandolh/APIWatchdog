import iLog from './log';

export default interface iEndpoint {
    name: String;
    status: String;
    logs: [iLog];
};