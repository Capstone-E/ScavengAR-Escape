import React from 'react';
import Unit from './Unit';
const Board = ({ squares, onClick }) => (
  <div>
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);
export default Board;
