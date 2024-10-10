import { PhysicalBoardMove } from '../types';

class PhysicalBoardTracker {
  private onMoveCallback: (move: PhysicalBoardMove) => void;
  private intervalId: number | null = null;

  constructor(onMove: (move: PhysicalBoardMove) => void) {
    this.onMoveCallback = onMove;
    this.startSimulation();
  }

  private startSimulation() {
    this.intervalId = setInterval(() => {
      const move = this.generateRandomMove();
      this.onMoveCallback(move);
    }, 5000); // Simulate a move every 5 seconds
  }

  private generateRandomMove(): PhysicalBoardMove {
    const files = 'abcdefghi';
    const ranks = '123456789';
    const from = files[Math.floor(Math.random() * 9)] + ranks[Math.floor(Math.random() * 9)];
    const to = files[Math.floor(Math.random() * 9)] + ranks[Math.floor(Math.random() * 9)];
    return { from, to };
  }

  public close() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }
}

export default PhysicalBoardTracker;