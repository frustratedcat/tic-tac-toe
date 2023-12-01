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
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
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
    console.log(`${getActivePlayer().name}'s turn`);
  };

  // Play a round
  const playRound = (row, column) => {
    console.log(
      `Placing ${
        getActivePlayer().name
      }'s token in row ${row}, column ${column}`
    );
    board.dropToken(row, column, getActivePlayer().token);

    switchPlayerTurn();
    printNewRound();
  };

  // Initial round for game
  printNewRound();

  return { playRound, getActivePlayer, getBoard: board.getBoard };
}

// Create function to put game on screen
function ScreenController() {
  const game = GameController();

  // // Update board for each turn
  // const updateScreen = () => {
  //   // Get newest version of the game and player turn
  //   const board = game.getBoard();
  //   const activePlayer = game.getActivePlayer();
  // };

  // Make player selection
  function makeSelection() {
    let selectedRow = prompt(
      "Choose a row\n(Type 'Top', 'Middle', or 'Bottom')\n>"
    );
    let selectedColumn = prompt(
      "Choose a column\n(Type 'Left', 'Middle', or 'Right')\n>"
    );
    if (!selectedRow || !selectedColumn) {
      return;
    } else {
      if (
        selectedRow.toLowerCase() === "top" &&
        selectedColumn.toLowerCase() === "left"
      ) {
        selectedRow = 0;
        selectedColumn = 0;
      } else if (
        selectedRow.toLowerCase() === "top" &&
        selectedColumn.toLowerCase() === "middle"
      ) {
        selectedRow = 0;
        selectedColumn = 1;
      } else if (
        selectedRow.toLowerCase() === "top" &&
        selectedColumn.toLowerCase() === "right"
      ) {
        selectedRow = 0;
        selectedColumn = 2;
      } else if (
        selectedRow.toLowerCase() === "middle" &&
        selectedColumn.toLowerCase() === "left"
      ) {
        selectedRow = 1;
        selectedColumn = 0;
      } else if (
        selectedRow.toLowerCase() === "middle" &&
        selectedColumn.toLowerCase() === "middle"
      ) {
        selectedRow = 1;
        selectedColumn = 1;
      } else if (
        selectedRow.toLowerCase() === "middle" &&
        selectedColumn.toLowerCase() === "right"
      ) {
        selectedRow = 1;
        selectedColumn = 2;
      } else if (
        selectedRow.toLowerCase() === "bottom" &&
        selectedColumn.toLowerCase() === "left"
      ) {
        selectedRow = 2;
        selectedColumn = 0;
      } else if (
        selectedRow.toLowerCase() === "bottom" &&
        selectedColumn.toLowerCase() === "middle"
      ) {
        selectedRow = 2;
        selectedColumn = 1;
      } else if (
        selectedRow.toLowerCase() === "bottom" &&
        selectedColumn.toLowerCase() === "right"
      ) {
        selectedRow = 2;
        selectedColumn = 2;
      }
    }

    console.log(selectedRow, selectedColumn);
    game.playRound(selectedRow, selectedColumn);

    // updateScreen();
  }

  makeSelection();

  // Initial screen render
  // updateScreen();
}

// Run game
ScreenController();
