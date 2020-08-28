import React, { useState, Component } from 'react';
import { winner, boxesClicked } from './helperz';
import {
  ViroButton,
  ViroNode,
  ViroFlexView,
  ViroAmbientLight,
} from 'react-viro';

// const Board = (props) => {
//   return <ViroButton onClick={props.onClick}>{props.value}</ViroButton>;
// };

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      //makes the ticboard
      boxes: Array(9).fill(null),
      history: [],
      isNext: [],
      gameKey: false,
    };
  }
  handleClick(i) {
    //sees wassup with the box states
    const boxes = this.state.boxes.slice();
    //get current state of gameplay
    let history = this.state.history;
    //stops if theres a winner
    if (winner(boxes) || boxes[i]) {
      return;
    }
    boxes[i] = this.state.isNext ? 'X' : 'O';
    history.push(this.state.isNext ? 'X' : 'O');
    this.setState({
      boxes: boxes,
      history: history,
      isNext: !this.state.isNext,
    });
  }

  render() {
    const winners = winner(this.state.boxes);
    const isFilled = boxesClicked(this.state.boxes);
    let status;
    // if (winner) {
    //   this.setState({ gameKey: true });
    // }
    return (
      <ViroNode>
        <ViroAmbientLight color="#ffffff" intensity={500} />
        <ViroFlexView
          position={[0, -1, -3.5]}
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          backgroundColor="black"
          rotation={[0, 0, 0]}
          height={1.5}
          width={1.5}
        ></ViroFlexView>
      </ViroNode>
    );
  }
}

/* BOARD.JS OLD CODE
import React from 'react';
import Unit from './Unit';
const Board = ({ squares, onClick }) => (
  <div>
    {squares.map((square, i) => (
      <Unit key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);
export default Board;
*/
/* UNIT.JS OLD CODE
import React from 'react';

const Unit = ({ value, onClick }) => {
  const style = value ? `unit ${value}` : `unit`;
  return (
    <button className={style} onClick={onClick}>
      {value}
    </button>
  );
};

export default Unit;
*/
