import Board from './components/Board.jsx';
import RestartButton from './components/RestartButton.jsx';
import ScoreBoard from './components/ScoreBoard.jsx';
import StatusBar from './components/StatusBar.jsx';
import { useOthelloGame } from './hooks/useOthelloGame.js';

function App() {
  const {
    board,
    currentPlayer,
    currentPlayerLabel,
    gameOver,
    winnerLabel,
    lastMove,
    message,
    score,
    validMoves,
    handleCellClick,
    handleRestart,
  } = useOthelloGame();

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Othello MVP</p>
          <h1>React로 구동되는 2인용 오델로</h1>
        </div>
        <p className="description">
          규칙 엔진과 UI를 분리한 구조로 구성된 로컬 PvP 오델로입니다. 클릭이나
          터치로 돌을 놓고, 점수와 턴 상태를 즉시 확인할 수 있습니다.
        </p>
      </section>
      <section className="game-layout">
        <Board
          board={board}
          validMoves={validMoves}
          lastMove={lastMove}
          onCellClick={handleCellClick}
        />
        <aside className="sidebar">
          <ScoreBoard
            score={score}
            currentPlayer={currentPlayer}
            gameOver={gameOver}
          />
          <StatusBar
            message={message}
            currentPlayerLabel={currentPlayerLabel}
            gameOver={gameOver}
            winnerLabel={winnerLabel}
          />
          <section className="info-card legend-card">
            <p className="info-card__eyebrow">도움말</p>
            <p className="legend-card__text">
              점이 표시된 칸에 둘 수 있습니다. 마지막으로 둔 위치는 금색 테두리로
              강조됩니다.
            </p>
          </section>
          <RestartButton onRestart={handleRestart} />
        </aside>
      </section>
    </main>
  );
}

export default App;
