import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MONGO_URL);
const mongoURI = process.env.MONGO_URL as string;

async function connectDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB Atlas!');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
}

export default connectDB;
