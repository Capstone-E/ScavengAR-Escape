import React, { useState, Component } from 'react';
import { winner, boxesClicked } from './helperz';
import {
  ViroFlexView,
  ViroQuad,
  ViroMaterials,
  ViroNode,
  ViroText,
} from 'react-viro';
import { Box } from './Board';

// const Board = (props) => {
//   return <ViroButton onClick={props.onClick}>{props.value}</ViroButton>;
// };

// export default class Game extends Component {
//   constructor() {
//     super();
//     this.state = {
//       //makes the ticboard
//       boxes: Array(9).fill(null),
//       history: [],
//       isNext: [],
//       gameKey: false,
//     };
//   }
//   handleClick(i) {
//     //sees wassup with the box states
//     const boxes = this.state.boxes.slice();
//     //get current state of gameplay
//     let history = this.state.history;
//     //stops if theres a winner
//     if (winner(boxes) || boxes[i]) {
//       return;
//     }
//     if (boxesClicked(boxes) === true) {
//       return;
//     }
//     //x, o marks
//     boxes[i] = this.state.isNext ? 'X' : 'O';
//     //add it to the history
//     history.push(this.state.isNext ? 'X' : 'O');
//     //updates the state
//     this.setState({
//       boxes: boxes,
//       history: history,
//       isNext: !this.state.isNext,
//     });
//   }
//   tryAgain = () => {
//     this.setState({
//       boxes: Array(9).fill(null),
//       history: [],
//       isNext: true,
//       gameKey: false,
//     });
//   };
//   render() {
//     //if there's a winner
//     const winners = winner(this.state.boxes);
//     //if all the boxes are clicked
//     const isFilled = boxesClicked(this.state.boxes);
//     //text to send
//     let status;
//     // if (winner) {
//     //   this.setState({ gameKey: true });
//     // }
//     if (winner) {
//       status = 'you won :/, now get that key and get outta here!';
//     } else {
//       status = "you'd better try again... or you may never leave.";
//     }
//     return (
//       <ViroNode>
//         <ViroAmbientLight color="#ffffff" intensity={500} />

//         <Box value={this.state.boxes[0]} onClick={() => this.boxesClicked(0)} />
//       </ViroNode>
//     );
//   }
// }

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

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      gameBoard: this.makeBoard(3, 3),
    };
    // this.clickSquare = this.clickSquare.bind(this);
  }
  makeBoard = (height, width) => {
    let board = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        let square = Math.round(Math.random());
        row.push(square);
      }
      board.push(row);
    }
    return board;
  };
  render() {
    return (
      <ViroNode>
        <ViroFlexView
          position={[0, -1, -3.6]}
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          backgroundColor="white"
          rotation={[0, 0, 0]}
          height={1.5}
          width={1.5}
        >
          {this.state.gameBoard.map((row, rowIdx) => {
            return (
              <ViroFlexView
                key={`row${rowIdx}`}
                style={{ flexDirection: 'row' }}
                width={1.5}
                height={1.5}
              >
                {row.map((place, colIdx) => {
                  return (
                    <ViroQuad
                      style={{ flexDirection: 'column' }}
                      key={`place${colIdx}`}
                      width={1.2}
                      height={1.2}
                      materials={place ? ['theX'] : ['theO']}
                    >
                      {/* {Box} */}
                    </ViroQuad>
                  );
                })}
              </ViroFlexView>
            );
          })}
        </ViroFlexView>
      </ViroNode>
    );
  }
}

ViroMaterials.createMaterials({
  theX: {
    diffuseTexture: require('../res/theticX.png'),
  },
  theO: {
    diffuseTexture: require('../res/theticO.png'),
  },
});
