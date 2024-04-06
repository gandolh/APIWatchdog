import Apps from '../models/app';
import iApp from '../types/app';
import iEndpoint from '../types/endpoint';
import iLog from '../types/log';
import iReport from '../types/report';
import { Status } from '../types/status';

const updateAtInterval = async (interval: number) => {
    setInterval(updateAllApps, interval * 1000);
};

const updateAllApps = async () => {
    const apps = await Apps.find();
    apps.forEach(async (app) => {
        let updatedApp = app;

        updatedApp = await updateAppEndpoints(updatedApp);
        updatedApp = await updateAppStatus(updatedApp);

        await Apps.updateOne({ appName: updatedApp.appName }, updatedApp);
    });
};

const updateAppEndpoints = async (app: any) => {
    let updatedEndpoints = app.endpoints as iEndpoint[];
    for (let i = 0; i < updatedEndpoints.length; i++) {
        updatedEndpoints[i] = await updateEndpoint(updatedEndpoints[i]);
    }

    app.endpoints = updatedEndpoints;

    return app;
};

const updateEndpoint = async (endpoint: iEndpoint) => {
    // const response = await fetch(endpoint.name.toString());

    // endpoint.logs.push({
    //     time: new Date(),
    //     response: response.status,
    // } as iLog);

    let logs = endpoint.logs;
    logs.sort((a, b) => {
        return a.time.getTime() - b.time.getTime();
    });
    logs = logs.slice(-10);

    let countUnstable = 0;
    logs.forEach((log) => {
        if (log.response !== 200 && log.response !== 302) {
            countUnstable++;
        }
    });

    if (countUnstable === 0) {
        endpoint.status = Status.STABLE;
    } else if (countUnstable === 10) {
        endpoint.status = Status.DOWN;
    } else {
        endpoint.status = Status.UNSTABLE;
    }

    return endpoint;
};

const updateAppStatus = async (app: any) => {
    const endpoints = app.endpoints as iEndpoint[];
    let countStable = 0;
    endpoints.forEach((endpoint) => {
        if (endpoint.status === Status.STABLE) {
            countStable++;
        }
    });

    if (countStable === endpoints.length) {
        app.status = Status.STABLE;
    } else if (countStable === 0) {
        app.status = Status.DOWN;
    } else {
        app.status = Status.UNSTABLE;
    }

    const reports = app.reports as iReport[];
    let allFixed = true;
    for (let i = 0; i < reports.length; i++) {
        if (!reports[i].fixed) {
            allFixed = false;
            break;
        }
    };

    if (!allFixed && app.status === Status.STABLE) {
        app.status = Status.UNSTABLE;
    }

    return app;
};

export default updateAtInterval;