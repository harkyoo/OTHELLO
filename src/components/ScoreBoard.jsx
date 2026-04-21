function ScoreBoard({ score, currentPlayer, gameOver, gameMode }) {
  return (
    <section className="info-card">
      <div className="score-grid">
        <article
          className={`score-card ${currentPlayer === 'black' && !gameOver ? 'score-card--active' : ''}`}
        >
          <p className="score-card__label">흑</p>
          <p className="score-card__owner">
            {gameMode === 'ai' ? '플레이어' : '플레이어 1'}
          </p>
          <strong className="score-card__value">{score.black}</strong>
        </article>
        <article
          className={`score-card ${currentPlayer === 'white' && !gameOver ? 'score-card--active' : ''}`}
        >
          <p className="score-card__label">백</p>
          <p className="score-card__owner">
            {gameMode === 'ai' ? 'AI' : '플레이어 2'}
          </p>
          <strong className="score-card__value">{score.white}</strong>
        </article>
      </div>
    </section>
  );
}

export default ScoreBoard;
