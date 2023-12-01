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
  console.log(board);
}

// Create function to take player selection and put on board
function Cell() {
  let value = "";

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => {
    value;
  };

  return { addToken, getValue };
}

// Create function to control the game
function GameController() {
  const board = GameBoard();
}

// Create function to put game on screen
function ScreenController() {
  const game = GameController();
}

// Run game
ScreenController();
