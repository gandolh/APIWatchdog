import { Router, Request, Response } from 'express';
import {
  loginUser, registerUser, getUserByEmail,
  addAppToUser, removeAppFromUser, getUserApps, updateInterval,
} from '../controllers/userController';

const userRouter = Router();

userRouter.post('/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const result = loginUser(email, password);
    if (result.status === 200) res.json(result.user);
    else res.sendStatus(result.status);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

userRouter.post('/register', (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body as { username: string; email: string; password: string };
    const status = registerUser(username, email, password);
    res.sendStatus(status);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

userRouter.post('/getByEmail', (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email: string };
    const user = getUserByEmail(email);
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

userRouter.post('/addApp', (req: Request, res: Response) => {
  try {
    const { email, appId } = req.body as { email: string; appId: string };
    res.sendStatus(addAppToUser(email, appId));
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

userRouter.post('/removeApp', (req: Request, res: Response) => {
  try {
    const { email, appId } = req.body as { email: string; appId: string };
    res.sendStatus(removeAppFromUser(email, appId));
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

userRouter.post('/getApps', (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email: string };
    const result = getUserApps(email);
    if (result.status === 404) { res.sendStatus(404); return; }
    res.json(result.apps);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

userRouter.post('/updateInterval', (req: Request, res: Response) => {
  try {
    const { email, interval } = req.body as { email: string; interval: number };
    res.sendStatus(updateInterval(email, Number(interval)));
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

export default userRouter;
