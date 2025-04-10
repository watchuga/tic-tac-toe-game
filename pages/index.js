import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send name to the backend to save in MongoDB
    const response = await fetch('/api/savePlayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      // Redirect to the game page if successful
      router.push('/game');
    } else {
      alert('Error saving player name');
    }
  };

  return (
    <div>
      <h1>Enter your name to play Tic-Tac-Toe</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={handleNameChange}
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}
