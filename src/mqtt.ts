import mqtt from 'mqtt';
import dotenv from 'dotenv';
import { redisClient } from './redis';
import { Task } from './models/Task';

dotenv.config();

const TASK_KEY = `FULLSTACK_TASK_ASHTIKA`; // <-- adjust name if needed
const MAX_CACHE = 50;

const client = mqtt.connect(process.env.MQTT_URL!);

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('/add');
});

client.on('message', async (topic, message) => {
    if (topic === '/add') {
        try {
            console.log("Message:" + message);
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(message);
            const json = JSON.stringify({ text });
            await redisClient.rpush(TASK_KEY, text);

            console.log('Note added to Redis:', text);


            // Check if Redis cache exceeds 50
            const cachedTasks = await redisClient.lrange(TASK_KEY, 0, -1);
            if (cachedTasks.length > MAX_CACHE) {
                const mongoTasks = cachedTasks.map(JSON.parse(text));
                await Task.insertMany(mongoTasks);
                await redisClient.del(TASK_KEY);
                console.log('Moved tasks to MongoDB and cleared Redis cache');
            }

        } catch (error) {
            console.error('Error processing MQTT message:', error);
        }
    }
});
