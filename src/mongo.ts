import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MONGO_URL);
console.log(process.env.MONGO_DB);
console.log(process.env.MONGO_COLLECTION);
const mongoURL = process.env.MONGO_URL;

const mongoDB = process.env.MONGO_DB;
const mongoCollection = process.env.MONGO_COLLECTION;

if (!mongoURL || !mongoDB || !mongoCollection) {
    throw new Error("Missing MongoDB environment variables. Check MONGO_URL, MONGO_DB, or MONGO_COLLECTION.");
}

mongoose.connect(mongoURL, {
    dbName: mongoDB,
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

const taskSchema = new mongoose.Schema({ note: String });

// Explicitly pass the collection name from env
export const Task = mongoose.model('Task', taskSchema, mongoCollection);
