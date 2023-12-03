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

  // let boardCellOne = board[0][0].getValue();
  // console.log(boardCellOne);

  // getBoardCellValues = () => boardCellOne;

  // Make player selection
  function makeSelection() {
    const activePlayer = game.getActivePlayer();

    // getBoardCellValues();

    // let boardCellOne = board[0][0].getValue();
    // console.log(boardCellOne);

    let selectedRow;
    let selectedColumn;
    let selectedCell = Number(
      prompt(
        `${activePlayer.name}:\nChoose a cell:\n[${
          board[0][0].getValue() === 0 ? [1] : board[0][0].getValue()
        }][${board[0][1].getValue() === 0 ? [2] : board[0][1].getValue()}][${
          board[0][2].getValue() === 0 ? [3] : board[0][2].getValue()
        }]\n[${board[1][0].getValue() === 0 ? [4] : board[1][0].getValue()}][${
          board[1][1].getValue() === 0 ? [5] : board[1][1].getValue()
        }][${board[1][2].getValue() === 0 ? [6] : board[1][2].getValue()}]\n[${
          board[2][0].getValue() === 0 ? [7] : board[2][0].getValue()
        }][${board[2][1].getValue() === 0 ? [8] : board[2][1].getValue()}][${
          board[2][2].getValue() === 0 ? [9] : board[2][2].getValue()
        }]`
      )
    );

    if (!selectedCell || selectedCell > 9 || selectedCell < 1) {
      console.log("Invalid input given");
      return;
    } else if (
      (selectedCell === 1 && board[0][0].getValue() === "X") ||
      (selectedCell === 1 && board[0][0].getValue() === "O") ||
      (selectedCell === 2 && board[0][1].getValue() === "X") ||
      (selectedCell === 2 && board[0][1].getValue() === "O") ||
      (selectedCell === 3 && board[0][2].getValue() === "X") ||
      (selectedCell === 3 && board[0][2].getValue() === "O") ||
      (selectedCell === 4 && board[1][0].getValue() === "X") ||
      (selectedCell === 4 && board[1][0].getValue() === "O") ||
      (selectedCell === 5 && board[1][1].getValue() === "X") ||
      (selectedCell === 5 && board[1][1].getValue() === "O") ||
      (selectedCell === 6 && board[1][2].getValue() === "X") ||
      (selectedCell === 6 && board[1][2].getValue() === "O") ||
      (selectedCell === 7 && board[2][0].getValue() === "X") ||
      (selectedCell === 7 && board[2][0].getValue() === "O") ||
      (selectedCell === 8 && board[2][1].getValue() === "X") ||
      (selectedCell === 8 && board[2][1].getValue() === "O") ||
      (selectedCell === 9 && board[2][2].getValue() === "X") ||
      (selectedCell === 9 && board[2][2].getValue() === "O")
    ) {
      console.log("This cell has already been selected");
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

  // Run a turn
  const runTurn = () => {
    let i = 0;
    while (i < board.length) {
      let j = 0;
      while (j < board[i].length) {
        makeSelection(board[i][j].getValue());
        console.log(board[i][j].getValue());
        j++;
      }
      i++;
    }
  };

  runTurn();
}

// Run game
ScreenController();
