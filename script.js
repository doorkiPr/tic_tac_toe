const gameBoard = (() => {
  const gameBoardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  function addToGameBoard(playerInput) {
    // use X to find the right row (array), then use the Y to select the right cell in said row
    gameBoardArray[playerInput.x].splice(playerInput.y, 1, playerInput.mark)
  }

  function returnGameBoard() {
    return gameBoardArray
  }
  return { returnGameBoard, addToGameBoard };
})();

const gameState = (() => {

  let gameWon = {
    state: false,
    winner: null,
  };

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