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
    console.log(board[row][column].getValue());
  };

  return { getBoard, dropToken };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create function to take player selection and put on board
function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create function to get computer choice
function GetComputerChoice() {
  // Create function to make random choice for AI
  function getRandomChoice(min = 1, max = 9) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
  }

  // Create function to create rational AI
  function getRationalChoice() {}

  return { getRandomChoice, getRationalChoice };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create function to get the board
function GetBoardValues() {
  console.log("getting the board");
  const game = GameController();
  const board = game.getBoard();

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
    return {
      boardCellOne,
      boardCellTwo,
      boardCellThree,
      boardCellFour,
      boardCellFive,
      boardCellSix,
      boardCellSeven,
      boardCellEight,
      boardCellNine,
    };
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

  return {
    getBoard: game.getBoard,
    getActivePlayer: game.getActivePlayer,
    playRound: game.playRound,
    getBoardCellValues,
    showBoard,
  };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create function to run each turn of the game
function playTurn() {
  const game = GetBoardValues();
  const activePlayer = () => game.getActivePlayer();
  const getBoardCellValues = () => game.getBoardCellValues();
  const showBoard = () => game.showBoard();

  const computerChoice = GetComputerChoice();
  const randomComputerChoice = () => computerChoice.getRandomChoice();
  const rationalComputerChoice = () => computerChoice.getRationalChoice();

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

      console.log(selectedCell);

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
      selectedCell = randomComputerChoice();

      // Evaluate computer selection
      checkBoardCells();
      if (selectedRow === undefined) {
        return;
      }
    }
    console.log(selectedCell, selectedRow, selectedColumn);

    //Check board values
    function checkBoardCells() {
      console.log("checking board cells");
      if (
        (selectedCell === 1 && getBoardCellValues().boardCellOne === "X") ||
        (selectedCell === 1 && getBoardCellValues().boardCellOne === "O") ||
        (selectedCell === 2 && getBoardCellValues().boardCellTwo === "X") ||
        (selectedCell === 2 && getBoardCellValues().boardCellTwo === "O") ||
        (selectedCell === 3 && getBoardCellValues().boardCellThree === "X") ||
        (selectedCell === 3 && getBoardCellValues().boardCellThree === "O") ||
        (selectedCell === 4 && getBoardCellValues().boardCellFour === "X") ||
        (selectedCell === 4 && getBoardCellValues().boardCellFour === "O") ||
        (selectedCell === 5 && getBoardCellValues().boardCellFive === "X") ||
        (selectedCell === 5 && getBoardCellValues().boardCellFive === "O") ||
        (selectedCell === 6 && getBoardCellValues().boardCellSix === "X") ||
        (selectedCell === 6 && getBoardCellValues().boardCellSix === "O") ||
        (selectedCell === 7 && getBoardCellValues().boardCellSeven === "X") ||
        (selectedCell === 7 && getBoardCellValues().boardCellSeven === "O") ||
        (selectedCell === 8 && getBoardCellValues().boardCellEight === "X") ||
        (selectedCell === 8 && getBoardCellValues().boardCellEight === "O") ||
        (selectedCell === 9 && getBoardCellValues().boardCellNine === "X") ||
        (selectedCell === 9 && getBoardCellValues().boardCellNine === "O")
      ) {
        console.log(
          `Cell ${selectedCell} has already been selected by ${(function () {
            if (
              (activePlayer().token === "X" &&
                selectedCell === 1 &&
                getBoardCellValues().boardCellOne === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 2 &&
                getBoardCellValues().boardCellTwo === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 3 &&
                getBoardCellValues().boardCellThree === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 4 &&
                getBoardCellValues().boardCellFour === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 5 &&
                getBoardCellValues().boardCellFive === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 6 &&
                getBoardCellValues().boardCellSix === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 7 &&
                getBoardCellValues().boardCellSeven === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 8 &&
                getBoardCellValues().boardCellEight === "X") ||
              (activePlayer().token === "X" &&
                selectedCell === 9 &&
                getBoardCellValues().boardCellNine === "X") ||
              (activePlayer().token === "O" &&
                selectedCell === 1 &&
                getBoardCellValues().boardCellOne === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 2 &&
                getBoardCellValues().boardCellTwo === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 3 &&
                getBoardCellValues().boardCellThree === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 4 &&
                getBoardCellValues().boardCellFour === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 5 &&
                getBoardCellValues().boardCellFive === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 6 &&
                getBoardCellValues().boardCellSix === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 7 &&
                getBoardCellValues().boardCellSeven === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 8 &&
                getBoardCellValues().boardCellEight === "O") ||
              (activePlayer().token === "O" &&
                selectedCell === 9 &&
                getBoardCellValues().boardCellNine === "O")
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
  }

  let emptyCells = true;
  let winner = false;

  // Check for empty cells
  function checkEmptyCells() {
    console.log(getBoardCellValues());
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
      getBoardCellValues().boardCellOne !== 0 &&
      getBoardCellValues().boardCellTwo !== 0 &&
      getBoardCellValues().boardCellThree !== 0 &&
      getBoardCellValues().boardCellFour !== 0 &&
      getBoardCellValues().boardCellFive !== 0 &&
      getBoardCellValues().boardCellSix !== 0 &&
      getBoardCellValues().boardCellSeven !== 0 &&
      getBoardCellValues().boardCellEight !== 0 &&
      getBoardCellValues().boardCellNine !== 0
    ) {
      console.log(
        getBoardCellValues().boardCellOne,
        getBoardCellValues().boardCellTwo,
        getBoardCellValues().boardCellThree,
        getBoardCellValues().boardCellFour,
        getBoardCellValues().boardCellFive,
        getBoardCellValues().boardCellSix,
        getBoardCellValues().boardCellSeven,
        getBoardCellValues().boardCellEight,
        getBoardCellValues().boardCellNine
      );
      emptyCells = false;
      console.log("It's a draw!");
    }
  }

  // Check if a player has won the game
  function checkForWinner() {
    if (
      // Check if Player One wins on top row
      getBoardCellValues().boardCellOne === "X" &&
      getBoardCellValues().boardCellTwo === "X" &&
      getBoardCellValues().boardCellThree === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on middle row
      getBoardCellValues().boardCellFour === "X" &&
      getBoardCellValues().boardCellFive === "X" &&
      getBoardCellValues().boardCellSix === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on bottom row
      getBoardCellValues().boardCellSeven === "X" &&
      getBoardCellValues().boardCellEight === "X" &&
      getBoardCellValues().boardCellNine === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on left column
      getBoardCellValues().boardCellOne === "X" &&
      getBoardCellValues().boardCellFour === "X" &&
      getBoardCellValues().boardCellSeven === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on middle column
      getBoardCellValues().boardCellTwo === "X" &&
      getBoardCellValues().boardCellFive === "X" &&
      getBoardCellValues().boardCellEight === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on right column
      getBoardCellValues().boardCellThree === "X" &&
      getBoardCellValues().boardCellSix === "X" &&
      getBoardCellValues().boardCellNine === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on ascending diagonal
      getBoardCellValues().boardCellSeven === "X" &&
      getBoardCellValues().boardCellFive === "X" &&
      getBoardCellValues().boardCellThree === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player One wins on descending diagonal
      getBoardCellValues().boardCellOne === "X" &&
      getBoardCellValues().boardCellFive === "X" &&
      getBoardCellValues().boardCellNine === "X"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on top row
      getBoardCellValues().boardCellOne === "O" &&
      getBoardCellValues().boardCellTwo === "O" &&
      getBoardCellValues().boardCellThree === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on middle row
      getBoardCellValues().boardCellFour === "O" &&
      getBoardCellValues().boardCellFive === "O" &&
      getBoardCellValues().boardCellSix === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on bottom row
      getBoardCellValues().boardCellSeven === "O" &&
      getBoardCellValues().boardCellEight === "O" &&
      getBoardCellValues().boardCellNine === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on left column
      getBoardCellValues().boardCellOne === "O" &&
      getBoardCellValues().boardCellFour === "O" &&
      getBoardCellValues().boardCellSeven === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on middle column
      getBoardCellValues().boardCellTwo === "O" &&
      getBoardCellValues().boardCellFive === "O" &&
      getBoardCellValues().boardCellEight === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on right column
      getBoardCellValues().boardCellThree === "O" &&
      getBoardCellValues().boardCellSix === "O" &&
      getBoardCellValues().boardCellNine === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on ascending diagonal
      getBoardCellValues().boardCellSeven === "O" &&
      getBoardCellValues().boardCellFive === "O" &&
      getBoardCellValues().boardCellThree === "O"
    ) {
      winner = true;
    } else if (
      // Check if Player Two wins on descending diagonal
      getBoardCellValues().boardCellOne === "O" &&
      getBoardCellValues().boardCellFive === "O" &&
      getBoardCellValues().boardCellNine === "O"
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
  return { getBoardCellValues };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Run game
playTurn();
