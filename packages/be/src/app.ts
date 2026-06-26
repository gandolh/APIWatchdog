import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import appRouter from './routes/app';
import userRouter from './routes/user';
import { startPolling } from './utils/updateLogs';

dotenv.config();

// Initialize DB (runs schema creation on import)
import './config/db';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/app', appRouter);
app.use('/api/user', userRouter);

app.get('/', (_req, res) => { res.send('WatchDog API'); });

app.post('/api/setInterval', (req, res) => {
  const { interval } = req.body as { interval?: number };
  if (!interval) { res.status(400).json({ error: 'interval required' }); return; }
  clearInterval(pollingInterval);
  pollingInterval = startPolling(Number(interval));
  res.json({ message: `Interval set to ${interval}s` });
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => { console.log(`WatchDog API running on port ${port}`); });

let pollingInterval = startPolling(60);
