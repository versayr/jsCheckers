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
};

Piece.prototype.availableMoves = function() {
  // Highlights the moves available to the man
  // Determine direction the man is moving (team, basically)
  // Determine 'king' value
  // Determine if possible destinations are occupied

  // Loop that finds the squares?
  var possibleSquare1 = board[this.row + 1][this.column - 1];
  var possibleSquare2 = board[this.row + 1][this.column + 1];
  if (possibleSquare1.occupied === true) {
    possibleSquare1 = board[this.row + 2][this.column - 2];
  };
  if (possibleSquare2.occupied === true) {
    possibleSquare2 = board[this.row + 2][this.column + 2];
  };

  $('#' + possibleSquare1.row + possibleSquare1.column).addClass('highlighted');
  $('#' + possibleSquare2.row + possibleSquare2.column).addClass('highlighted');
  $('#' + this.row + this.column).addClass('highlighted');

};

Piece.prototype.moveMan = function(destination) {
  // This will move the man
  // Changing coordinates
  // Capturing relevant pieces
  // Updating drawn position
  // Checking for possible chained moves
  // Occupy destination square
  // Unoccupy previous square
  board[this.row][this.column].occupied = false;
  this.row = destination.row;
  this.column = destination.column;
  board[this.row][this.column].occupied = true;
  // Update relevant values:
  // Last square > unoccupied
  // New square > occupied
  // Captured piece > out of play
  // Kinged man > kinged
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
// MAKE THIS MORE SUCCINCT
function createPieces() {
  var team = 'red';
  var row = 0;
  var column = 1;
  // Creates 12 pieces for the team
  for (i = 0; i < 12; i++) {
    var idNum = i;
    redTeam[i] = new Piece(team, idNum, row, column);
  };
  for (i = 0; i < 3; i++) {
    redTeam[i*4].row = i;
    redTeam[i*4 + 1].row = i;
    redTeam[i*4 + 2].row = i;
    redTeam[i*4 + 3].row = i;
  };
  var n = 0;
  for (i = 0; i < 12; i++) {
    if (isOdd(redTeam[i].row)) {
      redTeam[i].column = n;
    } else {
      redTeam[i].column = n + 1;
    };
    if (n < 6) {
      n = n + 2;
    } else {
      n = 0;
    };
  };
};

// This clears all the pieces off the board and then redraws the pieces in
// their current positions. 
function drawPieces() {
  $('.man').remove();
  for (i = 0; i < redTeam.length; i++) {
    board[redTeam[i].row][redTeam[i].column].occupied = true;
    $('#' + redTeam[i].row + redTeam[i].column).append(
        '<div id="' +  redTeam[i].id + '" class="red man"></div>');
    // console.log(redTeam[i].id + ' is now at ' + redTeam[i].row + redTeam[i].column);
  };
  for (i = 0; i < whiteTeam.length; i++) {
    board[whiteTeam[i].row][whiteTeam[i].column].occupied = true;
    $('#' + whiteTeam[i].row + whiteTeam[i].column).append(
        '<div id="' + whiteTeam[i].id + '" class="white man"></div>');
  };
}; 

function getPiece(event, team) {
  if (team === 'red') {
    return redTeam[event.target.id];
  } else if (team === 'white') {
    return whiteTeam[event.target.id];
  };
};

function getSquare(thisSquare) {
  var row = thisSquare.charAt(0);
  var column = thisSquare.charAt(1);

  return board[row][column];
};

$(document).ready(function() {
  // I DON'T LIKE THAT I DECLARE THESE HERE
  // TEMPORARY, MOVE THESE SOMEWHERE BETTER LATER
  var team = undefined;
  var selectedPiece = undefined;
  var currentSquare = undefined;
  var destinationSquare = undefined;

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

    // Gets the Piece{} that corresponds with the .man element that has been
    // clicked by the player
    team = $(this).attr('class').split(' ')[0];
    selectedPiece = getPiece(event, team);
    console.log(selectedPiece);

    selectedPiece.availableMoves();

    // Gets the Square{} that corresponds with the .playable element that has
    // been clicked by the player
    currentSquare = getSquare($(this).closest('.playable').attr('id'));

  });
  
  $('body').on('click', '.highlighted', function(event) {
    destinationSquare = getSquare(event.currentTarget.id);

    // ON SELF-CLICK, REMOVE HIGHLIGHTING
    if (currentSquare == destinationSquare) {
      $('.highlighted').removeClass('highlighted');
      return;
    };

    selectedPiece.moveMan(destinationSquare);

    $('.highlighted').removeClass('highlighted');

    // REDRAW THE BOARD FOR EACH UPDATE?
    // MAYBE AFTER I ADD BETTER HIGHLIGHTING LOGIC AND CLEAR THE BOARD
    // AT THE BEGINNING OF drawBoard()
    // drawBoard();
    drawPieces();
  });
});
