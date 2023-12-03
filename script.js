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

    console.log(availableCells.length, availableCells);
    if (!availableCells.length) return;

    board[row][column].addToken(player);
  };

  // Log the board to check things
  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, dropToken, printBoard };
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

  // shows board and active player for each turn
  const printNewRound = () => {
    board.printBoard();
    console.log(`${activePlayer.name}'s turn`);
  };

  // Play a round
  const playRound = (cell, row, column) => {
    console.log(
      `Placing ${activePlayer.name}'s ${activePlayer.token} in cell ${cell}`
    );
    board.dropToken(row, column, activePlayer.token);

    switchPlayerTurn();
    printNewRound();
  };

  // Initial round for game. Will run one time
  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

// Create function to put game on screen
function ScreenController() {
  console.log("start the game");

  const game = GameController();
  const board = game.getBoard();

  let breakLoop = false;

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

  // Make player selection
  function makeSelection() {
    const activePlayer = game.getActivePlayer();

    getBoardCellValues();

    let selectedRow;
    let selectedColumn;
    let selectedCell = Number(
      prompt(
        `${activePlayer.name}:\nChoose a cell:\n${
          boardCellOne === 0 ? [1] : boardCellOne
        } | ${boardCellTwo === 0 ? [2] : boardCellTwo} | ${
          boardCellThree === 0 ? [3] : boardCellThree
        }\n${boardCellFour === 0 ? [4] : boardCellFour} | ${
          boardCellFive === 0 ? [5] : boardCellFive
        } | ${boardCellSix === 0 ? [6] : boardCellSix}\n${
          boardCellSeven === 0 ? [7] : boardCellSeven
        } | ${boardCellEight === 0 ? [8] : boardCellEight} | ${
          boardCellNine === 0 ? [9] : boardCellNine
        }`
      )
    );

    if (!selectedCell || selectedCell > 9 || selectedCell < 1) {
      console.log(`Invalid input given\nStill ${activePlayer.name}'s turn`);
      return (breakLoop = true);
    } else if (
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
            (activePlayer.token === "X" &&
              selectedCell === 1 &&
              boardCellOne === "X") ||
            (activePlayer.token === "X" &&
              selectedCell === 2 &&
              boardCellTwo === "X") ||
            (activePlayer.token === "X" &&
              selectedCell === 3 &&
              boardCellThree === "X") ||
            (activePlayer.token === "X" &&
              selectedCell === 4 &&
              boardCellFour === "X") ||
            (activePlayer.token === "X" &&
              selectedCell === 5 &&
              boardCellFive === "X") ||
            (activePlayer.token === "X" &&
              selectedCell === 6 &&
              boardCellSix === "X") ||
            (activePlayer.token === "X" &&
              selectedCell === 7 &&
              boardCellSeven === "X") ||
            (activePlayer.token === "X" &&
              selectedCell === 8 &&
              boardCellEight === "X") ||
            (activePlayer.token === "X" &&
              selectedCell === 9 &&
              boardCellNine === "X") ||
            (activePlayer.token === "O" &&
              selectedCell === 1 &&
              boardCellOne === "O") ||
            (activePlayer.token === "O" &&
              selectedCell === 2 &&
              boardCellTwo === "O") ||
            (activePlayer.token === "O" &&
              selectedCell === 3 &&
              boardCellThree === "O") ||
            (activePlayer.token === "O" &&
              selectedCell === 4 &&
              boardCellFour === "O") ||
            (activePlayer.token === "O" &&
              selectedCell === 5 &&
              boardCellFive === "O") ||
            (activePlayer.token === "O" &&
              selectedCell === 6 &&
              boardCellSix === "O") ||
            (activePlayer.token === "O" &&
              selectedCell === 7 &&
              boardCellSeven === "O") ||
            (activePlayer.token === "O" &&
              selectedCell === 8 &&
              boardCellEight === "O") ||
            (activePlayer.token === "O" &&
              selectedCell === 9 &&
              boardCellNine === "O")
          ) {
            return activePlayer.name;
          } else {
            return activePlayer.name === "Player One"
              ? "Player Two"
              : "Player One";
          }
        })()}, please select again\nStill ${activePlayer.name}'s turn`
      );
      return (breakLoop = true);
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
    game.playRound(selectedCell, selectedRow, selectedColumn);
  }

  breakLoop = false;

  // Run a turn
  const runTurn = () => {
    while (breakLoop === false) {
      let i = 0;
      while (i < board.length) {
        let j = 0;
        while (j < board[i].length) {
          console.log(breakLoop);
          makeSelection(board[i][j].getValue());
          console.log(board[i][j].getValue());
          j++;
        }
        i++;
      }
      breakLoop = true;
    }
  };

  runTurn();
}

// Run game
ScreenController();
