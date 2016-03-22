function Square(playable) {
  this.playable = playable;
  this.occupied = false;
};

function Piece(team, idNum, row, column) {
  this.team = team;
  this.id = idNum;
  this.row = row;
  this.column = column;
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

// This will create all the pieces for both teams
// Currently it just creates one piece and gives it the desires values
function createPieces() {
  var team = 'red';
  var idNum = 1;
  var row = 0;
  var column = 1;
  redTeam[0] = new Piece(team, idNum, row, column);
}; 

function drawPieces() {
  $('.man').remove();
  for (i = 0; i < redTeam.length; i++) {
    $('#row' + redTeam[i].row + ' .' + redTeam[i].column).append(
        '<div class="red man"></div>');
  };
}; 

$(document).ready(function() {
  $('.button').click(function() {
    $('.button').hide();
    fillBoard();
    drawBoard();
    createPieces();
    drawPieces();
  });
  $('.man').click(function() {
    // Grab the ID of the piece clicked
    // Make sure the piece matches the player moving
    // Check for available moves
    // Highlight open squares
    // Move piece selected to square clicked
    // Remove captured men
    // Check for additional moves
    this.availableMoves();
    drawPieces();
  });
});
