// import mqtt from 'mqtt';
// import dotenv from 'dotenv';
// import { redisClient } from './redis';
// import { Task } from './mongo';

// dotenv.config();

// const TASK_KEY = `FULLSTACK_TASK_ASHTIKA`;
// const MAX_CACHE = 50;

// const client = mqtt.connect(process.env.MQTT_URL!);

// client.on('connect', () => {
//     console.log('Connected to MQTT Broker');
//     client.subscribe('/add');
// });

// client.on('message', async (topic, message) => {
//     const newNote = message.toString();
//     const tasks = await redisClient.lrange(TASK_KEY, 0, -1);
//     if (tasks.length >= MAX_CACHE) {
//         // Move to MongoDB
//         const taskDocs = tasks.map(note => ({ note }));
//         await Task.insertMany(taskDocs);
//         await redisClient.del(TASK_KEY);
//         console.log('Moved tasks to MongoDB');
//     }
//     await redisClient.rpush(TASK_KEY, newNote);
// });

import mqtt from 'mqtt';
import { Task } from './models/Task';

const client = mqtt.connect(process.env.MQTT_URL!);

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('/add');
});

client.on('message', async (topic, message) => {
    if (topic === '/add') {
        const note = message.toString();
        await Task.create({ note });
        console.log('Note added via MQTT:', note);
    }
});
