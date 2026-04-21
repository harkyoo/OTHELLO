import { describe, expect, it } from 'vitest';
import {
  createEmptyBoard,
  createInitialBoard,
  getCell,
  setCell,
} from '../../src/game/board.js';
import { BOARD_SIZE, PLAYERS } from '../../src/game/constants.js';

describe('board utilities', () => {
  it('creates an empty 8x8 board by default', () => {
    const board = createEmptyBoard();

    expect(board).toHaveLength(BOARD_SIZE);
    expect(board.every((row) => row.length === BOARD_SIZE)).toBe(true);
    expect(board.flat().every((cell) => cell === null)).toBe(true);
  });

  it('creates the expected initial disc layout', () => {
    const board = createInitialBoard();

    expect(board[3][3]).toBe(PLAYERS.WHITE);
    expect(board[3][4]).toBe(PLAYERS.BLACK);
    expect(board[4][3]).toBe(PLAYERS.BLACK);
    expect(board[4][4]).toBe(PLAYERS.WHITE);
  });

  it('returns a new board when setting a cell', () => {
    const board = createEmptyBoard();
    const nextBoard = setCell(board, { row: 0, col: 0 }, PLAYERS.BLACK);

    expect(getCell(board, { row: 0, col: 0 })).toBe(null);
    expect(getCell(nextBoard, { row: 0, col: 0 })).toBe(PLAYERS.BLACK);
  });
});
