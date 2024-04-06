import express from 'express';
import userRouter from './routes/user';
import dotenv from 'dotenv';
import db from './config/dbConnection';
import bodyParser from 'body-parser';
import cors from 'cors';
import appRouter from './routes/app';
import updateAtInterval from './utils/updateLogs';
import Apps from './models/app';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.info('Connected to MongoDB!');
});

app.use('/api/user', userRouter);

app.use('/api/app', appRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

updateAtInterval(5);