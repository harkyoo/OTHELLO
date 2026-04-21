import { createInitialBoard } from './board.js';
import { PLAYERS, STARTING_PLAYER, STATUS_MESSAGES } from './constants.js';
import {
  applyMove,
  getOpponent,
  getValidMoves,
  getWinner,
  hasAnyValidMove,
  isGameOver,
} from './rules.js';

function createStatusMessage(player) {
  return STATUS_MESSAGES.TURN[player];
}

export function createInitialGameState() {
  return {
    board: createInitialBoard(),
    currentPlayer: STARTING_PLAYER,
    gameOver: false,
    winner: null,
    message: createStatusMessage(STARTING_PLAYER),
    lastMove: null,
    lastAction: 'start',
  };
}

export function getNextTurnState(state, board, player, lastMove) {
  const opponent = getOpponent(player);

  if (isGameOver(board)) {
    return {
      ...state,
      board,
      currentPlayer: opponent,
      gameOver: true,
      winner: getWinner(board),
      message: STATUS_MESSAGES.WINNER[getWinner(board)],
      lastMove,
      lastAction: 'gameOver',
    };
  }

  if (hasAnyValidMove(board, opponent)) {
    return {
      ...state,
      board,
      currentPlayer: opponent,
      gameOver: false,
      winner: null,
      message: createStatusMessage(opponent),
      lastMove,
      lastAction: 'move',
    };
  }

  if (hasAnyValidMove(board, player)) {
    return {
      ...state,
      board,
      currentPlayer: player,
      gameOver: false,
      winner: null,
      message: STATUS_MESSAGES.PASS[opponent],
      lastMove,
      lastAction: 'pass',
    };
  }

  return {
    ...state,
    board,
    currentPlayer: opponent,
    gameOver: true,
    winner: getWinner(board),
    message: STATUS_MESSAGES.WINNER[getWinner(board)],
    lastMove,
    lastAction: 'gameOver',
  };
}

export function playTurn(state, position) {
  if (state.gameOver) {
    return state;
  }

  const nextBoard = applyMove(state.board, state.currentPlayer, position);

  if (!nextBoard) {
    return {
      ...state,
      message: STATUS_MESSAGES.INVALID_MOVE,
      lastAction: 'invalid',
    };
  }

  return getNextTurnState(state, nextBoard, state.currentPlayer, position);
}

export function restartGame() {
  return createInitialGameState();
}

export function getAvailableMoves(state) {
  return getValidMoves(state.board, state.currentPlayer);
}
