function Square(name) {
  this.name = name;
  this.playable = 'false';
  if (this.playable = true) {
    // add ID number for the square
  };
};

var board = [];

function fillBoard() {
  for (var i = 0; i < 8; i++) {
    board[i] = fillRow(i);
  };
}; 

function fillRow(rowNumber) {
  var row = [];
  for (var i = 0; i < 8; i++) {
    row[i] = new Square(i);
  };
  return row;
};

function drawBoard() {
  console.log('The board is now drawn onto the page.');
}; 

function createPieces() {
  console.log('The piece objects are created now.');
}; 

function drawPieces() {
  console.log('The piece objects are now drawn onto the page.');
}; 

$(document).ready(function() {
  $('.button').click(function() {
    fillBoard();
    drawBoard();
    createPieces();
    drawPieces();
  });
});
