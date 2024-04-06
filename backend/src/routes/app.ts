import express from 'express';
import iApp from '../types/app';
import iEndpoint from '../types/endpoint';
import iReport from '../types/report';
import { createApp, addEndpointToApp, addReportToApp, getAllApps } from '../controllers/appController';

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

appRouter.post('/create', async (req, res) => {
    try {
        const { appName } = req.body;
        const appData: iApp = { appName };
        const status = await createApp(appData);
        res.sendStatus(status);
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

appRouter.post('/addEndpointToApp', async (req, res) => {
    try {
        const { appId, endpointName } = req.body;
        const endpointData: iEndpoint = { name: endpointName, status: 'Stable' };
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
        const reportData: iReport = { endpoint: endpointName, state, message, fixed = false };
        const status = await addReportToApp(appId, reportData);
        res.sendStatus(status);
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

export default appRouter;