import { describe, expect, it } from 'vitest';
import { createEmptyBoard, createInitialBoard, setCell } from '../../src/game/board.js';
import { chooseBestMove } from '../../src/game/ai.js';
import { PLAYERS } from '../../src/game/constants.js';
import { isValidMove } from '../../src/game/rules.js';

describe('ai move selection', () => {
  it('always chooses a valid opening move', () => {
    const board = createInitialBoard();
    const move = chooseBestMove(board, PLAYERS.WHITE);

    expect(move).not.toBeNull();
    expect(isValidMove(board, PLAYERS.WHITE, move)).toBe(true);
  });

  it('prefers a corner when one is available', () => {
    let board = createEmptyBoard();

    board = setCell(board, { row: 0, col: 1 }, PLAYERS.BLACK);
    board = setCell(board, { row: 0, col: 2 }, PLAYERS.WHITE);
    board = setCell(board, { row: 1, col: 0 }, PLAYERS.BLACK);
    board = setCell(board, { row: 2, col: 0 }, PLAYERS.WHITE);

    const move = chooseBestMove(board, PLAYERS.WHITE);

    expect(move).toEqual({ row: 0, col: 0 });
  });
});
