import dotenv from 'dotenv';
import db from './config/dbConnection';
import updateAtInterval from './utils/updateLogs';
import Apps from './models/app';

dotenv.config();


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.info('Connected to MongoDB!');
});

updateAtInterval(10);