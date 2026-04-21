function StatusBar({ message, currentPlayerLabel, gameOver, winnerLabel }) {
  return (
    <section className="info-card status-card">
      <p className="info-card__eyebrow">게임 상태</p>
      <p className="status-card__message">{message}</p>
      <p className="status-card__meta">
        {gameOver
          ? winnerLabel === '무승부'
            ? '승부가 나지 않았습니다.'
            : `${winnerLabel}이(가) 더 많은 돌을 확보했습니다.`
          : `현재 차례 플레이어: ${currentPlayerLabel}`}
      </p>
    </section>
  );
}

export default StatusBar;
