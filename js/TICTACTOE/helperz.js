/*
How do you win!
 -----------------
|     |     |     |
|  0  |  1  |  2  |
 ----- ----- -----
|     |     |     |
|   3 |  4  |  5  |
 ----- ----- -----
|     |     |     |
|   6 |  7  |  8  |
 -----------------
*/
export const winner = (units) => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombos.length; i++) {
    const [pos1, pos2, pos3] = winningCombos[i];
    if (
      units[pos1] &&
      units[pos1] === units[pos2] &&
      units[pos1] === units[pos3]
    ) {
      return units[pos1];
    }
  }
  return null;
};

// export const boxesClicked = (boxes) => {
//   let count = 0;
//   boxes.forEach(function (item) {
//     if (item !== null) {
//       count++;
//     }
//   });
//   if (count === 9) {
//     return true;
//   } else {
//     return false;
//   }
// };
// i is rows, j is columns
export const makeTheBoard = (boxes) => {
  let board = [];
  let position = 0;
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i][j] = boxes[position++];
    }
  }
  //console.log(board)
  return board;
};

export const checkMovesLeft = (board) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return true;
      }
    }
  }
  return false;
};
//this is adopted from https://github.com/martchellop/Tictactoe/blob/master/src/App.js application of the miniax algo for tictactoe AI
export const evaulate = (board, depth) => {
  //checkin ze rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2] &&
      board[i][1] === board[i][2]
    ) {
      if (board[i][0] === 'O') return 100 - depth;
      if (board[i][0] === 'X') return depth - 100;
    }
  }
  //checkin ze columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] === board[1][j] &&
      board[0][j] === board[2][j] &&
      board[1][j] === board[2][j]
    ) {
      if (board[0][j] === 'O') return 100 - depth;
      if (board[0][j] === 'X') return depth - 100;
    }
  }
  //checkin the diagonals
  if (
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2] &&
    board[1][1] === board[2][2]
  ) {
    if (board[0][0] === 'O') return 100 - depth;
    if (board[0][0] === 'X') return depth - 100;
  }

  if (
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0] &&
    board[1][1] === board[2][0]
  ) {
    if (board[0][2] === 'O') return 100 - depth;
    if (board[0][2] === 'X') return depth - 100;
  }
  return 0;
};

export const minMax = (board, depth, max) => {
  if (checkMovesLeft(board) === false) {
    return evaulate(board, depth);
  }
  let value = evaulate(board, depth);
  if (value !== 0) return value;
  if (max) {
    let best = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'O';
          best = Math.max(best, minMax(board, depth + 1, !max));
          board[i][j] = '';
        }
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'X';
          best = Math.min(best, minMax(board, depth + 1, !max));
          board[i][j] = '';
        }
      }
    }
    return best;
  }
};

export const bestMove = (boxes) => {
  let board = makeTheBoard(boxes);
  let value,
    row = -1,
    col = -1,
    best = -Infinity;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        board[i][j] = 'O';
        value = minMax(board, 0, false);
        board[i][j] = '';
        if (value > best) {
          best = value;
          row = i;
          col = j;
        }
      }
    }
  }
  return 3 * row + col;
};
