import { PLAYERS } from './constants.js';
import { getScore, getValidMoves } from './rules.js';

export function getScoreView(board) {
  return getScore(board);
}

export function getValidMovesView(board, player) {
  return getValidMoves(board, player);
}

export function getWinnerLabel(winner) {
  if (!winner) {
    return null;
  }

  if (winner === 'draw') {
    return '무승부';
  }

  return winner === PLAYERS.BLACK ? '흑' : '백';
}

export function getPlayerLabel(player) {
  if (player === 'draw') {
    return '무승부';
  }

  return player === PLAYERS.BLACK ? '흑' : '백';
}

export function hasValidMoveAt(validMoves, position) {
  return validMoves.some(
    (move) => move.row === position.row && move.col === position.col,
  );
}
