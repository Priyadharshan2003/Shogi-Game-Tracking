import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import MoveHistory from './components/MoveHistory';
import { GameState, Move, PhysicalBoardMove } from './types';
import { exportGameAsPDF } from './utils/pdfExport';
import PhysicalBoardTracker from './utils/physicalBoardTracker';
import { Download } from 'lucide-react';

const initialGameState: GameState = {
  board: {}, // The Board component handles the initial board state
  moves: [],
  currentPlayer: 'sente',
  gameStartTime: new Date(),
  player1Name: '',
  player2Name: '',
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [physicalBoardTracker, setPhysicalBoardTracker] = useState<PhysicalBoardTracker | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      const tracker = new PhysicalBoardTracker(handlePhysicalMove);
      setPhysicalBoardTracker(tracker);

      return () => {
        if (tracker) {
          tracker.close();
        }
      };
    }
  }, [gameStarted]);

  const handleMove = (from: string, to: string) => {
    const piece = gameState.board[from];
    if (!piece) return;

    const newMove: Move = {
      piece,
      from,
      to,
      captured: gameState.board[to] || undefined,
      promoted: false, // Implement promotion logic
      dropped: false, // Implement drop logic
    };

    const updatedGameState = {
      ...gameState,
      board: {
        ...gameState.board,
        [to]: piece,
        [from]: null,
      },
      moves: [...gameState.moves, newMove],
      currentPlayer: gameState.currentPlayer === 'sente' ? 'gote' : 'sente',
    };

    setGameState(updatedGameState);
  };

  const handlePhysicalMove = (move: PhysicalBoardMove) => {
    handleMove(move.from, move.to);
  };

  const handleExportPDF = () => {
    exportGameAsPDF(gameState);
  };

  const handleStartGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const player1Name = formData.get('player1Name') as string;
    const player2Name = formData.get('player2Name') as string;

    setGameState({
      ...initialGameState,
      player1Name,
      player2Name,
      gameStartTime: new Date(),
    });
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Shogi Game</h1>
        <form onSubmit={handleStartGame} className="flex flex-col items-center">
          <input
            type="text"
            name="player1Name"
            placeholder="Player 1 Name (Sente)"
            required
            className="mb-2 p-2 text-black"
          />
          <input
            type="text"
            name="player2Name"
            placeholder="Player 2 Name (Gote)"
            required
            className="mb-4 p-2 text-black"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Start Game
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Shogi Game</h1>
      <div className="mb-4">
        <span className="font-bold">{gameState.player1Name}</span> (Sente) vs <span className="font-bold">{gameState.player2Name}</span> (Gote)
      </div>
      <Board gameState={gameState} onMove={handleMove} />
      <MoveHistory moves={gameState.moves} />
      <button
        onClick={handleExportPDF}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <Download className="mr-2" />
        Export Game as PDF
      </button>
    </div>
  );
}

export default App;