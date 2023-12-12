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
  const getBoard = gameController.getBoard();

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
    return {
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

  // Invert players to handle the active player switch when playTurn() is invoked
  async function handleInvertedPlayerNames() {
    const handleCheck = await handleCellCheck();
    let invertedPlayer;

    getActivePlayer().name === "Player One"
      ? (invertedPlayer = getPlayers()[1])
      : (invertedPlayer = getPlayers()[0]);
    console.log(`Inverted Player = ${invertedPlayer.name}`);
    return {
      invertedPlayer,
      cellBtn1: handleCheck.cellBtn1,
      cellBtn2: handleCheck.cellBtn2,
      cellBtn3: handleCheck.cellBtn3,
      cellBtn4: handleCheck.cellBtn4,
      cellBtn5: handleCheck.cellBtn5,
      cellBtn6: handleCheck.cellBtn6,
      cellBtn7: handleCheck.cellBtn7,
      cellBtn8: handleCheck.cellBtn8,
      cellBtn9: handleCheck.cellBtn9,
    };
  }

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
      if (invertedPlayer.name === "Player One") {
        gameResult = "Human";
      } else {
        gameResult = "Computer";
      }
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
      gameResult = "Draw";
    }

    return {
      gameResult,
      cellBtn1: getInvertedPlayer.cellBtn1,
      cellBtn2: getInvertedPlayer.cellBtn2,
      cellBtn3: getInvertedPlayer.cellBtn3,
      cellBtn4: getInvertedPlayer.cellBtn4,
      cellBtn5: getInvertedPlayer.cellBtn5,
      cellBtn6: getInvertedPlayer.cellBtn6,
      cellBtn7: getInvertedPlayer.cellBtn7,
      cellBtn8: getInvertedPlayer.cellBtn8,
      cellBtn9: getInvertedPlayer.cellBtn9,
    };
  }

  async function PlayTurn() {
    const activePlayerOnBoard = document.getElementById("active-player");
    let finalResult;
    let cellBtn1;
    let cellBtn2;
    let cellBtn3;
    let cellBtn4;
    let cellBtn5;
    let cellBtn6;
    let cellBtn7;
    let cellBtn8;
    let cellBtn9;

    while (gameOver === false) {
      console.log(printBoard());
      activePlayerOnBoard.textContent = `${getActivePlayer().name}'s turn`;
      console.log(activePlayerOnBoard.textContent);
      const awaitCheckFinishedGame = await checkFinishedGame();

      if (
        awaitCheckFinishedGame.gameResult === "Human" ||
        awaitCheckFinishedGame.gameResult === "Computer" ||
        awaitCheckFinishedGame.gameResult === "Draw"
      ) {
        finalResult = awaitCheckFinishedGame.gameResult;
        cellBtn1 = awaitCheckFinishedGame.cellBtn1;
        cellBtn2 = awaitCheckFinishedGame.cellBtn2;
        cellBtn3 = awaitCheckFinishedGame.cellBtn3;
        cellBtn4 = awaitCheckFinishedGame.cellBtn4;
        cellBtn5 = awaitCheckFinishedGame.cellBtn5;
        cellBtn6 = awaitCheckFinishedGame.cellBtn6;
        cellBtn7 = awaitCheckFinishedGame.cellBtn7;
        cellBtn8 = awaitCheckFinishedGame.cellBtn8;
        cellBtn9 = awaitCheckFinishedGame.cellBtn9;
      }
    }

    console.log(printBoard());
    return {
      finalResult,
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

  async function GetFinalResult() {
    const playingTurn = await PlayTurn();
    const playingTurnResult = playingTurn.finalResult;
    return {
      playingTurnResult,
      cellBtn1: playingTurn.cellBtn1,
      cellBtn2: playingTurn.cellBtn2,
      cellBtn3: playingTurn.cellBtn3,
      cellBtn4: playingTurn.cellBtn4,
      cellBtn5: playingTurn.cellBtn5,
      cellBtn6: playingTurn.cellBtn6,
      cellBtn7: playingTurn.cellBtn7,
      cellBtn8: playingTurn.cellBtn8,
      cellBtn9: playingTurn.cellBtn9,
    };
  }

  return { getBoard, GetFinalResult };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function gameStory() {
  const startGame = document.getElementById("start-game");
  const startGameBtn = document.getElementById("start-game-btn");
  const mainSection = document.getElementById("main-section");
  const introSectionIntro1 = document.getElementById("intro-section-intro-1");
  const introSectionIntro2 = document.getElementById("intro-section-intro-2");
  const introSectionIntro3 = document.getElementById("intro-section-intro-3");
  const introSectionIntro4 = document.getElementById("intro-section-intro-4");
  const introSectionIntro5 = document.getElementById("intro-section-intro-5");
  const introSectionIntro6 = document.getElementById("intro-section-intro-6");
  const introSectionIntro7 = document.getElementById("intro-section-intro-7");
  const introSectionIntro8 = document.getElementById("intro-section-intro-8");
  const introSectionIntro9 = document.getElementById("intro-section-intro-9");
  const playGameBtn = document.getElementById("play-game-btn");
  const playGame = () => PlayGame();

  const hideAllIntro = () => {
    introSectionIntro1.classList.add("intro-section-intro-1-hidden");
    introSectionIntro2.classList.add("intro-section-intro-2-hidden");
    introSectionIntro3.classList.add("intro-section-intro-3-hidden");
    introSectionIntro4.classList.add("intro-section-intro-4-hidden");
    introSectionIntro5.classList.add("intro-section-intro-5-hidden");
    introSectionIntro6.classList.add("intro-section-intro-6-hidden");
    introSectionIntro7.classList.add("intro-section-intro-7-hidden");
    introSectionIntro8.classList.add("intro-section-intro-8-hidden");
    introSectionIntro9.classList.add("intro-section-intro-9-hidden");
    playGameBtn.classList.add("play-game-btn-hidden");
  };

  const delayIntroItems = () =>
    new Promise((resolve) => setTimeout(resolve, 3000));

  async function showIntro() {
    introSectionIntro1.classList.remove("intro-section-intro-1-hidden");
    await delayIntroItems();
    introSectionIntro1.classList.add("intro-section-intro-1-hidden");
    introSectionIntro2.classList.remove("intro-section-intro-2-hidden");
    await delayIntroItems();
    introSectionIntro2.classList.add("intro-section-intro-2-hidden");
    introSectionIntro3.classList.remove("intro-section-intro-3-hidden");
    await delayIntroItems();
    introSectionIntro3.classList.add("intro-section-intro-3-hidden");
    introSectionIntro4.classList.remove("intro-section-intro-4-hidden");
    await delayIntroItems();
    introSectionIntro4.classList.add("intro-section-intro-4-hidden");
    introSectionIntro5.classList.remove("intro-section-intro-5-hidden");
    await delayIntroItems();
    introSectionIntro5.classList.add("intro-section-intro-5-hidden");
    introSectionIntro6.classList.remove("intro-section-intro-6-hidden");
    await delayIntroItems();
    introSectionIntro6.classList.add("intro-section-intro-6-hidden");
    playGameBtn.classList.remove("play-game-btn-hidden");
  }

  const showResultHuman = () => {
    introSectionIntro7.classList.remove("intro-section-intro-7-hidden");
    playGameBtn.classList.remove("play-game-btn-hidden");
  };
  const showResultComputer = () => {
    introSectionIntro8.classList.remove("intro-section-intro-8-hidden");
    playGameBtn.classList.remove("play-game-btn-hidden");
  };

  const showResultDraw = () => {
    introSectionIntro9.classList.remove("intro-section-intro-9-hidden");
    playGameBtn.classList.remove("play-game-btn-hidden");
  };

  const run = () => {
    showIntro();
    playGameBtn.addEventListener("click", async function () {
      hideAllIntro();
      mainSection.classList.remove("hide-main-section");

      const finalResult = await playGame().GetFinalResult();

      if (finalResult.playingTurnResult === "Human") {
        console.log(finalResult.playingTurnResult);
        mainSection.classList.add("hide-main-section");
        showResultHuman();
      } else if (finalResult.playingTurnResult === "Computer") {
        console.log(finalResult.playingTurnResult);
        mainSection.classList.add("hide-main-section");
        showResultComputer();
      } else if (finalResult.playingTurnResult === "Draw") {
        console.log(finalResult.playingTurnResult);
        mainSection.classList.add("hide-main-section");
        showResultDraw();
      }
      finalResult.cellBtn1.textContent = "";
      finalResult.cellBtn2.textContent = "";
      finalResult.cellBtn3.textContent = "";
      finalResult.cellBtn4.textContent = "";
      finalResult.cellBtn5.textContent = "";
      finalResult.cellBtn6.textContent = "";
      finalResult.cellBtn7.textContent = "";
      finalResult.cellBtn8.textContent = "";
      finalResult.cellBtn9.textContent = "";
    });
  };

  startGameBtn.addEventListener("click", () => {
    startGame.classList.add("hide-start-game");
    run();
  });
}

gameStory();
