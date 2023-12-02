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
  const playRound = (cell, row, column) => {
    console.log(`Placing ${getActivePlayer().name}'s token in cell ${cell}`);
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

  // Make player selection
  function makeSelection() {
    let selectedRow;
    let selectedColumn;
    let selectedCell = Number(
      prompt(`Choose a cell:\n[1][2][3]\n[4][5][6]\n[7][8][9]`)
    );

    if (!selectedCell) {
      console.log("Invalid input given");
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
    game.playRound(selectedCell, selectedRow, selectedColumn);
  }

  makeSelection();
}

// Run game
ScreenController();
