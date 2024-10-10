import jsPDF from 'jspdf';
import { GameState, Move } from '../types';

export const exportGameAsPDF = (gameState: GameState) => {
  const pdf = new jsPDF();
  
  // Add title
  pdf.setFontSize(20);
  const title = `Shogi Report - ${gameState.player1Name} vs ${gameState.player2Name}`;
  pdf.text(title, 20, 20);

  // Add game details
  pdf.setFontSize(12);
  pdf.text(`Game Start: ${gameState.gameStartTime.toLocaleString()}`, 20, 30);
  pdf.text(`Game End: ${gameState.gameEndTime?.toLocaleString() || 'Ongoing'}`, 20, 40);
  pdf.text(`Sente (Black): ${gameState.player1Name}`, 20, 50);
  pdf.text(`Gote (White): ${gameState.player2Name}`, 20, 60);

  // Add move history
  pdf.setFontSize(14);
  pdf.text('Move History:', 20, 75);
  
  gameState.moves.forEach((move: Move, index: number) => {
    const moveText = `${index + 1}. ${move.piece.type} ${move.from} → ${move.to}${move.captured ? ` (captured ${move.captured.type})` : ''}${move.promoted ? ' (promoted)' : ''}${move.dropped ? ' (dropped)' : ''}`;
    pdf.setFontSize(10);
    pdf.text(moveText, 25, 85 + (index * 5));
  });

  // Add final board state
  pdf.addPage();
  pdf.setFontSize(16);
  pdf.text('Final Board State', 20, 20);
  
  // Implement logic to draw the final board state here
  // This could be a simple text representation or a more complex graphical representation

  // Save the PDF
  pdf.save(`shogi-report-${gameState.player1Name}-${gameState.player2Name}.pdf`);
};