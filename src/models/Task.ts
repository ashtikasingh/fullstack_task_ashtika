// Task.ts
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    }
});

export const Task = mongoose.model('Task', taskSchema);
