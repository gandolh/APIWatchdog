import express from 'express';
import { getUserByEmail, loginUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const status = await loginUser(email, password);
    res.sendStatus(status);
});

userRouter.post('/getByEmail', async (req, res) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    res.send(user);
});

export default userRouter;