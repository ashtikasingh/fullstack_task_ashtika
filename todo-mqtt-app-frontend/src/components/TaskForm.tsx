import { useState } from 'react';
import mqtt from 'mqtt';
import { v4 as uuidv4 } from 'uuid';

interface TaskFormProps {
    onTaskAdded: (newTask: { id: string; content: string; createdAt: string }) => void;
}

const client = mqtt.connect('ws://test.mosquitto.org:8080');

const TaskForm = ({ onTaskAdded }: TaskFormProps) => {
    const [note, setNote] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!note.trim()) return;

        const newTask = {
            id: uuidv4(),
            content: note,
            createdAt: new Date().toISOString()
        };

        client.publish('/add', JSON.stringify(newTask));
        // client.publish('/add', JSON.stringify({ content: note }));
        onTaskAdded(newTask);
        setNote('');
        window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                className="w-full border px-2 py-1 rounded"
                placeholder="New Note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <button
                type="submit"
                className="bg-amber-700 text-white px-3 py-1 mt-2 rounded w-full"
            >
                ➕ Add
            </button>
        </form>
    );
};

export default TaskForm;
