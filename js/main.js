function Square(row, column, playable) {
  this.row = row;
  this.column = column;
  this.playable = playable;
  this.occupied = false;
};

function Piece(team, idNum, row, column) {
  this.team = team;
  this.id = idNum;
  this.row = row;
  this.column = column;
  this.king = false;
  function availableMoves() {
    // This will highlight squares that are available to move into

  };
  function moveMan() {
    // This will move the man
    // Changing coordinates
    // Capturing relevant pieces
    // Updating drawn position
    // Checking for possible chained moves
    // Occupy destination square
    // Unoccupy previous square
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
        row[i] = new Square(rowNumber, i, false);
      } else {
        row[i] = new Square(rowNumber, i, true);
      }
    }
    // If the row is even, the normal scheme of black/white squares is followed
  } else {
    // Creates eight squares, following the correct scheme
    for (var i = 0; i < 8; i++) {
      if (isOdd(i)) {
        row[i] = new Square(rowNumber, i, true);
      } else {
        row[i] = new Square(rowNumber, i, false);
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
        $('#row' + i).append(
            '<div id="' + i + n + '" class="playable square"></div>'
            );
      } else {
        $('#row' + i).append(
            '<div id="' + i + n + '" class="square ' + n + '"></div>'
            );
      };
    };
  };
}; 

// This will create all the pieces for both teams
// Currently it just creates one piece and gives it the desires values
function createPieces() {
  var team = 'red';
  var idNum = 0;
  var row = 0;
  var column = 1;
  redTeam[0] = new Piece(team, idNum, row, column);
}; 

// This clears all the pieces off the board and then redraws the pieces in
// their current positions. 
// Currently there is only one piece.
function drawPieces() {
  $('.man').remove();
  for (i = 0; i < redTeam.length; i++) {
    $('#' + redTeam[i].row + redTeam[i].column).append(
        '<div id="' +  redTeam[i].id + '" class="red man"></div>');
  };
}; 

function getPiece(event, team) {
  if (team === 'red') {
    return redTeam[event.target.id];
  } else if (team === 'white') {
    return whiteTeam[event.target.id];
  };
};

function getSquare(event) {
  var row = parseInt(event.target.id.charAt(0));
  var column = parseInt(event.target.id.charAt(1));
  
  return board[row][column];
};

$(document).ready(function() {
  $('.button').click(function() {
    $('.button').hide();
    fillBoard();
    drawBoard();
    createPieces();
    drawPieces();
  });
  $('body').on('click', '.man', function(event) {
    // Grab the ID of the piece clicked
    // Make sure the piece matches the player moving
    // Check for available moves
    // Highlight open squares
    // Move piece selected to square clicked
    // Remove captured men
    // Check for additional moves
    // ******************************************
    // MOVE MOST ALL OF THIS TO THE PIECE OBJECTS

    // Highlights available squares
    // Currently just highlights all playable squares, until the movement
    // requirements and logic is added
    $('.playable').addClass('highlighted');

    // Gets the Piece{} that corresponds with the .man element that has been
    // clicked by the player
    var team = $(this).attr('class').split(' ')[0];
    var selectedPiece = getPiece(event, team);

    // Gets the Square{} that corresponds with the .playable element that has
    // been clicked by the player
    // TRY TO FIND A WAY TO GET THE getPiece() FUNCTION WORKING HERE
    var currentRow = selectedPiece.row;
    var currentColumn = selectedPiece.column;
    var currentSquare = board[currentRow][currentColumn];

    $('body').on('click', '.highlighted', function(event) {
      var destinationSquare = getSquare(event);

      destinationSquare.occupied = true;
      currentSquare.occupied = false;

      selectedPiece.row = destinationSquare.row;
      selectedPiece.column = destinationSquare.column;

      $('.highlighted').removeClass('highlighted');

      drawPieces();
    });
  });
});
