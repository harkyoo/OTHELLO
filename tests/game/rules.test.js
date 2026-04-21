import { describe, expect, it } from 'vitest';
import { createEmptyBoard, createInitialBoard, setCell } from '../../src/game/board.js';
import { PLAYERS } from '../../src/game/constants.js';
import {
  applyMove,
  getScore,
  getValidMoves,
  getWinner,
  isGameOver,
} from '../../src/game/rules.js';

describe('rules engine', () => {
  it('finds four valid opening moves for black', () => {
    const board = createInitialBoard();
    const moves = getValidMoves(board, PLAYERS.BLACK);

    expect(moves).toEqual([
      { row: 2, col: 3 },
      { row: 3, col: 2 },
      { row: 4, col: 5 },
      { row: 5, col: 4 },
    ]);
  });

  it('applies a move and flips captured discs', () => {
    const board = createInitialBoard();
    const nextBoard = applyMove(board, PLAYERS.BLACK, { row: 2, col: 3 });

    expect(nextBoard[2][3]).toBe(PLAYERS.BLACK);
    expect(nextBoard[3][3]).toBe(PLAYERS.BLACK);
    expect(getScore(nextBoard)).toEqual({ black: 4, white: 1 });
  });

  it('detects winner on a finished board', () => {
    let board = createEmptyBoard();

    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        board = setCell(board, { row, col }, PLAYERS.BLACK);
      }
    }

    expect(isGameOver(board)).toBe(true);
    expect(getWinner(board)).toBe(PLAYERS.BLACK);
  });
});
