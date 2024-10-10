export interface Piece {
  type: string;
  player: 'sente' | 'gote';
  promoted: boolean;
}

export interface Move {
  piece: Piece;
  from: string;
  to: string;
  captured?: Piece;
  promoted?: boolean;
  dropped?: boolean;
}

export interface GameState {
  board: Record<string, Piece | null>;
  moves: Move[];
  currentPlayer: 'sente' | 'gote';
  gameStartTime: Date;
  gameEndTime?: Date;
  player1Name: string;
  player2Name: string;
}

export interface PhysicalBoardMove {
  from: string;
  to: string;
}