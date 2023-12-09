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
    board[row][column].addToken(player);
  };

  // Print board to screen
  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    return boardWithCellValues;
  };

  return { getBoard, dropToken, printBoard };
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
  const playTurn = (cell, row, column) => {
    console.log(
      `Placing ${activePlayer.name}'s ${activePlayer.token} in cell ${cell}`
    );
    board.dropToken(row, column, activePlayer.token);
    switchPlayerTurn();
  };

  return {
    players,
    playTurn,
    getActivePlayer,
    getBoard: board.getBoard,
    printBoard: board.printBoard,
  };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get player and computer choices
function GetChoice() {
  // Get random choice from computer
  const getComputerEasyMode = (min = 1, max = 9) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
  };

  // Get a somewhat rational choice from computer
  const getComputerMediumMode = () => {};

  // Get rational choice from computer
  const getComputerHardMode = () => {};

  // Define variables for cells
  let cellBtns = document.querySelectorAll(".board-cell");
  const cellBtn1 = document.getElementById("cell-1");
  const cellBtn2 = document.getElementById("cell-2");
  const cellBtn3 = document.getElementById("cell-3");
  const cellBtn4 = document.getElementById("cell-4");
  const cellBtn5 = document.getElementById("cell-5");
  const cellBtn6 = document.getElementById("cell-6");
  const cellBtn7 = document.getElementById("cell-7");
  const cellBtn8 = document.getElementById("cell-8");
  const cellBtn9 = document.getElementById("cell-9");

  // Get player choice
  const getPlayerChoice = () => {
    for (let i = 0; i < cellBtns.length; i++) {
      cellBtns[i].addEventListener("click", (e) => {
        if (e.target === cellBtn1) {
          console.log(cellBtn1);
        } else if (e.target === cellBtn2) {
          console.log(cellBtn2);
        } else if (e.target === cellBtn3) {
          console.log(cellBtn3);
        } else if (e.target === cellBtn4) {
          console.log(cellBtn4);
        } else if (e.target === cellBtn5) {
          console.log(cellBtn5);
        } else if (e.target === cellBtn6) {
          console.log(cellBtn6);
        } else if (e.target === cellBtn7) {
          console.log(cellBtn7);
        } else if (e.target === cellBtn8) {
          console.log(cellBtn8);
        } else if (e.target === cellBtn9) {
          console.log(cellBtn9);
        }
      });
    }
    const result = +prompt("Select a number between 1 and 9");
    return result;
  };

  return {
    getComputerEasyMode,
    getComputerMediumMode,
    getComputerHardMode,
    getPlayerChoice,
  };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Play a round of the game
function PlayTurn() {
  const gameController = GameController();
  const getActivePlayer = () => gameController.getActivePlayer();
  const getPlayers = () => gameController.players;
  const printBoard = () => gameController.printBoard();

  const getChoice = GetChoice();
  const getComputerEasyMode = () => getChoice.getComputerEasyMode();
  const getComputerMediumMode = () => getChoice.getComputerMediumMode();
  const getComputerHardMode = () => getChoice.getComputerHardMode();
  const getPlayerChoice = () => getChoice.getPlayerChoice();

  let row;
  let column;
  let cell;

  // Loop through each turn
  for (let i = 0; i < 9; i++) {
    console.log(`Turn number: ${i + 1}`);
    console.log(printBoard());
    console.log(getActivePlayer().name);

    // Get selections
    getActivePlayer().name === "Player One"
      ? (cell = getPlayerChoice())
      : (cell = getComputerEasyMode());

    // Assign row and column values
    if (cell === 1) {
      row = 0;
      column = 0;
    } else if (cell === 2) {
      row = 0;
      column = 1;
    } else if (cell === 3) {
      row = 0;
      column = 2;
    } else if (cell === 4) {
      row = 1;
      column = 0;
    } else if (cell === 5) {
      row = 1;
      column = 1;
    } else if (cell === 6) {
      row = 1;
      column = 2;
    } else if (cell === 7) {
      row = 2;
      column = 0;
    } else if (cell === 8) {
      row = 2;
      column = 1;
    } else if (cell === 9) {
      row = 2;
      column = 2;
    }

    // Check if cell has already been selected
    if (printBoard()[row][column] !== 0) {
      console.log(`Cell ${cell} has already been chosen`);
      i--;
    } else {
      gameController.playTurn(cell, row, column);
    }

    // Invert players to handle the active player switch when playTurn() is invoked
    let invertedPlayer;
    getActivePlayer().name === "Player One"
      ? (invertedPlayer = getPlayers()[1])
      : (invertedPlayer = getPlayers()[0]);

    // Check for finished game
    if (
      (printBoard()[0][0] === invertedPlayer.token &&
        printBoard()[0][1] === invertedPlayer.token &&
        printBoard()[0][2] === invertedPlayer.token) ||
      (printBoard()[1][0] === invertedPlayer.token &&
        printBoard()[1][1] === invertedPlayer.token &&
        printBoard()[1][2] === invertedPlayer.token) ||
      (printBoard()[2][0] === invertedPlayer.token &&
        printBoard()[2][1] === invertedPlayer.token &&
        printBoard()[2][2] === invertedPlayer.token) ||
      (printBoard()[0][0] === invertedPlayer.token &&
        printBoard()[1][0] === invertedPlayer.token &&
        printBoard()[2][0] === invertedPlayer.token) ||
      (printBoard()[0][1] === invertedPlayer.token &&
        printBoard()[1][1] === invertedPlayer.token &&
        printBoard()[2][1] === invertedPlayer.token) ||
      (printBoard()[0][2] === invertedPlayer.token &&
        printBoard()[1][2] === invertedPlayer.token &&
        printBoard()[2][2] === invertedPlayer.token) ||
      (printBoard()[0][0] === invertedPlayer.token &&
        printBoard()[1][1] === invertedPlayer.token &&
        printBoard()[2][2] === invertedPlayer.token) ||
      (printBoard()[0][2] === invertedPlayer.token &&
        printBoard()[1][1] === invertedPlayer.token &&
        printBoard()[2][0] === invertedPlayer.token)
    ) {
      console.log(`${invertedPlayer.name} wins!`);
      i = 9;
    } else if (
      printBoard()[0][0] !== 0 &&
      printBoard()[0][1] !== 0 &&
      printBoard()[0][2] !== 0 &&
      printBoard()[1][0] !== 0 &&
      printBoard()[1][1] !== 0 &&
      printBoard()[1][2] !== 0 &&
      printBoard()[2][0] !== 0 &&
      printBoard()[2][1] !== 0 &&
      printBoard()[2][2] !== 0 &&
      printBoard()[0][0] !== 0 &&
      printBoard()[1][0] !== 0 &&
      printBoard()[2][0] !== 0 &&
      printBoard()[0][1] !== 0 &&
      printBoard()[1][1] !== 0 &&
      printBoard()[2][1] !== 0 &&
      printBoard()[0][2] !== 0 &&
      printBoard()[1][2] !== 0 &&
      printBoard()[2][2] !== 0 &&
      printBoard()[0][0] !== 0 &&
      printBoard()[1][1] !== 0 &&
      printBoard()[2][2] !== 0 &&
      printBoard()[0][2] !== 0 &&
      printBoard()[1][1] !== 0 &&
      printBoard()[2][0] !== 0
    ) {
      console.log("It's a draw!");
    }
  }
  console.log(printBoard());
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// PlayTurn();
