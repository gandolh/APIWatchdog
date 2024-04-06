import dotenv from 'dotenv';
import db from './config/dbConnection';

dotenv.config();


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.info('Connected to MongoDB!');
});