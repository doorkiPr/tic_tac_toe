const GameBoard = (() => {
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

const CreatePlayer = (name, mark) => ({ name, mark });
const player1 = CreatePlayer("Player1", "X");
const player2 = CreatePlayer("Player2", "O");

const GameState = (() => {
  let round = {
    currentPlayer: player1,
    counter: 1
  }
  let gameWon = {
    state: false,
    winner: null,
  };
  function returnGameWon() {
    return gameWon
  }
  function returnRound() {
    return round;
  }
  function handleRound() {
    if (round.counter % 2 === 0) {
      round.currentPlayer = player2;
    }
    else {
      round.currentPlayer = player1;
    }
  }
  function checkWin(array) {
    for (let i = 0; i < array.length; i++) {
      //check if rows are equals and not empty
      if (array[i][0] !== "" && array[i][0] === array[i][1] && array[i][1] === array[i][2]) {
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

  function playRound(x, y) {
    if (gameWon.state || round.counter === 10) {
      return // dont play the round if there is a winner or if it's a tie (9 rounds without winner)
    };
    if (x > 2 || x < 0 || y > 2 || y < 0) {
      return //don't play the round if the the coordinates are negative or more then 2
    };
    if (GameBoard.returnGameBoard()[x][y]) {
      return // don'nt play if there's a mark in these coordiantes
    }
    handleRound();
    round.counter++;

    GameBoard.addToGameBoard({ x, y, ...round.currentPlayer });
    console.log(GameBoard.returnGameBoard());

    if (checkWin(GameBoard.returnGameBoard())) { //if theres a winner change gameWon state to true and set the winner to the player who just played the round 
      gameWon.state = true;
      gameWon.winner = round.currentPlayer;
    }
  }
  return { playRound, returnGameWon, returnRound };
})();

const ScreenController = (() => {
  const grid = document.querySelector(".grid");
  grid.addEventListener("click", (e) => {

    console.log(e.target);
    GameState.playRound(e.target.getAttribute("data-x"), e.target.getAttribute("data-y"));
    updateScreen(GameBoard.returnGameBoard());
    displayInformation(GameState.returnGameWon(), GameState.returnRound())

  });

  function updateScreen(array) {

    array.forEach((element, xIndex) => {
      element.forEach((square, yIndex) => { //itterate through each element of our 2d array

        const domCell = document.querySelector(`[data-x='${xIndex}'][data-y='${yIndex}']`);
        domCell.textContent = square;

      })
    });
  }

  function displayInformation(gameWon, round) {
    const textBox = document.querySelector(".turn");
    textBox.textContent = `${round.currentPlayer.name} just played ${round.currentPlayer.mark} ! `;
    if (gameWon.state) {
      textBox.textContent = `${gameWon.winner.name} Won ! Using ${gameWon.winner.mark}`;
    }
    if (round.counter === 10) {
      textBox.textContent = " It's A Draw ! Please restart";
    }
  }
  return { updateScreen }

})();