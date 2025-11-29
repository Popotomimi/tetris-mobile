export function rotatePiece(piece: number[][]): number[][] {
  return piece[0].map((_, i) => piece.map((row) => row[i])).reverse();
}
