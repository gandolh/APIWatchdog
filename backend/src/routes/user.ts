import express from 'express';
import { getUserByEmail, loginUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const status = await loginUser(email, password);
        res.sendStatus(status); 
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

userRouter.post('/getByEmail', async (req, res) => {
    try {
        console.log("Data:", req.body);
        const user = await getUserByEmail(req.body.email);
        res.send(user);
    } catch(err) {
        err instanceof Error && res.status(500).json({ Error: err.message });
        console.error(err);
    }
});

export default userRouter;