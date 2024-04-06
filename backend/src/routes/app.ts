import express from 'express';
import iApp from '../types/app';
import iEndpoint from '../types/endpoint';
import iReport from '../types/report';
import iLog from '../types/log';
import mongoose from 'mongoose';
import { createApp, addEndpointToApp, addReportToApp, getAllApps, getAppById, addLogToEndpoint } from '../controllers/appController';

const appRouter = express.Router();

appRouter.get('/getAll', async (req, res) => {
    try {
        const apps = await getAllApps();
        res.json(apps);
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

appRouter.post('/getAppById', async (req, res) => {
    try {
        const { appId } = req.body;
        const app = await getAppById(appId);
        res.json(app);
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

appRouter.post('/create', async (req, res) => {
    try {
        const { appName } = req.body;
        const appData: iApp = { appName, status: 'Stable' };
        const status = await createApp(appData);
        if (status.status === 200) {
            res.status(201).json({ appId: status.appId });
        }
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

appRouter.post('/addEndpointToApp', async (req, res) => {
    try {
        const { appId, endpointName } = req.body;
        const newLog: iLog = { response: 201, time: new Date() };
        const endpointData: iEndpoint = { name: endpointName, status: 'Stable', logs: [newLog] };
        const status = await addEndpointToApp(appId, endpointData);
        res.sendStatus(status);
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

appRouter.post('/addReportToApp', async (req, res) => {
    try {
        const { appId, endpointName, state, message } = req.body;
        const reportData: iReport = { _id: new mongoose.Types.ObjectId().toString(),
             endpoint: endpointName, state, message, fixed: false };
        const status = await addReportToApp(appId, reportData);
        res.sendStatus(status);
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

appRouter.post('/addLogToEndpoint', async (req, res) => {
    try {
        const { appId, endpointName, response } = req.body;
        const logData: iLog = { response: Number.parseInt(response), time: new Date() };
        const status = await addLogToEndpoint(appId, endpointName, logData);
        res.sendStatus(status);
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

export default appRouter;