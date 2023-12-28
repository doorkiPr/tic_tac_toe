const gameBoard = (() => {
  const gameBoardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  return {};
})();

const gameState = (() => {
  function checkWin(array) {

    for (let i = 0; i < array.length; i++) {
      //check if rows are equals and not empty
      if (array[i][0] !== "" && array[i][0] === array[i][1] && array[i][2] === array[i][2]) {
        return true
      }
      //check collumns are equals and not empty
      if (array[0][i] !== "" && array[0][i] === array[1][i] && array[1][i] === array[2][i]) {
        return true
      }
      //check if diagonals are equals and not empty
      if (array[0][0] !== "" && array[0][0] === array[1][1] && array[1][1] === array[2][2]) {
        return true
      }
      if (array[0][2] !== "" && array[0][2] === array[1][1] && array[1][1] === array[2][0]) {
        return true
      }
    }

    return false

  }
  return {};
})();

