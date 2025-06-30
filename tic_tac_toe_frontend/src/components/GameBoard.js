import React from 'react';

const GameBoard = ({ board, onCellClick, disabled }) => {
  return (
    <div className="game-board">
      {board.map((cell, index) => (
        <button
          key={index}
          className="cell"
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
