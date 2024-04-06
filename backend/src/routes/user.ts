import express from 'express';
import { getUserByEmail, loginUser, createUser, addAppToUser, removeAppFromUser, updatePassword } from '../controllers/userController';
import iUser from '../types/user';

const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const status: number = await loginUser(email, password);
        if (status === 200) {
            res.send(await getUserByEmail(email));
        } else {
            res.sendStatus(status);
        }
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

userRouter.post('/getByEmail', async (req, res) => {
    try {
        const user = await getUserByEmail(req.body.email);
        res.send(user);
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

userRouter.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userData: iUser = { username, email, password };
        const status = await createUser(userData);
        res.sendStatus(status); 
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

userRouter.post('/addApp', async (req, res) => {
    try {
        const { email, appName } = req.body;
        const status = await addAppToUser(email, appName);
        res.sendStatus(status); 
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

userRouter.post('/removeApp', async (req, res) => {
    try {
        const { email, appName } = req.body;
        const status = await removeAppFromUser(email, appName);
        res.sendStatus(status); 
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

userRouter.post('/updatePassword', async (req, res) => {
    try {
        const { email, newPassword, oldPassword } = req.body;
        const status = await updatePassword(email, newPassword, oldPassword);
        res.sendStatus(status);
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

export default userRouter;