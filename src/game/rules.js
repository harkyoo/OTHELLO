import { DIRECTIONS, EMPTY_CELL, PLAYERS } from './constants.js';
import { cloneBoard, getCell, isInBounds, setCell } from './board.js';

export function getOpponent(player) {
  return player === PLAYERS.BLACK ? PLAYERS.WHITE : PLAYERS.BLACK;
}

function collectDirection(board, player, position, direction) {
  const opponent = getOpponent(player);
  const captured = [];
  let row = position.row + direction.row;
  let col = position.col + direction.col;

  while (isInBounds(row, col, board.length)) {
    const cell = board[row][col];

    if (cell === opponent) {
      captured.push({ row, col });
      row += direction.row;
      col += direction.col;
      continue;
    }

    if (cell === player) {
      return captured.length > 0 ? captured : [];
    }

    return [];
  }

  return [];
}

export function getFlippableDiscs(board, player, position) {
  if (getCell(board, position) !== EMPTY_CELL) {
    return [];
  }

  return DIRECTIONS.flatMap((direction) =>
    collectDirection(board, player, position, direction),
  );
}

export function isValidMove(board, player, position) {
  if (!isInBounds(position.row, position.col, board.length)) {
    return false;
  }

  return getFlippableDiscs(board, player, position).length > 0;
}

export function getValidMoves(board, player) {
  const moves = [];

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      const position = { row, col };

      if (isValidMove(board, player, position)) {
        moves.push(position);
      }
    }
  }

  return moves;
}

export function hasAnyValidMove(board, player) {
  return getValidMoves(board, player).length > 0;
}

export function applyMove(board, player, position) {
  const flippableDiscs = getFlippableDiscs(board, player, position);

  if (flippableDiscs.length === 0) {
    return null;
  }

  let nextBoard = setCell(board, position, player);

  for (const disc of flippableDiscs) {
    nextBoard = setCell(nextBoard, disc, player);
  }

  return nextBoard;
}

export function getScore(board) {
  return board.flat().reduce(
    (score, cell) => {
      if (cell === PLAYERS.BLACK) {
        return { ...score, black: score.black + 1 };
      }

      if (cell === PLAYERS.WHITE) {
        return { ...score, white: score.white + 1 };
      }

      return score;
    },
    { black: 0, white: 0 },
  );
}

export function isBoardFull(board) {
  return board.flat().every((cell) => cell !== EMPTY_CELL);
}

export function isGameOver(board) {
  if (isBoardFull(board)) {
    return true;
  }

  return !hasAnyValidMove(board, PLAYERS.BLACK) &&
    !hasAnyValidMove(board, PLAYERS.WHITE);
}

export function getWinner(board) {
  const score = getScore(board);

  if (score.black === score.white) {
    return 'draw';
  }

  return score.black > score.white ? PLAYERS.BLACK : PLAYERS.WHITE;
}

export function previewMove(board, player, position) {
  const nextBoard = applyMove(board, player, position);

  if (!nextBoard) {
    return null;
  }

  return cloneBoard(nextBoard);
}
