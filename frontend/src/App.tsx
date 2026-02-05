import { useState } from 'react';
import { postService } from './services/api';

function App() {
  const [message, setMessage] = useState<string>('');

  const testConnection = async () => {
    try {
      const response = await postService.getAll();
      console.log('Backend response:', response.data);
      setMessage(`Success! Received ${response.data.length} posts (Check Console)`);
    } catch (error) {
      console.error('Connection error:', error);
      setMessage('Error connecting to backend');
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Posts Challenge - Connection Test</h1>
      <button
        onClick={testConnection}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Test Backend Connection
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
}

export default App;
