import express from "express";
import iApp from "../types/app";
import iEndpoint from "../types/endpoint";
import iReport from "../types/report";
import iLog from "../types/log";
import mongoose from "mongoose";
import {
  addEndpointToApp,
  addLogToEndpoint,
  addReportToApp,
  createApp,
  getAllApps,
  getAppById,
  getAppWithLatestLogs,
  updateReport
} from "../controllers/appController";
import { Status } from "../types/status";

const appRouter = express.Router();

appRouter.get("/getAll", async (req, res) => {
  try {
    const apps = await getAllApps();
    apps.flatMap((app) => {
        app.endpoints?.toObject().map((endpoint: iEndpoint) => {
            endpoint.logs = [];
        });
    });
    res.json(apps);
  } catch (err) {
    err instanceof Error && res.status(500).json({ Error: err.message });
    console.error(err);
  }
});

appRouter.post("/getAppById", async (req, res) => {
  try {
    const { appId } = req.body;
    const app = await getAppById(appId);
    res.json(app);
  } catch (err) {
    err instanceof Error && res.status(500).json({ Error: err.message });
    console.error(err);
  }
});

appRouter.post("/create", async (req, res) => {
  try {
    const { appName } = req.body;
    const appData: iApp = { appName, status: Status.STABLE };
    const status = await createApp(appData);
    if (status.status === 200) {
      res.status(201).json({ appId: status.appId });
    }
  } catch (err) {
    err instanceof Error && res.status(500).json({ Error: err.message });
    console.error(err);
  }
});

appRouter.post("/addEndpointToApp", async (req, res) => {
  try {
    const { appId, endpointName } = req.body;
    const newLog: iLog = { response: 201, time: new Date() };
    const endpointData: iEndpoint = {
      name: endpointName,
      status: Status.STABLE,
      logs: [newLog],
    };
    const status = await addEndpointToApp(appId, endpointData);
    res.sendStatus(status);
  } catch (err) {
    err instanceof Error && res.status(500).json({ Error: err.message });
    console.error(err);
  }
});

appRouter.post("/addReportToApp", async (req, res) => {
  try {
    const { appId, endpointName, state, message, email } = req.body;
    const reportData: iReport = {
      _id: new mongoose.Types.ObjectId().toString(),
      endpoint: endpointName,
      state,
      message,
      fixed: false,
    };
    const status = await addReportToApp(appId, reportData, email);
    res.sendStatus(status);
  } catch (err) {
    err instanceof Error && res.status(500).json({ Error: err.message });
    console.error(err);
  }
});

appRouter.post("/addLogToEndpoint", async (req, res) => {
  try {
    const { appId, endpointName, response } = req.body;
    const logData: iLog = {
      response: Number.parseInt(response),
      time: new Date(),
    };
    const status = await addLogToEndpoint(appId, endpointName, logData);
    res.sendStatus(status);
  } catch (err) {
    err instanceof Error && res.status(500).json({ Error: err.message });
    console.error(err);
  }
});

appRouter.post("/getAppWithLatestLogs", async (req, res) => {
  try {
    const { appId, hours } = req.body;
    const app = await getAppWithLatestLogs(appId, hours);
    res.json(app);
  } catch (err) {
    err instanceof Error && res.status(500).json({ Error: err.message });
    console.error(err);
  }
});

appRouter.post("/updateReport", async (req, res) => {
    try {
        const { appId, reportId } = req.body;
        const status = await updateReport(appId, reportId);
        res.sendStatus(status);
    } catch (err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

export default appRouter;
