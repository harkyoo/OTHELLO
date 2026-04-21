function ScoreBoard({ score, currentPlayer, gameOver }) {
  return (
    <section className="info-card">
      <div className="score-grid">
        <article
          className={`score-card ${currentPlayer === 'black' && !gameOver ? 'score-card--active' : ''}`}
        >
          <p className="score-card__label">흑</p>
          <strong className="score-card__value">{score.black}</strong>
        </article>
        <article
          className={`score-card ${currentPlayer === 'white' && !gameOver ? 'score-card--active' : ''}`}
        >
          <p className="score-card__label">백</p>
          <strong className="score-card__value">{score.white}</strong>
        </article>
      </div>
    </section>
  );
}

export default ScoreBoard;
