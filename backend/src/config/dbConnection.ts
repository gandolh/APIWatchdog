import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

mongoose.set('strictQuery', true);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}`);

const db = mongoose.connection;

export default db;