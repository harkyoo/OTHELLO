import { getFlippableDiscs, getValidMoves } from './rules.js';

const POSITION_WEIGHTS = [
  [100, -20, 10, 5, 5, 10, -20, 100],
  [-20, -50, -2, -2, -2, -2, -50, -20],
  [10, -2, 4, 2, 2, 4, -2, 10],
  [5, -2, 2, 1, 1, 2, -2, 5],
  [5, -2, 2, 1, 1, 2, -2, 5],
  [10, -2, 4, 2, 2, 4, -2, 10],
  [-20, -50, -2, -2, -2, -2, -50, -20],
  [100, -20, 10, 5, 5, 10, -20, 100],
];

function compareMoves(a, b) {
  if (b.score !== a.score) {
    return b.score - a.score;
  }

  if (a.position.row !== b.position.row) {
    return a.position.row - b.position.row;
  }

  return a.position.col - b.position.col;
}

export function evaluateMove(board, player, position) {
  const flipped = getFlippableDiscs(board, player, position);
  const positionalWeight = POSITION_WEIGHTS[position.row][position.col];

  return positionalWeight + flipped.length * 10;
}

export function chooseBestMove(board, player) {
  const validMoves = getValidMoves(board, player);

  if (validMoves.length === 0) {
    return null;
  }

  const rankedMoves = validMoves.map((position) => ({
    position,
    score: evaluateMove(board, player, position),
  }));

  rankedMoves.sort(compareMoves);

  return rankedMoves[0].position;
}
