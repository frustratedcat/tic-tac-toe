"use strict";

// Create the board for the game
function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  // Get board to pass to UI to render
  const getBoard = () => board;

  // Place token on board
  const dropToken = (row, column, player) => {
    const availableCells = board
      .filter((row) => row[column].getValue() === 0)
      .map((row) => row[column]);

    if (!availableCells.length) return;

    board[row][column].addToken(player);
  };

  // // Log the board to check things
  // const printBoard = () => {
  //   const boardWithCellValues = board.map((row) =>
  //     row.map((cell) => cell.getValue())
  //   );
  // };

  return { getBoard, dropToken };
}

// Create function to take player selection and put on board
function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

// Create function to control the game
function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = GameBoard();

  // Create initial players
  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  // Get active player and switch players after each turn
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  // Play a round
  const playRound = (cell, row, column) => {
    console.log(
      `Placing ${activePlayer.name}'s ${activePlayer.token} in cell ${cell}`
    );
    board.dropToken(row, column, activePlayer.token);

    switchPlayerTurn();
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

// Create function to make random choice for AI
function GetRandomChoice(min = 1, max = 9) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min + 1) + min);
  return result;
}

// Create function to put game on screen
function ScreenController() {
  const game = GameController();
  const board = game.getBoard();
  const activePlayer = () => game.getActivePlayer();

  let emptyCells = true;
  let winner = false;

  let boardCellOne,
    boardCellTwo,
    boardCellThree,
    boardCellFour,
    boardCellFive,
    boardCellSix,
    boardCellSeven,
    boardCellEight,
    boardCellNine;

  function getBoardCellValues() {
    boardCellOne = board[0][0].getValue();
    boardCellTwo = board[0][1].getValue();
    boardCellThree = board[0][2].getValue();
    boardCellFour = board[1][0].getValue();
    boardCellFive = board[1][1].getValue();
    boardCellSix = board[1][2].getValue();
    boardCellSeven = board[2][0].getValue();
    boardCellEight = board[2][1].getValue();
    boardCellNine = board[2][2].getValue();
  }

  function showBoard() {
    return `${boardCellOne === 0 ? [1] : boardCellOne} | ${
      boardCellTwo === 0 ? [2] : boardCellTwo
    } | ${boardCellThree === 0 ? [3] : boardCellThree}\n${
      boardCellFour === 0 ? [4] : boardCellFour
    } | ${boardCellFive === 0 ? [5] : boardCellFive} | ${
      boardCellSix === 0 ? [6] : boardCellSix
    }\n${boardCellSeven === 0 ? [7] : boardCellSeven} | ${
      boardCellEight === 0 ? [8] : boardCellEight
    } | ${boardCellNine === 0 ? [9] : boardCellNine}`;
  }

  // Make player selection
  function makeSelection() {
    getBoardCellValues();
    console.log(`${showBoard()}`);

    let selectedRow;
    let selectedColumn;
    let selectedCell;

    // Get user selection
    if (activePlayer().name === "Player One") {
      console.log("running for player one");
      selectedCell = Number(
        prompt(`${activePlayer().name}:\nChoose a cell:\n${showBoard()}`)
      );

      // Evaluate player selection
      if (!selectedCell || selectedCell > 9 || selectedCell < 1) {
        console.log(`Invalid input given`);
        return;
      } else {
        checkBoardCells();
        if (selectedRow === undefined) {
          return;
        }
      }
    } else if (activePlayer().name === "Player Two") {
      console.log("running for player two");
      // Get computer selection
      selectedCell = GetRandomChoice();

      // Evaluate computer selection
      checkBoardCells();
      if (selectedRow === undefined) {
        return;
      }
    }
    console.log(selectedCell, selectedRow, selectedColumn);

    //Check board values
    function checkBoardCells() {
      console.log(selectedCell);
      if (
        (selectedCell === 1 && boardCellOne === "X") ||
        (selectedCell === 1 && boardCellOne === "O") ||
        (selectedCell === 2 && boardCellTwo === "X") ||
        (selectedCell === 2 && boardCellTwo === "O") ||
        (selectedCell === 3 && boardCellThree === "X") ||
        (selectedCell === 3 && boardCellThree === "O") ||
        (selectedCell === 4 && boardCellFour === "X") ||
        (selectedCell === 4 && boardCellFour === "O") ||
        (selectedCell === 5 && boardCellFive === "X") ||
        (selectedCell === 5 && boardCellFive === "O") ||
        (selectedCell === 6 && boardCellSix === "X") ||
        (selectedCell === 6 && boardCellSix === "O") ||
        (selectedCell === 7 && boardCellSeven === "X") ||
        (selectedCell === 7 && boardCellSeven === "O") ||
        (selectedCell === 8 && boardCellEight === "X") ||
        (selectedCell === 8 && boardCellEight === "O") ||
        (selectedCell === 9 && boardCellNine === "X") ||
        (selectedCell === 9 && boardCellNine === "O")
      ) {
        console.log(
          `Cell ${selectedCell} has already been selected by ${(function () {
            if (
              (activePlayer().token === "X" &&
                selectedCell === 1 &&
                boardCellOne === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 2 &&
                boardCellTwo === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 3 &&
                boardCellThree === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 4 &&
                boardCellFour === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 5 &&
                boardCellFive === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 6 &&
                boardCellSix === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 7 &&
                boardCellSeven === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 8 &&
                boardCellEight === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 9 &&
                boardCellNine === "X") ||
              (activePlayer().token === "O" &&
                selectedCell === 1 &&
                boardCellOne === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 2 &&
                boardCellTwo === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 3 &&
                boardCellThree === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 4 &&
                boardCellFour === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 5 &&
                boardCellFive === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 6 &&
                boardCellSix === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 7 &&
                boardCellSeven === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 8 &&
                boardCellEight === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 9 &&
                boardCellNine === "O")
            ) {
              return activePlayer().name;
            } else {
              return activePlayer().name === "Player One"
                ? "Player Two"
                : "Player One";
            }
          })()}, please select again`
        );
        return;
      } else {
        if (selectedCell === 1) {
          selectedRow = 0;
          selectedColumn = 0;
        } else if (selectedCell === 2) {
          selectedRow = 0;
          selectedColumn = 1;
        } else if (selectedCell === 3) {
          selectedRow = 0;
          selectedColumn = 2;
        } else if (selectedCell === 4) {
          selectedRow = 1;
          selectedColumn = 0;
        } else if (selectedCell === 5) {
          selectedRow = 1;
          selectedColumn = 1;
        } else if (selectedCell === 6) {
          selectedRow = 1;
          selectedColumn = 2;
        } else if (selectedCell === 7) {
          selectedRow = 2;
          selectedColumn = 0;
        } else if (selectedCell === 8) {
          selectedRow = 2;
          selectedColumn = 1;
        } else if (selectedCell === 9) {
          selectedRow = 2;
          selectedColumn = 2;
        }
      }
      console.log(selectedCell, selectedRow, selectedColumn);
    }

    console.log(selectedCell, selectedRow, selectedColumn);
    // Pass choice data to playRound()
    game.playRound(selectedCell, selectedRow, selectedColumn);
    getBoardCellValues();
  }

  // Check for empty cells
  function checkEmptyCells() {
    checkForWinner();
    if (winner === true) {
      console.log(
        `${(function () {
          return activePlayer().name === "Player One"
            ? "Player Two"
            : "Player One";
        })()} wins!`
      );
      return;
    } else if (
      boardCellOne !== 0 &&
      boardCellTwo !== 0 &&
      boardCellThree !== 0 &&
      boardCellFour !== 0 &&
      boardCellFive !== 0 &&
      boardCellSix !== 0 &&
      boardCellSeven !== 0 &&
      boardCellEight !== 0 &&
      boardCellNine !== 0
    ) {
      emptyCells = false;
      console.log("It's a draw!");
    }
  }

  // Check if a player has won the game
  function checkForWinner() {
    if (
      // Check if Player One wins on top row
      boardCellOne === "X" &&
      boardCellTwo === "X" &&
      boardCellThree === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on middle row
      boardCellFour === "X" &&
      boardCellFive === "X" &&
      boardCellSix === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on bottom row
      boardCellSeven === "X" &&
      boardCellEight === "X" &&
      boardCellNine === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on left column
      boardCellOne === "X" &&
      boardCellFour === "X" &&
      boardCellSeven === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on middle column
      boardCellTwo === "X" &&
      boardCellFive === "X" &&
      boardCellEight === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on right column
      boardCellThree === "X" &&
      boardCellSix === "X" &&
      boardCellNine === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on ascending diagonal
      boardCellSeven === "X" &&
      boardCellFive === "X" &&
      boardCellThree === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on descending diagonal
      boardCellOne === "X" &&
      boardCellFive === "X" &&
      boardCellNine === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on top row
      boardCellOne === "O" &&
      boardCellTwo === "O" &&
      boardCellThree === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on middle row
      boardCellFour === "O" &&
      boardCellFive === "O" &&
      boardCellSix === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on bottom row
      boardCellSeven === "O" &&
      boardCellEight === "O" &&
      boardCellNine === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on left column
      boardCellOne === "O" &&
      boardCellFour === "O" &&
      boardCellSeven === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on middle column
      boardCellTwo === "O" &&
      boardCellFive === "O" &&
      boardCellEight === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on right column
      boardCellThree === "O" &&
      boardCellSix === "O" &&
      boardCellNine === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on ascending diagonal
      boardCellSeven === "O" &&
      boardCellFive === "O" &&
      boardCellThree === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on descending diagonal
      boardCellOne === "O" &&
      boardCellFive === "O" &&
      boardCellNine === "O"
    ) {
      winner = true;
    }
  }

  // Run a turn
  const runTurn = () => {
    while (emptyCells === true && winner === false) {
      console.log(`${activePlayer().name}'s turn`);
      makeSelection();
      checkEmptyCells();
    }
    console.log(`${showBoard()}`);
  };

  runTurn();
}

// Run game
ScreenController();
