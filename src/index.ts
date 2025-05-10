import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import { Task } from './models/Task';
import './mqtt';
import { redisClient } from './redis';

dotenv.config();
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

const TASK_KEY = `FULLSTACK_TASK_ASHTIKA`;

app.get('/fetchAllTasks', async (req, res) => {
    try {
        // Fetch from Redis
        const redisTasks = await redisClient.lrange(TASK_KEY, 0, -1);

        const parsedRedisTasks = redisTasks
            .map((taskStr) => {
                try {
                    console.log(redisTasks);
                    console.log(taskStr);
                    console.log(JSON.parse(taskStr))
                    return JSON.parse(taskStr);
                } catch {
                    console.warn('Invalid JSON in Redis:', taskStr);
                    return null;
                }
            })
            .filter(Boolean);

        // Fetch from MongoDB
        const mongoTasks = await Task.find({}, { _id: 0, __v: 0 });

        const allTasks = [...parsedRedisTasks, ...mongoTasks];

        res.json({ tasks: allTasks });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});



connectDB();
app.listen(PORT, () => {
    console.log(`HTTP Server running on http://localhost:${PORT}`);
});