import express from 'express';
import iApp from '../types/app';
import { createApp } from '../controllers/appController';

const appRouter = express.Router();

appRouter.post('/create', async (req, res) => {
    try {
        const { appName, endpoints } = req.body;
        const appData: iApp = { appName, endpoints };
        const status = await createApp(appData);
        res.sendStatus(status);
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

export default appRouter;