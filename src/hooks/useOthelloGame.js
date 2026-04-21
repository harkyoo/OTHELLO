import { useState, startTransition } from 'react';
import { createInitialGameState, playTurn, restartGame } from '../game/gameState.js';
import {
  getPlayerLabel,
  getScoreView,
  getValidMovesView,
  hasValidMoveAt,
} from '../game/selectors.js';

export function useOthelloGame() {
  const [state, setState] = useState(() => createInitialGameState());

  const validMoves = getValidMovesView(state.board, state.currentPlayer);
  const score = getScoreView(state.board);

  function handleCellClick(position) {
    startTransition(() => {
      setState((currentState) => playTurn(currentState, position));
    });
  }

  function handleRestart() {
    startTransition(() => {
      setState(restartGame());
    });
  }

  return {
    ...state,
    currentPlayerLabel: getPlayerLabel(state.currentPlayer),
    winnerLabel: state.winner ? getPlayerLabel(state.winner) : null,
    score,
    validMoves,
    hasValidMoveAt: (position) => hasValidMoveAt(validMoves, position),
    handleCellClick,
    handleRestart,
  };
}
