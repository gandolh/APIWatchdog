import Apps from '../models/app';
import iApp from '../types/app';

const updateAtInterval = async (interval: number) => {
    setInterval(updateAllApps, interval * 1000);
};

const updateAllApps = async () => {
    const apps = await Apps.find();
    apps.forEach(async (app) => {
        const tempApp = {
            appName: app.appName,
            endpoints: app.endpoints as Object[],
            reports: app.reports as Object[],
        } as iApp;

        const updatedApp = await updateApp(tempApp);

        await Apps.updateOne({ appName: updatedApp.appName }, updatedApp);
    });
};

const updateApp = async (app: iApp) => {
    app.endpoints.forEach(async (endpoint) => {
        const response = await fetch(endpoint.url);
        const log = {
            time: new Date(),
            response: response.status,
        };
        endpoint.logs.push(log);
    });

    return app;
};

export default updateAtInterval;