function Cell({ value, position, isValidMove, isLastMove, onClick }) {
  const classes = [
    'board-cell',
    value ? `board-cell--${value}` : '',
    isValidMove ? 'board-cell--valid' : '',
    isLastMove ? 'board-cell--last' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      type="button"
      onClick={() => onClick(position)}
      aria-label={`${position.row + 1}행 ${position.col + 1}열`}
    >
      {value ? <span className={`disc disc--${value}`} /> : null}
      {!value && isValidMove ? <span className="move-hint" /> : null}
    </button>
  );
}

export default Cell;
