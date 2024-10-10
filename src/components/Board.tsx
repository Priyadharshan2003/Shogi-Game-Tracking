import React, { useState } from 'react';
import { GameState, Piece } from '../types';

interface BoardProps {
  gameState: GameState;
  onMove: (from: string, to: string) => void;
}

const Board: React.FC<BoardProps> = ({ gameState, onMove }) => {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  const initialBoard: Record<string, Piece> = {
    '9a': { type: 'lance', player: 'gote', promoted: false },
    '8a': { type: 'knight', player: 'gote', promoted: false },
    '7a': { type: 'silver', player: 'gote', promoted: false },
    '6a': { type: 'gold', player: 'gote', promoted: false },
    '5a': { type: 'king', player: 'gote', promoted: false },
    '4a': { type: 'gold', player: 'gote', promoted: false },
    '3a': { type: 'silver', player: 'gote', promoted: false },
    '2a': { type: 'knight', player: 'gote', promoted: false },
    '1a': { type: 'lance', player: 'gote', promoted: false },
    '8b': { type: 'rook', player: 'gote', promoted: false },
    '2b': { type: 'bishop', player: 'gote', promoted: false },
    '9c': { type: 'pawn', player: 'gote', promoted: false },
    '8c': { type: 'pawn', player: 'gote', promoted: false },
    '7c': { type: 'pawn', player: 'gote', promoted: false },
    '6c': { type: 'pawn', player: 'gote', promoted: false },
    '5c': { type: 'pawn', player: 'gote', promoted: false },
    '4c': { type: 'pawn', player: 'gote', promoted: false },
    '3c': { type: 'pawn', player: 'gote', promoted: false },
    '2c': { type: 'pawn', player: 'gote', promoted: false },
    '1c': { type: 'pawn', player: 'gote', promoted: false },
    '9g': { type: 'pawn', player: 'sente', promoted: false },
    '8g': { type: 'pawn', player: 'sente', promoted: false },
    '7g': { type: 'pawn', player: 'sente', promoted: false },
    '6g': { type: 'pawn', player: 'sente', promoted: false },
    '5g': { type: 'pawn', player: 'sente', promoted: false },
    '4g': { type: 'pawn', player: 'sente', promoted: false },
    '3g': { type: 'pawn', player: 'sente', promoted: false },
    '2g': { type: 'pawn', player: 'sente', promoted: false },
    '1g': { type: 'pawn', player: 'sente', promoted: false },
    '8h': { type: 'bishop', player: 'sente', promoted: false },
    '2h': { type: 'rook', player: 'sente', promoted: false },
    '9i': { type: 'lance', player: 'sente', promoted: false },
    '8i': { type: 'knight', player: 'sente', promoted: false },
    '7i': { type: 'silver', player: 'sente', promoted: false },
    '6i': { type: 'gold', player: 'sente', promoted: false },
    '5i': { type: 'king', player: 'sente', promoted: false },
    '4i': { type: 'gold', player: 'sente', promoted: false },
    '3i': { type: 'silver', player: 'sente', promoted: false },
    '2i': { type: 'knight', player: 'sente', promoted: false },
    '1i': { type: 'lance', player: 'sente', promoted: false },
  };

  const renderSquare = (position: string) => {
    const piece = gameState.board[position] || initialBoard[position];
    const isSelected = selectedSquare === position;
    const squareColor = (parseInt(position[0]) + parseInt(position[1])) % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800';

    return (
      <div
        key={position}
        className={`w-12 h-12 border border-gray-600 flex items-center justify-center ${squareColor} ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}
        onClick={() => handleSquareClick(position)}
      >
        {piece && (
          <div className={`text-2xl ${piece.player === 'sente' ? 'text-blue-300' : 'text-pink-300'}`}>
            {getPieceSymbol(piece)}
          </div>
        )}
      </div>
    );
  };

  const handleSquareClick = (position: string) => {
    if (selectedSquare) {
      onMove(selectedSquare, position);
      setSelectedSquare(null);
    } else {
      setSelectedSquare(position);
    }
  };

  const getPieceSymbol = (piece: Piece) => {
    const symbols: Record<string, string> = {
      king: '玉',
      rook: '飛',
      bishop: '角',
      gold: '金',
      silver: '銀',
      knight: '桂',
      lance: '香',
      pawn: '歩',
    };
    return symbols[piece.type] || piece.type;
  };

  const files = '987654321';
  const ranks = 'abcdefghi';

  return (
    <div className="flex flex-col items-center">
      <div className="flex mb-2">
        {files.split('').map((file) => (
          <div key={file} className="w-12 h-8 flex items-center justify-center text-gray-400">
            {file}
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="flex flex-col mr-2">
          {ranks.split('').map((rank) => (
            <div key={rank} className="w-8 h-12 flex items-center justify-center text-gray-400">
              {rank}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-9 gap-0">
          {ranks.split('').map((rank) =>
            files.split('').map((file) => renderSquare(`${file}${rank}`))
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;