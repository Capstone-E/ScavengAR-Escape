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

export const boxesClicked = (boxes) => {
  let count = 0;
  boxes.forEach(function (item) {
    if (item !== null) {
      count++;
    }
  });
  if (count === 9) {
    return true;
  } else {
    return false;
  }
};
