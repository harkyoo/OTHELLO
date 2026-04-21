import {
  BOARD_SIZE,
  EMPTY_CELL,
  INITIAL_DISC_POSITIONS,
  PLAYERS,
} from './constants.js';

export function createEmptyBoard(size = BOARD_SIZE) {
  return Array.from({ length: size }, () => Array(size).fill(EMPTY_CELL));
}

export function isInBounds(row, col, size = BOARD_SIZE) {
  return row >= 0 && row < size && col >= 0 && col < size;
}

export function cloneBoard(board) {
  return board.map((row) => [...row]);
}

export function getCell(board, position) {
  const { row, col } = position;

  if (!isInBounds(row, col, board.length)) {
    return undefined;
  }

  return board[row][col];
}

export function setCell(board, position, value) {
  const { row, col } = position;

  if (!isInBounds(row, col, board.length)) {
    throw new RangeError(`Cell position out of bounds: (${row}, ${col})`);
  }

  const nextBoard = cloneBoard(board);
  nextBoard[row][col] = value;
  return nextBoard;
}

export function createInitialBoard() {
  let board = createEmptyBoard();

  for (const position of INITIAL_DISC_POSITIONS[PLAYERS.WHITE]) {
    board = setCell(board, position, PLAYERS.WHITE);
  }

  for (const position of INITIAL_DISC_POSITIONS[PLAYERS.BLACK]) {
    board = setCell(board, position, PLAYERS.BLACK);
  }

  return board;
}
