import { describe, expect, it } from 'vitest';
import { createEmptyBoard, setCell } from '../../src/game/board.js';
import { PLAYERS } from '../../src/game/constants.js';
import {
  createInitialGameState,
  getNextTurnState,
  playTurn,
  restartGame,
} from '../../src/game/gameState.js';

function createPassScenarioBoard() {
  let board = createEmptyBoard();

  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      board = setCell(board, { row, col }, PLAYERS.BLACK);
    }
  }

  board = setCell(board, { row: 0, col: 1 }, PLAYERS.WHITE);
  board = setCell(board, { row: 0, col: 2 }, null);
  board = setCell(board, { row: 1, col: 1 }, PLAYERS.WHITE);
  board = setCell(board, { row: 1, col: 2 }, null);

  return board;
}

describe('game state transitions', () => {
  it('returns an invalid message on an invalid move', () => {
    const state = createInitialGameState();
    const nextState = playTurn(state, { row: 0, col: 0 });

    expect(nextState.currentPlayer).toBe(PLAYERS.BLACK);
    expect(nextState.lastAction).toBe('invalid');
    expect(nextState.message).toBe('유효하지 않은 위치입니다.');
  });

  it('switches turn after a valid move', () => {
    const state = createInitialGameState();
    const nextState = playTurn(state, { row: 2, col: 3 });

    expect(nextState.currentPlayer).toBe(PLAYERS.WHITE);
    expect(nextState.lastAction).toBe('move');
    expect(nextState.lastMove).toEqual({ row: 2, col: 3 });
  });

  it('keeps the same player when the opponent must pass', () => {
    const state = createInitialGameState();
    const board = createPassScenarioBoard();
    const nextState = getNextTurnState(state, board, PLAYERS.BLACK, {
      row: 0,
      col: 2,
    });

    expect(nextState.currentPlayer).toBe(PLAYERS.BLACK);
    expect(nextState.lastAction).toBe('pass');
    expect(nextState.message).toBe('백이 둘 수 있는 곳이 없어 턴을 넘깁니다.');
  });

  it('restarts back to the initial game state', () => {
    const restartedState = restartGame();

    expect(restartedState.currentPlayer).toBe(PLAYERS.BLACK);
    expect(restartedState.gameOver).toBe(false);
    expect(restartedState.lastMove).toBeNull();
  });
});
