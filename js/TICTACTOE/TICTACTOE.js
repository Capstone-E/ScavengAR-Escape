import React, { useState, Component } from 'react';
import {
  winner,
  makeTheBoard,
  checkMovesLeft,
  evaulate,
  minMax,
  bestMove,
} from './helperz';
import {
  ViroFlexView,
  ViroQuad,
  ViroMaterials,
  ViroNode,
  ViroBox,
  ViroText,
  ViroButton,
} from 'react-viro';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vsPc: true,
      playerOne: 'X',
      computer: 'O',
      playerTurn: true,
      board: ['', '', '', '', '', '', '', '', ''],
    };
    this.handlReset = this.handlReset.bind(this);
  }
  handleBoxClick(index, playerTurn) {
    if (this.state.board[index] === '' && playerTurn === true) {
      let newBoard = this.state.board;
      newBoard[index] = this.state.playerOne;
      this.setState({ board: newBoard });
      let computerMove = bestMove(newBoard);
      if (computerMove !== -4) newBoard[computerMove] = this.state.computer;
      this.setState({ board: newBoard });
    } else {
      console.log('handleclick hits but is broked');
    }
  }
  handlReset() {
    this.setState({
      board: ['', '', '', '', '', '', '', '', ''],
      playerTurn: true,
    });
  }
  render() {
    let decideWinner = winner(this.state.board);
    let playerTurn = decideWinner === null ? true : false;

    // if (decideWinner !== null) try again | you won!

    return (
      <ViroNode>
        <ViroFlexView background={['board']}>
          {this.state.board.map((cell, index) => {
            return (
              <ViroQuad
                key={`board${index}`}
                onClick={this.handleBoxClick(index).bind(this)}
              >
                {cell}
              </ViroQuad>
            );
          })}
        </ViroFlexView>
      </ViroNode>
    );
  }
}
ViroMaterials.createMaterials({
  board: {
    diffuseTexture: require('../res/ticGrid.png'),
  },
  theX: {
    diffuseTexture: require('../res/theticX.png'),
  },
  theO: {
    diffuseTexture: require('../res/theticO.png'),
  },
});

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

// export default class Game extends Component {
//   constructor() {
//     super();
//     this.state = {
//       gameBoard: this.makeBoard(3, 3),
//     };
//     // this.clickSquare = this.clickSquare.bind(this);
//   }
//   makeBoard = (height, width) => {
//     let board = [];
//     for (let i = 0; i < height; i++) {
//       let row = [];
//       for (let j = 0; j < width; j++) {
//         let square = Math.round(Math.random());
//         row.push(square);
//       }
//       board.push(row);
//     }
//     return board;
//   };
//   render() {
//     return (
//       <ViroNode>
//         {/* <ViroFlexView> */}
//         {this.state.gameBoard.map((row, rowIdx) => {
//           return (
//             <ViroFlexView
//               key={`row${rowIdx}`}
//               style={{ flexDirection: 'row' }}
//               width={1.5}
//               height={1.5}
//             >
//               {row.map((place, colIdx) => {
//                 return (
//                   <ViroQuad
//                     style={{ flexDirection: 'column' }}
//                     key={`place${colIdx}`}
//                     width={1.2}
//                     height={1.2}
//                     materials={['theX']['theO']}
//                   ></ViroQuad>
//                 );
//               })}
//             </ViroFlexView>
//           );
//         })}
//         {/* </ViroFlexView> */}
//       </ViroNode>
//     );
//   }
// }

// ViroMaterials.createMaterials({
//   theX: {
//     diffuseTexture: require('../res/theticX.png'),
//   },
//   theO: {
//     diffuseTexture: require('../res/theticO.png'),
//   },
//   grid: {
//     diffuseTexture: require('../res/ticGrid.png'),
//   },
// });

// const ticTacStyles = StyleSheet.create({
//   box: {
//     borderWidth: 2,
//   },
// });
