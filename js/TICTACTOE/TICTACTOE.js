// taken from https://github.com/codeSTACKr/react-tic-tac-toe-hooks

import React, { useState } from 'react';
import { winner } from './helperz';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winners = winner(history[stepNumber]);
  const xO = xIsNext ? 'X' : 'O';

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : 'Go to Start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>React Tic Tac Toe - With Hooks</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? 'Winner: ' + winner : 'Next Player: ' + xO}</h3>
      </div>
    </>
  );
};

export default Game;

//This is the file to ReactDom render, react-dom is not installed in this application yet
/* import React from "react";
import ReactDom from "react-dom";
import "./index.css";
import Game from "./components/Game";
ReactDom.render(<Game />, document.getElementById("root")); */