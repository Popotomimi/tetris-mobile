export function checkCollision(
  board: number[][],
  piece: number[][],
  pos: { x: number; y: number }
) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x]) {
        const newY = pos.y + y;
        const newX = pos.x + x;
        if (
          newY >= board.length ||
          newX < 0 ||
          newX >= board[0].length ||
          (newY >= 0 && board[newY][newX])
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export function mergePiece(
  board: number[][],
  piece: number[][],
  pos: { x: number; y: number }
) {
  const newBoard = board.map((row) => [...row]);
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x]) {
        newBoard[pos.y + y][pos.x + x] = 1;
      }
    }
  }
  return newBoard;
}
