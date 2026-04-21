function GameModeSelector({ gameMode, onChangeMode }) {
  return (
    <section className="info-card">
      <p className="info-card__eyebrow">게임 모드</p>
      <div className="mode-toggle" role="tablist" aria-label="게임 모드 선택">
        <button
          className={`mode-toggle__button ${gameMode === 'pvp' ? 'mode-toggle__button--active' : ''}`}
          type="button"
          onClick={() => onChangeMode('pvp')}
        >
          2인 대전
        </button>
        <button
          className={`mode-toggle__button ${gameMode === 'ai' ? 'mode-toggle__button--active' : ''}`}
          type="button"
          onClick={() => onChangeMode('ai')}
        >
          AI 대전
        </button>
      </div>
    </section>
  );
}

export default GameModeSelector;
