import Log from './Log.ts';

export default interface Endpoint {
    name: string;
    status: number;
    logs: Log[];
};