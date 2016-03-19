function createBoard() {
  console.log('The board object and square objects are created now.');
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
    createBoard();
    drawBoard();
    createPieces();
    drawPieces();
  });
});
