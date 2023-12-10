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

  return { dropToken, printBoard };
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
    console.log(`Active Player = ${activePlayer.name}`);
  };

  return {
    players,
    playTurn,
    getActivePlayer,
    printBoard: board.printBoard,
  };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get player and computer choices
function GetChoice() {
  // Get random choice from computer
  const getComputerEasyMode = (min = 1, max = 9) => {
    console.log("Getting computer choice");
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
  };

  // Get a somewhat rational choice from computer
  const getComputerMediumMode = () => {};

  // Get rational choice from computer
  const getComputerHardMode = () => {};

  // Get player choice
  const getPlayerChoice = () =>
    new Promise((resolve) => {
      let cellBtns = document.querySelectorAll(".board-cell");
      cellBtns.forEach((i) => {
        i.addEventListener("click", (e) => {
          resolve(e.target);
        });
      });
    });

  async function handlePlayerChoice() {
    const cellBtn1 = document.getElementById("cell-1");
    const cellBtn2 = document.getElementById("cell-2");
    const cellBtn3 = document.getElementById("cell-3");
    const cellBtn4 = document.getElementById("cell-4");
    const cellBtn5 = document.getElementById("cell-5");
    const cellBtn6 = document.getElementById("cell-6");
    const cellBtn7 = document.getElementById("cell-7");
    const cellBtn8 = document.getElementById("cell-8");
    const cellBtn9 = document.getElementById("cell-9");
    let result;

    try {
      const val = await getPlayerChoice();
      if (val === cellBtn1) {
        result = 1;
      } else if (val === cellBtn2) {
        result = 2;
      } else if (val === cellBtn3) {
        result = 3;
      } else if (val === cellBtn4) {
        result = 4;
      } else if (val === cellBtn5) {
        result = 5;
      } else if (val === cellBtn6) {
        result = 6;
      } else if (val === cellBtn7) {
        result = 7;
      } else if (val === cellBtn8) {
        result = 8;
      } else if (val === cellBtn9) {
        result = 9;
      }
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  return {
    getComputerEasyMode,
    getComputerMediumMode,
    getComputerHardMode,
    handlePlayerChoice,
  };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Play a round of the game
function PlayGame() {
  const gameController = GameController();
  const getActivePlayer = () => gameController.getActivePlayer();
  const getPlayers = () => gameController.players;
  const printBoard = () => gameController.printBoard();

  let gameOver = false;

  // Get selections
  const handleChoices = async function getChoices() {
    const getChoice = GetChoice();
    const getComputerEasyMode = () => getChoice.getComputerEasyMode();
    const getComputerMediumMode = () => getChoice.getComputerMediumMode();
    const getComputerHardMode = () => getChoice.getComputerHardMode();
    const handlePlayerChoice = () =>
      new Promise((resolve) => resolve(getChoice.handlePlayerChoice()));
    let cell;

    getActivePlayer().name === "Player One"
      ? (cell = await handlePlayerChoice())
      : (cell = getComputerEasyMode());
    console.log(cell);
    return { cell };
  };

  // Assign row and column values
  const handleAssignments = async function assignRowColumnValues() {
    const getCell = await handleChoices();
    let row;
    let column;
    const cell = getCell.cell;
    console.log(cell);

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
    console.log(row, column);
    return { cell, row, column };
  };

  // Check if cell has already been selected
  const handleCellCheck = async function checkCells() {
    const getCellRowColumn = await handleAssignments();
    const cell = getCellRowColumn.cell;
    const row = getCellRowColumn.row;
    const column = getCellRowColumn.column;

    if (printBoard()[row][column] !== 0) {
      console.log(`Cell ${cell} has already been chosen`);
    } else {
      gameController.playTurn(cell, row, column);
    }
  };

  // Invert players to handle the active player switch when playTurn() is invoked
  const handleInvertedPlayerNames = async function invertPlayerNames() {
    await handleCellCheck();
    let invertedPlayer;

    getActivePlayer().name === "Player One"
      ? (invertedPlayer = getPlayers()[1])
      : (invertedPlayer = getPlayers()[0]);
    console.log(`Inverted Player = ${invertedPlayer.name}`);
    return { invertedPlayer };
  };

  // Check for finished game
  async function checkFinishedGame() {
    const getInvertedPlayer = await handleInvertedPlayerNames();
    const invertedPlayer = getInvertedPlayer.invertedPlayer;

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
      gameOver = true;
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
      gameOver = true;
    }
  }

  async function playTurn() {
    while (gameOver === false) {
      console.log(printBoard());
      console.log(`${getActivePlayer().name}'s turn`);
      await checkFinishedGame();
    }

    console.log(printBoard());
  }

  playTurn();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

PlayGame();
