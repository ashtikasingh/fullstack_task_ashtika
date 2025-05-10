import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

interface Task {
  id: string;
  content: string;
  createdAt: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTaskToList = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-xl shadow-md w-96">
        <h1 className="text-xl font-bold flex items-center gap-2">
          📝 Note App
        </h1>
        <TaskForm onTaskAdded={addTaskToList} />
        <TaskList />

      </div>
    </div>
  );
}

export default App;
