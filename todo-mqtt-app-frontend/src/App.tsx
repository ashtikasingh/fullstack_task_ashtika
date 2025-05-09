import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMqtt } from './hooks/useMqtt';

function App() {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const { publishNote } = useMqtt();

  const fetchNotes = () => {
    axios.get('http://localhost:3000/fetchAllTasks')
      .then(res => setNotes(res.data.tasks))
      .catch(console.error);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAdd = () => {
    if (input.trim()) {
      publishNote(input);
      setInput('');
      setTimeout(fetchNotes, 1000); // slight delay to reflect MQTT write
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-xl shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">📝 Note App</h1>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          placeholder="New Note..."
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-1 mt-2 rounded"
        >
          ➕ Add
        </button>
        <h2 className="font-semibold mt-4">Notes</h2>
        <div className="max-h-64 overflow-y-auto mt-2 space-y-1">
          {notes.map((note, index) => (
            <div key={index} className="border-b py-1">{note}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
