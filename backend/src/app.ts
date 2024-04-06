import express from 'express';
import userRouter from './routes/user';
import dotenv from 'dotenv';
import db from './config/dbConnection';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/user', userRouter);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.info('Connected to MongoDB!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});