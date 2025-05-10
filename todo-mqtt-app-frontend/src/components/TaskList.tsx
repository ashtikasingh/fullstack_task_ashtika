import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

interface Task {
    id: string;
    content: string;
    createdAt: string;
}

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/fetchAllTasks')
            .then((res) => {
                // Normalize the tasks coming from backend
                const fetchedTasks = res.data.tasks.map((task: any) => {
                    // If task is a string (from Redis), parse it
                    if (typeof task === 'string') {
                        try {
                            const parsed = JSON.parse(task);
                            return {
                                id: parsed.id || crypto.randomUUID(),
                                content: parsed.content || '',
                                createdAt: parsed.createdAt || new Date().toISOString()
                            };
                        } catch {
                            return null;
                        }
                    }
                    return {
                        id: task.id || task._id || crypto.randomUUID(),
                        content: task.content || task.note || '',
                        createdAt: task.createdAt || new Date().toISOString()
                    };
                }).filter(Boolean);

                setTasks(fetchedTasks);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="max-h-64 overflow-y-auto mt-4">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    content={task.content}
                    createdAt={task.createdAt}
                />
            ))}
        </div>
    );
};

export default TaskList;
