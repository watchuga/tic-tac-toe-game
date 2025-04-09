import { useState } from "react";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Initialize a 3x3 empty board
  const [isXNext, setIsXNext] = useState(true); // Tracks whether 'X' or 'O' goes next
  const [winner, setWinner] = useState(null); // Keeps track of the winner
  const [moves, setMoves] = useState(0); // Keeps track of the number of moves

  // Check if there's a winner
  const calculateWinner = (board) => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return; // Don't do anything if the spot is already filled or the game has ended
  
    const newBoard = board.slice(); // Make a copy of the board
    newBoard[index] = isXNext ? "X" : "O"; // Set the current player's mark
  
    setBoard(newBoard);
    setIsXNext(!isXNext); // Switch turns
    setMoves((prevMoves) => prevMoves + 1); // Increment move count
  
    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
    } else if (newBoard.every((square) => square !== null)) { // Check for a draw
      setWinner("Draw");
    }
  };

  const renderSquare = (index) => {
    return (
      <button
        className="w-24 h-24 bg-gray-300 border-2 border-gray-500 flex items-center justify-center text-xl font-bold"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setMoves(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((_, index) => renderSquare(index))}
      </div>
      {winner && (
        <div className="mt-4">
          {winner === "Draw" ? (
            <p className="text-2xl">It's a Draw!</p>
          ) : (
            <p className="text-2xl">{winner} Wins!</p>
          )}
          <button
            onClick={resetGame}
            className="bg-blue-500 text-white px-6 py-2 rounded mt-4"
          >
            Restart Game
          </button>
        </div>
      )}
      {!winner && (
        <p className="text-xl mt-4">Next player: {isXNext ? "X" : "O"}</p>
      )}
    </div>
  );
};

export default Game;
