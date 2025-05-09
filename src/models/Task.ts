import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({ note: String });
export const Task = mongoose.model('Task', taskSchema);
