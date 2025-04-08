import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      savePlayerName(name);
    }
  };

  const savePlayerName = async (name) => {
    if (name) {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        console.log('Player name saved!');
      }
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Tic Tac Toe</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
        className="p-2 mb-4 bg-gray-800 rounded"
      />
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 text-3xl font-bold bg-gray-800 rounded hover:bg-gray-700"
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="mt-4 text-xl">
        {winner
          ? `Winner: ${winner}`
          : board.includes(null)
          ? `Next: ${xIsNext ? 'X' : 'O'}`
          : "It's a draw!"}
      </div>
      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
      >
        Restart Game
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
