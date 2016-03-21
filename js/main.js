function Square(playable) {
  this.playable = playable;
  this.occupied = false;
};

function Piece(team, number) {
  this.team = team;
  this.number = number;
  this.king = false;
  function highlightPossibles() {
    // This will highlight squares that are available to move into
  };
  function moveMan() {
    // This will move the man
    // Changing coordinates
    // Capturing relevant pieces
    // Updating drawn position
    // Checking for possible chained moves
  };
};

var board = [];
var redTeam = [];
var whiteTeam = [];

// A simple looping function that puts eight arrays, representing rows, into 
// the board array
function fillBoard() {
  for (var i = 0; i < 8; i++) {
    board[i] = fillRow(i);
  };
}; 

// This function is called by fillBoard() in order to fill each row that is
// created while filling the board array
function fillRow(rowNumber) {
  var row = [];
  // If the row is odd, reverse the black/white(playable/not) scheme
  if (isOdd(rowNumber)) {
    // Creates 8 squares in the row array, following the correct scheme of
    // playable/unplayable squares
    for (var i = 0; i < 8; i++) {
      if (isOdd(i)) {
        row[i] = new Square(false);
      } else {
        row[i] = new Square(true);
      }
    }
    // If the row is even, the normal scheme of black/white squares is followed
  } else {
    // Creates eight squares, following the correct scheme
    for (var i = 0; i < 8; i++) {
      if (isOdd(i)) {
        row[i] = new Square(true);
      } else {
        row[i] = new Square(false);
      }
    }
  }
  // Returns the row back to the loop in the fillBoard() function, which puts
  // this new row into its place in the board array
  return row;
};

// A simple function that returns true when a given number is odd, and false
// if it is not
function isOdd(num) {
  return (num % 2) == 1;
};

function drawBoard() {
  // Creates the div for the board to be drawn in
  $('body').prepend('<div id="board"></div>');
  // Creates divs for each row array in the board array
  for (i = 0; i < board.length; i++) {
    $('#board').append('<div id="row' + i + '" class="row"></div>');
    // Creates divs for each square object in the board array
    for (n = 0; n < board[i].length; n++) {
      // Checks if the square is a playable square and adds a class if it is
      if (board[i][n].playable) {
        $('#row' + i).append('<div class="playable square ' + n + '"></div>');
      } else {
        $('#row' + i).append('<div class="square ' + n + '"></div>');
      };
    };
  };
}; 

function createPieces() {
  var team = 'red';
  var number = 1;
  redTeam[0] = new Piece(team, number);
}; 

function drawPieces() {
  $('#row0 .1').append('<div class="red man"></div>');
}; 

$(document).ready(function() {
  $('.button').click(function() {
    $('.button').hide();
    fillBoard();
    drawBoard();
    createPieces();
    drawPieces();
  });
});
