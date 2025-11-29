export function clearLines(board: number[][], rows: number, cols: number) {
  const remaining = board.filter((row) => row.some((cell) => cell === 0));
  const cleared = rows - remaining.length;
  while (remaining.length < rows) {
    remaining.unshift(Array(cols).fill(0));
  }
  return { newBoard: remaining, cleared };
}
