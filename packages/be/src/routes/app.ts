import { Router, Request, Response } from 'express';
import {
  createApp, getAllApps, getAppById, getAppWithLatestLogs,
  addEndpointToApp, addLogToEndpoint, addReportToApp, updateReport,
} from '../controllers/appController';

const appRouter = Router();

appRouter.get('/getAll', (_req: Request, res: Response) => {
  try {
    res.json(getAllApps());
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

appRouter.post('/getById', (req: Request, res: Response) => {
  try {
    const { appId } = req.body as { appId: string };
    const app = getAppById(appId);
    if (!app) { res.status(404).json({ error: 'App not found' }); return; }
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

appRouter.post('/create', (req: Request, res: Response) => {
  try {
    const { appName } = req.body as { appName: string };
    const result = createApp(appName);
    res.status(201).json({ appId: result.appId });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

appRouter.post('/addEndpoint', (req: Request, res: Response) => {
  try {
    const { appId, endpointName } = req.body as { appId: string; endpointName: string };
    const status = addEndpointToApp(appId, endpointName);
    res.sendStatus(status);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

appRouter.post('/addLog', (req: Request, res: Response) => {
  try {
    const { appId, endpointName, response } = req.body as { appId: string; endpointName: string; response: number };
    const status = addLogToEndpoint(appId, endpointName, Number(response));
    res.sendStatus(status);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

appRouter.post('/addReport', (req: Request, res: Response) => {
  try {
    const { appId, endpointName, state, message, email } = req.body as {
      appId: string; endpointName: string; state: string; message: string; email: string;
    };
    const status = addReportToApp(appId, endpointName, state, message, email);
    res.sendStatus(status);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

appRouter.post('/getWithLogs', (req: Request, res: Response) => {
  try {
    const { appId, hours } = req.body as { appId: string; hours: number };
    const app = getAppWithLatestLogs(appId, Number(hours));
    if (!app) { res.status(404).json({ error: 'App not found' }); return; }
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

appRouter.post('/updateReport', (req: Request, res: Response) => {
  try {
    const { appId, reportId } = req.body as { appId: string; reportId: string };
    const status = updateReport(appId, reportId);
    res.sendStatus(status);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

export default appRouter;
