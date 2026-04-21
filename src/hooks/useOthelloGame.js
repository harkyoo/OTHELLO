import { useEffect, useState, startTransition } from 'react';
import { chooseBestMove } from '../game/ai.js';
import { createInitialGameState, playTurn, restartGame } from '../game/gameState.js';
import {
  getGameModeLabel,
  getPlayerLabel,
  getScoreView,
  getValidMovesView,
  hasValidMoveAt,
} from '../game/selectors.js';
import {
  AI_MOVE_DELAY_MS,
  AI_PLAYER,
  GAME_MODES,
  STATUS_MESSAGES,
} from '../game/constants.js';

export function useOthelloGame() {
  const [state, setState] = useState(() => createInitialGameState());
  const [gameMode, setGameMode] = useState(GAME_MODES.PVP);
  const [isThinking, setIsThinking] = useState(false);

  const validMoves = getValidMovesView(state.board, state.currentPlayer);
  const score = getScoreView(state.board);
  const isAiMode = gameMode === GAME_MODES.AI;
  const isAiTurn =
    isAiMode && !state.gameOver && state.currentPlayer === AI_PLAYER;
  const displayMessage = isThinking ? STATUS_MESSAGES.AI_THINKING : state.message;

  useEffect(() => {
    if (!isAiTurn) {
      setIsThinking(false);
      return undefined;
    }

    setIsThinking(true);

    const timerId = window.setTimeout(() => {
      startTransition(() => {
        setState((currentState) => {
          if (currentState.gameOver || currentState.currentPlayer !== AI_PLAYER) {
            return currentState;
          }

          const aiMove = chooseBestMove(currentState.board, AI_PLAYER);

          if (!aiMove) {
            return currentState;
          }

          return playTurn(currentState, aiMove);
        });
        setIsThinking(false);
      });
    }, AI_MOVE_DELAY_MS);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [isAiTurn]);

  function handleCellClick(position) {
    if (isAiTurn || isThinking) {
      return;
    }

    startTransition(() => {
      setState((currentState) => playTurn(currentState, position));
    });
  }

  function handleRestart() {
    startTransition(() => {
      setState(restartGame());
      setIsThinking(false);
    });
  }

  function handleChangeMode(nextMode) {
    startTransition(() => {
      setGameMode(nextMode);
      setState(createInitialGameState());
      setIsThinking(false);
    });
  }

  return {
    ...state,
    gameMode,
    gameModeLabel: getGameModeLabel(gameMode),
    isAiTurn,
    isThinking,
    aiPlayer: AI_PLAYER,
    currentPlayerLabel: getPlayerLabel(state.currentPlayer),
    winnerLabel: state.winner ? getPlayerLabel(state.winner) : null,
    score,
    validMoves,
    hasValidMoveAt: (position) => hasValidMoveAt(validMoves, position),
    displayMessage,
    handleCellClick,
    handleChangeMode,
    handleRestart,
  };
}
