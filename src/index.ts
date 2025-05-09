import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import { Task } from './models/Task';
import './mqtt';

dotenv.config();
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.get('/fetchAllTasks', async (req, res) => {
    const tasks = await Task.find();
    res.json({ tasks: tasks.map(t => t.note) });
});

connectDB();
app.listen(PORT, () => {
    console.log(`HTTP Server running on http://localhost:${PORT}`);
});


