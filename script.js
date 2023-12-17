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
function GameController(playerOneName = "Human", playerTwoName = "Machine") {
  const board = GameBoard();

  // Create initial players
  const players = [
    {
      name: playerOneName,
      token: "X",
      backgroundColor: "#39ff14",
      color: "#212529",
    },
    {
      name: playerTwoName,
      token: "O",
      backgroundColor: "#4700b3",
      color: "#e9ecef",
    },
  ];

  // Get active player and switch players after each turn
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  // Play a round
  const playTurn = (row, column) => {
    board.dropToken(row, column, activePlayer.token, activePlayer.color);
    switchPlayerTurn();
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
  const gameController = GameController();
  const getActivePlayer = () => gameController.getActivePlayer();
  const getPlayers = () => gameController.players;
  const printBoard = () => gameController.printBoard();

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
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
  };

  // Get rational choice from computer
  const getComputerHardMode = () => {
    let result;

    // ROWS
    // Get row token count for player one
    const checkForPlayerOneRowTokens = printBoard().map((row) =>
      row.filter((cell) => cell === getPlayers()[0].token)
    );

    // Get row token count for player two
    const checkForPlayerTwoRowTokens = printBoard().map((row) =>
      row.filter((cell) => cell === getPlayers()[1].token)
    );

    // COLUMNS
    // Get each column
    const checkForColumnOne = printBoard().map((row) => row[0]);
    const checkForColumnTwo = printBoard().map((row) => row[1]);
    const checkForColumnThree = printBoard().map((row) => row[2]);

    //Player One Checks
    const playerOneColumnOne = checkForColumnOne.filter(
      (cell) => cell === getPlayers()[0].token
    );

    const playerOneColumnTwo = checkForColumnTwo.filter(
      (cell) => cell === getPlayers()[0].token
    );

    const playerOneColumnThree = checkForColumnThree.filter(
      (cell) => cell === getPlayers()[0].token
    );

    // Player Two Checks
    const playerTwoColumnOne = checkForColumnOne.filter(
      (cell) => cell === getPlayers()[1].token
    );

    const playerTwoColumnTwo = checkForColumnTwo.filter(
      (cell) => cell === getPlayers()[1].token
    );

    const playerTwoColumnThree = checkForColumnThree.filter(
      (cell) => cell === getPlayers()[1].token
    );

    //DIAGONALS
    //closing diagonals
    const checkPlayerOneClosingDiagonal = printBoard()
      .map((row, column) => row[column] === getPlayers()[0].token)
      .filter((i) => i === true);

    const checkPlayerTwoClosingDiagonal = printBoard()
      .map((row, column) => row[column] === getPlayers()[1].token)
      .filter((i) => i === true);

    //opening diagonals
    const checkPlayerOneOpeningDiagonal = printBoard()
      .reverse()
      .map((row, column) => row[column])
      .filter((i) => i === getPlayers()[0].token);

    const checkPlayerTwoOpeningDiagonal = printBoard()
      .reverse()
      .map((row, column) => row[column])
      .filter((i) => i === getPlayers()[1].token);

    //RUN EVERYTHING
    //Run the stuff
    if (
      checkForPlayerTwoRowTokens[0].length === 2 &&
      checkForPlayerOneRowTokens[0].length === 0
    ) {
      const resultRowOne = printBoard()[0];
      resultRowOne.forEach((i) => {
        if (i === 0) {
          if (resultRowOne.indexOf(i) === 0) {
            result = 1;
          } else if (resultRowOne.indexOf(i) === 1) {
            result = 2;
          } else if (resultRowOne.indexOf(i) === 2) {
            result = 3;
          }
        }
      });
    } else if (
      checkForPlayerTwoRowTokens[1].length === 2 &&
      checkForPlayerOneRowTokens[1].length === 0
    ) {
      const resultRowTwo = printBoard()[1];
      resultRowTwo.forEach((i) => {
        if (i === 0) {
          if (resultRowTwo.indexOf(i) === 0) {
            result = 4;
          } else if (resultRowTwo.indexOf(i) === 1) {
            result = 5;
          } else if (resultRowTwo.indexOf(i) === 2) {
            result = 6;
          }
        }
      });
    } else if (
      checkForPlayerTwoRowTokens[2].length === 2 &&
      checkForPlayerOneRowTokens[2].length === 0
    ) {
      const resultRowThree = printBoard()[2];
      resultRowThree.forEach((i) => {
        if (i === 0) {
          if (resultRowThree.indexOf(i) === 0) {
            result = 7;
          } else if (resultRowThree.indexOf(i) === 1) {
            result = 8;
          } else if (resultRowThree.indexOf(i) === 2) {
            result = 9;
          }
        }
      });
    } else if (
      playerTwoColumnOne.length === 2 &&
      playerOneColumnOne.length === 0
    ) {
      const columnOneResult = checkForColumnOne.map((cell) => cell === 0);
      columnOneResult.forEach((i) => {
        if (i === true) {
          if (columnOneResult.indexOf(i) === 0) {
            result = 1;
          } else if (columnOneResult.indexOf(i) === 1) {
            result = 4;
          } else if (columnOneResult.indexOf(i) === 2) {
            result = 7;
          }
        }
      });
    } else if (
      playerTwoColumnTwo.length === 2 &&
      playerOneColumnTwo.length === 0
    ) {
      const columnTwoResult = checkForColumnTwo.map((cell) => cell === 0);
      columnTwoResult.forEach((i) => {
        if (i === true) {
          if (columnTwoResult.indexOf(i) === 0) {
            result = 2;
          } else if (columnTwoResult.indexOf(i) === 1) {
            result = 5;
          } else if (columnTwoResult.indexOf(i) === 2) {
            result = 8;
          }
        }
      });
    } else if (
      playerTwoColumnThree.length === 2 &&
      playerOneColumnThree.length === 0
    ) {
      const columnThreeResult = checkForColumnThree.map((cell) => cell === 0);
      columnThreeResult.forEach((i) => {
        if (i === true) {
          if (columnThreeResult.indexOf(i) === 0) {
            result = 3;
          } else if (columnThreeResult.indexOf(i) === 1) {
            result = 6;
          } else if (columnThreeResult.indexOf(i) === 2) {
            result = 9;
          }
        }
      });
    } else if (
      checkPlayerTwoClosingDiagonal.length === 2 &&
      checkPlayerOneClosingDiagonal.length === 0
    ) {
      const getClosingDiagonal = printBoard().map((row, column) => row[column]);
      getClosingDiagonal.forEach((i) => {
        if (i === 0) {
          if (getClosingDiagonal.indexOf(i) === 0) {
            result = 1;
          } else if (getClosingDiagonal.indexOf(i) === 1) {
            result = 5;
          } else if (getClosingDiagonal.indexOf(i) === 2) {
            result = 9;
          }
        }
      });
    } else if (
      checkPlayerTwoOpeningDiagonal.length === 2 &&
      checkPlayerOneOpeningDiagonal.length === 0
    ) {
      const getOpeningDiagonal = printBoard()
        .reverse()
        .map((row, column) => row[column]);
      getOpeningDiagonal.forEach((i) => {
        if (i === 0) {
          if (getOpeningDiagonal.indexOf(i) === 0) {
            result = 7;
          } else if (getOpeningDiagonal.indexOf(i) === 1) {
            result = 5;
          } else if (getOpeningDiagonal.indexOf(i) === 2) {
            result = 3;
          }
        }
      });
    } else if (
      checkForPlayerTwoRowTokens[0].length === 0 &&
      checkForPlayerOneRowTokens[0].length === 2
    ) {
      const resultRowOne = printBoard()[0];
      resultRowOne.forEach((i) => {
        if (i === 0) {
          if (resultRowOne.indexOf(i) === 0) {
            result = 1;
          } else if (resultRowOne.indexOf(i) === 1) {
            result = 2;
          } else if (resultRowOne.indexOf(i) === 2) {
            result = 3;
          }
        }
      });
    } else if (
      checkForPlayerTwoRowTokens[1].length === 0 &&
      checkForPlayerOneRowTokens[1].length === 2
    ) {
      const resultRowTwo = printBoard()[1];
      resultRowTwo.forEach((i) => {
        if (i === 0) {
          if (resultRowTwo.indexOf(i) === 0) {
            result = 4;
          } else if (resultRowTwo.indexOf(i) === 1) {
            result = 5;
          } else if (resultRowTwo.indexOf(i) === 2) {
            result = 6;
          }
        }
      });
    } else if (
      checkForPlayerTwoRowTokens[2].length === 0 &&
      checkForPlayerOneRowTokens[2].length === 2
    ) {
      const resultRowThree = printBoard()[2];
      resultRowThree.forEach((i) => {
        if (i === 0) {
          if (resultRowThree.indexOf(i) === 0) {
            result = 7;
          } else if (resultRowThree.indexOf(i) === 1) {
            result = 8;
          } else if (resultRowThree.indexOf(i) === 2) {
            result = 9;
          }
        }
      });
    } else if (
      playerTwoColumnOne.length === 0 &&
      playerOneColumnOne.length === 2
    ) {
      const columnOneResult = checkForColumnOne.map((cell) => cell === 0);
      columnOneResult.forEach((i) => {
        if (i === true) {
          if (columnOneResult.indexOf(i) === 0) {
            result = 1;
          } else if (columnOneResult.indexOf(i) === 1) {
            result = 4;
          } else if (columnOneResult.indexOf(i) === 2) {
            result = 7;
          }
        }
      });
    } else if (
      playerTwoColumnTwo.length === 0 &&
      playerOneColumnTwo.length === 2
    ) {
      const columnTwoResult = checkForColumnTwo.map((cell) => cell === 0);
      columnTwoResult.forEach((i) => {
        if (i === true) {
          if (columnTwoResult.indexOf(i) === 0) {
            result = 2;
          } else if (columnTwoResult.indexOf(i) === 1) {
            result = 5;
          } else if (columnTwoResult.indexOf(i) === 2) {
            result = 8;
          }
        }
      });
    } else if (
      playerTwoColumnThree.length === 0 &&
      playerOneColumnThree.length === 2
    ) {
      const columnThreeResult = checkForColumnThree.map((cell) => cell === 0);
      columnThreeResult.forEach((i) => {
        if (i === true) {
          if (columnThreeResult.indexOf(i) === 0) {
            result = 3;
          } else if (columnThreeResult.indexOf(i) === 1) {
            result = 6;
          } else if (columnThreeResult.indexOf(i) === 2) {
            result = 9;
          }
        }
      });
    } else if (
      checkPlayerTwoClosingDiagonal.length === 0 &&
      checkPlayerOneClosingDiagonal.length === 2
    ) {
      const getClosingDiagonal = printBoard().map((row, column) => row[column]);
      getClosingDiagonal.forEach((i) => {
        if (i === 0) {
          if (getClosingDiagonal.indexOf(i) === 0) {
            result = 1;
          } else if (getClosingDiagonal.indexOf(i) === 1) {
            result = 5;
          } else if (getClosingDiagonal.indexOf(i) === 2) {
            result = 9;
          }
        }
      });
    } else if (
      checkPlayerTwoOpeningDiagonal.length === 0 &&
      checkPlayerOneOpeningDiagonal.length === 2
    ) {
      const getOpeningDiagonal = printBoard()
        .reverse()
        .map((row, column) => row[column]);
      getOpeningDiagonal.forEach((i) => {
        if (i === 0) {
          if (getOpeningDiagonal.indexOf(i) === 0) {
            result = 7;
          } else if (getOpeningDiagonal.indexOf(i) === 1) {
            result = 5;
          } else if (getOpeningDiagonal.indexOf(i) === 2) {
            result = 3;
          }
        }
      });
    } else if (
      checkForPlayerTwoRowTokens[0].length === 1 &&
      checkForPlayerOneRowTokens[0].length === 0
    ) {
      const resultRowOne = printBoard()[0];
      resultRowOne.forEach((i) => {
        if (i === 0) {
          if (resultRowOne.indexOf(i) === 0) {
            result = 1;
          } else if (resultRowOne.indexOf(i) === 1) {
            result = 2;
          } else if (resultRowOne.indexOf(i) === 2) {
            result = 3;
          }
        }
      });
    } else if (
      checkForPlayerTwoRowTokens[1].length === 1 &&
      checkForPlayerOneRowTokens[1].length === 0
    ) {
      const resultRowTwo = printBoard()[1];
      resultRowTwo.forEach((i) => {
        if (i === 0) {
          if (resultRowTwo.indexOf(i) === 0) {
            result = 4;
          } else if (resultRowTwo.indexOf(i) === 1) {
            result = 5;
          } else if (resultRowTwo.indexOf(i) === 2) {
            result = 6;
          }
        }
      });
    } else if (
      checkForPlayerTwoRowTokens[2].length === 1 &&
      checkForPlayerOneRowTokens[2].length === 0
    ) {
      const resultRowThree = printBoard()[2];
      resultRowThree.forEach((i) => {
        if (i === 0) {
          if (resultRowThree.indexOf(i) === 0) {
            result = 7;
          } else if (resultRowThree.indexOf(i) === 1) {
            result = 8;
          } else if (resultRowThree.indexOf(i) === 2) {
            result = 9;
          }
        }
      });
    } else if (
      playerTwoColumnOne.length === 1 &&
      playerOneColumnOne.length === 0
    ) {
      const columnOneResult = checkForColumnOne.map((cell) => cell === 0);
      columnOneResult.forEach((i) => {
        if (i === true) {
          if (columnOneResult.indexOf(i) === 0) {
            result = 1;
          } else if (columnOneResult.indexOf(i) === 1) {
            result = 4;
          } else if (columnOneResult.indexOf(i) === 2) {
            result = 7;
          }
        }
      });
    } else if (
      playerTwoColumnTwo.length === 1 &&
      playerOneColumnTwo.length === 0
    ) {
      const columnTwoResult = checkForColumnTwo.map((cell) => cell === 0);
      columnTwoResult.forEach((i) => {
        if (i === true) {
          if (columnTwoResult.indexOf(i) === 0) {
            result = 2;
          } else if (columnTwoResult.indexOf(i) === 1) {
            result = 5;
          } else if (columnTwoResult.indexOf(i) === 2) {
            result = 8;
          }
        }
      });
    } else if (
      playerTwoColumnThree.length === 1 &&
      playerOneColumnThree.length === 0
    ) {
      const columnThreeResult = checkForColumnThree.map((cell) => cell === 0);
      columnThreeResult.forEach((i) => {
        if (i === true) {
          if (columnThreeResult.indexOf(i) === 0) {
            result = 3;
          } else if (columnThreeResult.indexOf(i) === 1) {
            result = 6;
          } else if (columnThreeResult.indexOf(i) === 2) {
            result = 9;
          }
        }
      });
    } else if (
      checkPlayerTwoClosingDiagonal.length === 1 &&
      checkPlayerOneClosingDiagonal.length === 0
    ) {
      const getClosingDiagonal = printBoard().map((row, column) => row[column]);
      getClosingDiagonal.forEach((i) => {
        if (i === 0) {
          if (getClosingDiagonal.indexOf(i) === 0) {
            result = 1;
          } else if (getClosingDiagonal.indexOf(i) === 1) {
            result = 5;
          } else if (getClosingDiagonal.indexOf(i) === 2) {
            result = 9;
          }
        }
      });
    } else if (
      checkPlayerTwoOpeningDiagonal.length === 1 &&
      checkPlayerOneOpeningDiagonal.length === 0
    ) {
      const getOpeningDiagonal = printBoard()
        .reverse()
        .map((row, column) => row[column]);
      getOpeningDiagonal.forEach((i) => {
        if (i === 0) {
          if (getOpeningDiagonal.indexOf(i) === 0) {
            result = 7;
          } else if (getOpeningDiagonal.indexOf(i) === 1) {
            result = 5;
          } else if (getOpeningDiagonal.indexOf(i) === 2) {
            result = 3;
          }
        }
      });
    } else {
      result = getComputerEasyMode();
    }
    return result;
  };

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
    getComputerEasyMode,
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
  const gameController = getChoice.gameController;
  const getActivePlayer = () => gameController.getActivePlayer();
  const getPlayers = () => gameController.players;
  const printBoard = () => gameController.printBoard();

  let gameOver = false;

  // Get selections
  const handleChoices = async function getChoices(chosenMode) {
    const getComputerEasyMode = () => getChoice.getComputerEasyMode();
    const getComputerHardMode = () => getChoice.getComputerHardMode();

    let computerMode;
    if (chosenMode === "easy") {
      computerMode = () => getComputerEasyMode();
    } else {
      computerMode = () => getComputerHardMode();
    }

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

    getActivePlayer().name === "Human"
      ? (cell = await handlePlayerChoice())
      : (cell = computerMode());
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
  const handleAssignments = async function assignRowColumnValues(chosenMode) {
    const getCell = await handleChoices(chosenMode);
    let row;
    let column;
    const cell = getCell.cell;

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
  const handleCellCheck = async function checkCells(chosenMode) {
    const getCellRowColumn = await handleAssignments(chosenMode);
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
    } else {
      if (getActivePlayer().name === "Machine") {
        await delayComputerChoice();
      }
      if (cell === 1) {
        cellBtn1.textContent = getActivePlayer().token;
        cellBtn1.setAttribute(
          "style",
          `background-color: ${getActivePlayer().backgroundColor}; color: ${
            getActivePlayer().color
          }`
        );
      } else if (cell === 2) {
        cellBtn2.textContent = getActivePlayer().token;
        cellBtn2.setAttribute(
          "style",
          `background-color: ${getActivePlayer().backgroundColor}; color: ${
            getActivePlayer().color
          }`
        );
      } else if (cell === 3) {
        cellBtn3.textContent = getActivePlayer().token;
        cellBtn3.setAttribute(
          "style",
          `background-color: ${getActivePlayer().backgroundColor}; color: ${
            getActivePlayer().color
          }`
        );
      } else if (cell === 4) {
        cellBtn4.textContent = getActivePlayer().token;
        cellBtn4.setAttribute(
          "style",
          `background-color: ${getActivePlayer().backgroundColor}; color: ${
            getActivePlayer().color
          }`
        );
      } else if (cell === 5) {
        cellBtn5.textContent = getActivePlayer().token;
        cellBtn5.setAttribute(
          "style",
          `background-color: ${getActivePlayer().backgroundColor}; color: ${
            getActivePlayer().color
          }`
        );
      } else if (cell === 6) {
        cellBtn6.textContent = getActivePlayer().token;
        cellBtn6.setAttribute(
          "style",
          `background-color: ${getActivePlayer().backgroundColor}; color: ${
            getActivePlayer().color
          }`
        );
      } else if (cell === 7) {
        cellBtn7.textContent = getActivePlayer().token;
        cellBtn7.setAttribute(
          "style",
          `background-color: ${getActivePlayer().backgroundColor}; color: ${
            getActivePlayer().color
          }`
        );
      } else if (cell === 8) {
        cellBtn8.textContent = getActivePlayer().token;
        cellBtn8.setAttribute(
          "style",
          `background-color: ${getActivePlayer().backgroundColor}; color: ${
            getActivePlayer().color
          }`
        );
      } else if (cell === 9) {
        cellBtn9.textContent = getActivePlayer().token;
        cellBtn9.setAttribute(
          "style",
          `background-color: ${getActivePlayer().backgroundColor}; color: ${
            getActivePlayer().color
          }`
        );
      }
      gameController.playTurn(row, column);
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
  async function handleInvertedPlayerNames(chosenMode) {
    const handleCheck = await handleCellCheck(chosenMode);
    let invertedPlayer;

    getActivePlayer().name === "Human"
      ? (invertedPlayer = getPlayers()[1])
      : (invertedPlayer = getPlayers()[0]);
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
  async function checkFinishedGame(chosenMode) {
    const getInvertedPlayer = await handleInvertedPlayerNames(chosenMode);
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
      if (invertedPlayer.name === "Human") {
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

  async function PlayTurn(chosenMode) {
    const activePlayerOnBoard = document.getElementById("active-player");
    const mainBorderColor = document.getElementById("main");
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
      activePlayerOnBoard.textContent = `${getActivePlayer().name}'s turn`;
      activePlayerOnBoard.setAttribute(
        "style",
        `color: ${getActivePlayer().backgroundColor}`
      );
      mainBorderColor.setAttribute(
        "style",
        `border-color: ${getActivePlayer().backgroundColor}`
      );

      const awaitCheckFinishedGame = await checkFinishedGame(chosenMode);

      if (
        awaitCheckFinishedGame.gameResult === "Human" ||
        awaitCheckFinishedGame.gameResult === "Computer" ||
        awaitCheckFinishedGame.gameResult === "Draw"
      ) {
        mainBorderColor.removeAttribute("style", "border-color");
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

  async function GetFinalResult(chosenMode) {
    const playingTurn = await PlayTurn(chosenMode);
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

  return { GetFinalResult };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function gameStory() {
  const startGame = document.getElementById("start-game");
  const startGameBtn = document.getElementById("start-game-btn");
  const mainSection = document.getElementById("main-section");
  const introSection = document.getElementById("intro-section");
  const introSectionIntro1 = document.getElementById("intro-section-intro-1");
  const introSectionIntro2 = document.getElementById("intro-section-intro-2");
  const introSectionIntro3 = document.getElementById("intro-section-intro-3");
  const introSectionIntro4 = document.getElementById("intro-section-intro-4");
  const introSectionIntro5 = document.getElementById("intro-section-intro-5");
  const introSectionIntro6 = document.getElementById("intro-section-intro-6");
  const introSectionIntro7 = document.getElementById("intro-section-intro-7");
  const introSectionIntro8 = document.getElementById("intro-section-intro-8");
  const introSectionIntro9 = document.getElementById("intro-section-intro-9");
  let pressStartBtn = document.querySelectorAll(".press-start-btn");
  const playGameEasyModeBtn = document.getElementById(
    "play-game-easy-mode-btn"
  );
  const playGameHardModeBtn = document.getElementById(
    "play-game-hard-mode-btn"
  );

  const asciiSection = document.getElementById("ascii-section");
  const ascii1 = document.getElementById("ascii-1");
  const ascii2 = document.getElementById("ascii-2");
  const ascii3 = document.getElementById("ascii-3");
  const ascii4 = document.getElementById("ascii-4");
  const ascii5 = document.getElementById("ascii-5");
  const ascii6 = document.getElementById("ascii-6");
  const ascii7 = document.getElementById("ascii-7");
  const ascii8 = document.getElementById("ascii-8");
  const ascii9 = document.getElementById("ascii-9");
  const ascii10 = document.getElementById("ascii-10");
  const ascii11 = document.getElementById("ascii-11");
  const ascii12 = document.getElementById("ascii-12");
  const ascii13 = document.getElementById("ascii-13");
  const ascii14 = document.getElementById("ascii-14");
  const ascii15 = document.getElementById("ascii-15");
  const ascii16 = document.getElementById("ascii-16");
  const ascii17 = document.getElementById("ascii-17");
  const ascii18 = document.getElementById("ascii-18");
  const ascii19 = document.getElementById("ascii-19");
  const ascii20 = document.getElementById("ascii-20");
  const ascii21 = document.getElementById("ascii-21");
  const ascii22 = document.getElementById("ascii-22");
  const ascii23 = document.getElementById("ascii-23");
  const ascii24 = document.getElementById("ascii-24");
  const ascii25 = document.getElementById("ascii-25");

  const playGame = () => PlayGame();

  const hideAllIntro = () => {
    introSectionIntro1.classList.add("hidden-item");
    introSectionIntro2.classList.add("hidden-item");
    introSectionIntro3.classList.add("hidden-item");
    introSectionIntro4.classList.add("hidden-item");
    introSectionIntro5.classList.add("hidden-item");
    introSectionIntro6.classList.add("hidden-item");
    introSectionIntro7.classList.add("hidden-item");
    introSectionIntro8.classList.add("hidden-item");
    introSectionIntro9.classList.add("hidden-item");
    playGameEasyModeBtn.classList.add("hidden-item");
    playGameHardModeBtn.classList.add("hidden-item");
  };

  const delayIntroItems = () =>
    new Promise((resolve) => setTimeout(resolve, 4000));

  async function showIntro() {
    introSectionIntro1.classList.remove("hidden-item");
    await delayIntroItems();
    introSectionIntro1.classList.add("hidden-item");
    introSectionIntro2.classList.remove("hidden-item");
    await delayIntroItems();
    introSectionIntro2.classList.add("hidden-item");
    introSectionIntro3.classList.remove("hidden-item");
    await delayIntroItems();
    introSectionIntro3.classList.add("hidden-item");
    introSectionIntro4.classList.remove("hidden-item");
    await delayIntroItems();
    introSectionIntro4.classList.add("hidden-item");
    introSectionIntro5.classList.remove("hidden-item");
    await delayIntroItems();
    introSectionIntro5.classList.add("hidden-item");
    introSectionIntro6.classList.remove("hidden-item");
    playGameEasyModeBtn.classList.remove("hidden-item");
    playGameHardModeBtn.classList.remove("hidden-item");
  }

  const delayAsciiItems = () =>
    new Promise((resolve) => setTimeout(resolve, 1000));

  let runAscii = true;

  async function showAscii() {
    runAscii = true;
    while (runAscii === true) {
      ascii1.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii1.classList.add("ascii-hidden");
      ascii2.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii2.classList.add("ascii-hidden");
      ascii3.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii3.classList.add("ascii-hidden");
      ascii4.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii4.classList.add("ascii-hidden");
      ascii5.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii5.classList.add("ascii-hidden");
      ascii6.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii6.classList.add("ascii-hidden");
      ascii7.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii7.classList.add("ascii-hidden");
      ascii8.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii8.classList.add("ascii-hidden");
      ascii9.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii9.classList.add("ascii-hidden");
      ascii10.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii10.classList.add("ascii-hidden");
      ascii11.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii11.classList.add("ascii-hidden");
      ascii12.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii12.classList.add("ascii-hidden");
      ascii13.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii13.classList.add("ascii-hidden");
      ascii14.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii14.classList.add("ascii-hidden");
      ascii15.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii15.classList.add("ascii-hidden");
      ascii16.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii16.classList.add("ascii-hidden");
      ascii17.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii17.classList.add("ascii-hidden");
      ascii18.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii18.classList.add("ascii-hidden");
      ascii19.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii19.classList.add("ascii-hidden");
      ascii20.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii20.classList.add("ascii-hidden");
      ascii21.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii21.classList.add("ascii-hidden");
      ascii22.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii22.classList.add("ascii-hidden");
      ascii23.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii23.classList.add("ascii-hidden");
      ascii24.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii24.classList.add("ascii-hidden");
      ascii25.classList.remove("ascii-hidden");
      await delayAsciiItems();
      ascii25.classList.add("ascii-hidden");
    }
  }

  const showResultHuman = () => {
    introSectionIntro7.classList.remove("hidden-item");
    playGameEasyModeBtn.classList.remove("hidden-item");
    playGameHardModeBtn.classList.remove("hidden-item");
  };
  const showResultComputer = () => {
    introSectionIntro8.classList.remove("hidden-item");
    playGameEasyModeBtn.classList.remove("hidden-item");
    playGameHardModeBtn.classList.remove("hidden-item");
  };

  const showResultDraw = () => {
    introSectionIntro9.classList.remove("hidden-item");
    playGameEasyModeBtn.classList.remove("hidden-item");
    playGameHardModeBtn.classList.remove("hidden-item");
  };

  const run = () => {
    showIntro();
    pressStartBtn.forEach((i) => {
      i.addEventListener("click", async function (e) {
        let chosenMode;
        if (e.target.id === "play-game-easy-mode-btn") {
          chosenMode = "easy";
        } else {
          chosenMode = "hard";
        }
        introSection.classList.add("hidden-item");
        hideAllIntro();
        asciiSection.classList.add("ascii-hidden");
        mainSection.classList.remove("hidden-item");

        const finalResult = await playGame().GetFinalResult(chosenMode);

        asciiSection.classList.remove("ascii-hidden");
        mainSection.classList.add("hidden-item");
        introSection.classList.remove("hidden-item");

        if (finalResult.playingTurnResult === "Human") {
          showResultHuman();
        } else if (finalResult.playingTurnResult === "Computer") {
          showResultComputer();
        } else if (finalResult.playingTurnResult === "Draw") {
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
        finalResult.cellBtn1.removeAttribute(
          "style",
          "background-color; color"
        );
        finalResult.cellBtn2.removeAttribute(
          "style",
          "background-color; color"
        );
        finalResult.cellBtn3.removeAttribute(
          "style",
          "background-color; color"
        );
        finalResult.cellBtn4.removeAttribute(
          "style",
          "background-color; color"
        );
        finalResult.cellBtn5.removeAttribute(
          "style",
          "background-color; color"
        );
        finalResult.cellBtn6.removeAttribute(
          "style",
          "background-color; color"
        );
        finalResult.cellBtn7.removeAttribute(
          "style",
          "background-color; color"
        );
        finalResult.cellBtn8.removeAttribute(
          "style",
          "background-color; color"
        );
        finalResult.cellBtn9.removeAttribute(
          "style",
          "background-color; color"
        );
      });
    });
  };

  showAscii();
  startGameBtn.addEventListener("click", () => {
    startGame.classList.add("hidden-item");
    introSection.classList.remove("hidden-item");
    run();
  });
}

gameStory();
