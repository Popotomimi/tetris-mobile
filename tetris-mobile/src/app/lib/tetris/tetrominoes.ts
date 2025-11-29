export const TETROMINOES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  J: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

export type TetrominoKey = keyof typeof TETROMINOES;

const TETROMINO_KEYS = Object.keys(TETROMINOES) as TetrominoKey[];

export function randomTetromino(): number[][] {
  const rand =
    TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)];
  return TETROMINOES[rand];
}
