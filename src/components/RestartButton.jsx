function RestartButton({ onRestart }) {
  return (
    <button className="restart-button" type="button" onClick={onRestart}>
      게임 재시작
    </button>
  );
}

export default RestartButton;
