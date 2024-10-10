import React from 'react';
import { Move } from '../types';

interface MoveHistoryProps {
  moves: Move[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
  return (
    <div className="mt-4 max-h-60 overflow-y-auto">
      <h2 className="text-xl font-bold mb-2">Move History</h2>
      <ul className="list-disc list-inside">
        {moves.map((move, index) => (
          <li key={index}>
            {move.piece.type} {move.from} → {move.to}
            {move.captured && ` (captured ${move.captured.type})`}
            {move.promoted && ' (promoted)'}
            {move.dropped && ' (dropped)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoveHistory;