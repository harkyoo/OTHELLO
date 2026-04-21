import Cell from './Cell.jsx';

function Board({ board, validMoves, lastMove, onCellClick, disabled }) {
  return (
    <section className="board-panel">
      <div
        className={`board-grid ${disabled ? 'board-grid--disabled' : ''}`}
        aria-label="오델로 보드"
        role="grid"
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const position = { row: rowIndex, col: colIndex };
            const isValidMove = validMoves.some(
              (move) => move.row === rowIndex && move.col === colIndex,
            );
            const isLastMove =
              lastMove?.row === rowIndex && lastMove?.col === colIndex;

            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                position={position}
                isValidMove={isValidMove}
                isLastMove={isLastMove}
                onClick={onCellClick}
                disabled={disabled}
              />
            );
          }),
        )}
      </div>
    </section>
  );
}

export default Board;
