import apps from "../models/app";
import iApp from "../types/app";
import iEndpoint from "../types/endpoint";
import iReport from "../types/report";

export const createApp = async (appData: iApp) => {
  const newApp = new apps(appData);
  await newApp.save();
  return 200;
};

export const getAllApps = async () => {
    return await apps.find();
};

export const getAppById = async (id: string) => {
    return await apps.findById(id);
}

export const addEndpointToApp = async (appId: string, endpoint: iEndpoint) => {
    const app = await apps.findById(appId);
    if (!app) {
        throw new Error('App not found');
    }
    app.endpoints.push(endpoint);
    await app.save();
    return 200;
}

export const addReportToApp = async (appId: string, report: iReport) => {
    const app = await apps.findById(appId);
    if (!app) {
        throw new Error('App not found');
    }
    app.reports.push(report);
    await app.save();
    return 200;
}