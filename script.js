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

  return { dropToken, printBoard, getBoard };
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
    getBoard: board.getBoard,
  };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get player and computer choices
function GetChoice() {
  const gameController = () => GameController();
  const getActivePlayer = () => gameController.getActivePlayer();
  const getPlayers = () => gameController.players;
  const printBoard = () => gameController.printBoard();
  const getBoard = () => gameController.getBoard();

  const cellBtn1 = document.getElementById("cell-1");
  const cellBtn2 = document.getElementById("cell-2");
  const cellBtn3 = document.getElementById("cell-3");
  const cellBtn4 = document.getElementById("cell-4");
  const cellBtn5 = document.getElementById("cell-5");
  const cellBtn6 = document.getElementById("cell-6");
  const cellBtn7 = document.getElementById("cell-7");
  const cellBtn8 = document.getElementById("cell-8");
  const cellBtn9 = document.getElementById("cell-9");

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
    let result;

    try {
      const val = await getPlayerChoice();
      if (val === cellBtn1) {
        result = +cellBtn1.value;
      } else if (val === cellBtn2) {
        result = +cellBtn2.value;
      } else if (val === cellBtn3) {
        result = +cellBtn3.value;
      } else if (val === cellBtn4) {
        result = +cellBtn4.value;
      } else if (val === cellBtn5) {
        result = +cellBtn5.value;
      } else if (val === cellBtn6) {
        result = +cellBtn6.value;
      } else if (val === cellBtn7) {
        result = +cellBtn7.value;
      } else if (val === cellBtn8) {
        result = +cellBtn8.value;
      } else if (val === cellBtn9) {
        result = +cellBtn9.value;
      }
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  return {
    gameController,
    getActivePlayer,
    getPlayers,
    printBoard,
    getBoard,
    getComputerEasyMode,
    getComputerMediumMode,
    getComputerHardMode,
    handlePlayerChoice,
    cellBtn1,
    cellBtn2,
    cellBtn3,
    cellBtn4,
    cellBtn5,
    cellBtn6,
    cellBtn7,
    cellBtn8,
    cellBtn9,
  };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Play a round of the game
function PlayGame() {
  const getChoice = GetChoice();
  const gameController = getChoice.gameController();
  const getActivePlayer = () => gameController.getActivePlayer();
  const getPlayers = () => gameController.players;
  const printBoard = () => gameController.printBoard();
  const getBoard = () => gameController.getBoard();

  let gameOver = false;

  // Get selections
  const handleChoices = async function getChoices() {
    const getComputerEasyMode = () => getChoice.getComputerEasyMode();
    const getComputerMediumMode = () => getChoice.getComputerMediumMode();
    const getComputerHardMode = () => getChoice.getComputerHardMode();
    const handlePlayerChoice = () =>
      new Promise((resolve) => resolve(getChoice.handlePlayerChoice()));

    const cellBtn1 = getChoice.cellBtn1;
    const cellBtn2 = getChoice.cellBtn2;
    const cellBtn3 = getChoice.cellBtn3;
    const cellBtn4 = getChoice.cellBtn4;
    const cellBtn5 = getChoice.cellBtn5;
    const cellBtn6 = getChoice.cellBtn6;
    const cellBtn7 = getChoice.cellBtn7;
    const cellBtn8 = getChoice.cellBtn8;
    const cellBtn9 = getChoice.cellBtn9;

    let cell;

    getActivePlayer().name === "Player One"
      ? (cell = await handlePlayerChoice())
      : (cell = getComputerEasyMode());
    console.log(cell);
    return {
      cell,
      cellBtn1,
      cellBtn2,
      cellBtn3,
      cellBtn4,
      cellBtn5,
      cellBtn6,
      cellBtn7,
      cellBtn8,
      cellBtn9,
    };
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
    return {
      cell,
      row,
      column,
      cellBtn1: getCell.cellBtn1,
      cellBtn2: getCell.cellBtn2,
      cellBtn3: getCell.cellBtn3,
      cellBtn4: getCell.cellBtn4,
      cellBtn5: getCell.cellBtn5,
      cellBtn6: getCell.cellBtn6,
      cellBtn7: getCell.cellBtn7,
      cellBtn8: getCell.cellBtn8,
      cellBtn9: getCell.cellBtn9,
    };
  };

  // Check if cell has already been selected
  const handleCellCheck = async function checkCells() {
    const getCellRowColumn = await handleAssignments();
    const cell = getCellRowColumn.cell;
    const row = getCellRowColumn.row;
    const column = getCellRowColumn.column;
    const cellBtn1 = getCellRowColumn.cellBtn1;
    const cellBtn2 = getCellRowColumn.cellBtn2;
    const cellBtn3 = getCellRowColumn.cellBtn3;
    const cellBtn4 = getCellRowColumn.cellBtn4;
    const cellBtn5 = getCellRowColumn.cellBtn5;
    const cellBtn6 = getCellRowColumn.cellBtn6;
    const cellBtn7 = getCellRowColumn.cellBtn7;
    const cellBtn8 = getCellRowColumn.cellBtn8;
    const cellBtn9 = getCellRowColumn.cellBtn9;

    const delayComputerChoice = () =>
      new Promise((resolve) => setTimeout(resolve, 1000));

    if (printBoard()[row][column] !== 0) {
      console.log(`Cell ${cell} has already been chosen`);
    } else {
      if (getActivePlayer().name === "Player Two") {
        await delayComputerChoice();
      }
      if (cell === 1) {
        cellBtn1.textContent = getActivePlayer().token;
      } else if (cell === 2) {
        cellBtn2.textContent = getActivePlayer().token;
      } else if (cell === 3) {
        cellBtn3.textContent = getActivePlayer().token;
      } else if (cell === 4) {
        cellBtn4.textContent = getActivePlayer().token;
      } else if (cell === 5) {
        cellBtn5.textContent = getActivePlayer().token;
      } else if (cell === 6) {
        cellBtn6.textContent = getActivePlayer().token;
      } else if (cell === 7) {
        cellBtn7.textContent = getActivePlayer().token;
      } else if (cell === 8) {
        cellBtn8.textContent = getActivePlayer().token;
      } else if (cell === 9) {
        cellBtn9.textContent = getActivePlayer().token;
      }
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
    let gameResult;

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
      gameOver = true;
      gameResult = `${invertedPlayer.name} wins!`;
      console.log(gameResult);
      return gameResult;
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
      gameOver = true;
      gameResult = "It's a draw!";
      console.log(gameResult);
      return gameResult;
    }
  }

  async function playTurn() {
    const activePlayerOnBoard = document.getElementById("active-player");
    while (gameOver === false) {
      console.log(printBoard());
      activePlayerOnBoard.textContent = `${getActivePlayer().name}'s turn`;
      console.log(activePlayerOnBoard.textContent);
      await checkFinishedGame();
    }

    console.log(printBoard());
  }

  playTurn();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function gameStory() {
  const playGameBtn = document.getElementById("play-game-btn");
  playGameBtn.addEventListener("click", PlayGame);

  const playAgainBtn = document.getElementById("play-again");
  playAgainBtn.addEventListener("click", PlayGame);
}

gameStory();
