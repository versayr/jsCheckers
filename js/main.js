function Checkers() {
  this.board = [];
  this.redTeam = [];
  this.whiteTeam = [];
  // WHY DOESN'T THIS WORK WHEN this.currentSquare IS undefined?
  this.currentSquare = true;
  this.destinationSquare = undefined;
  this.team = undefined;
  this.selectedPiece = undefined;
};

function Square(row, column, playable) {
  this.row = row;
  this.column = column;
  this.playable = playable;
  this.occupied = false;
  this.destination = false;
  this.isCurrentSquare = false;
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
  var possibleSquare1 = game.board[this.row + 1][this.column - 1];
  var possibleSquare2 = game.board[this.row + 1][this.column + 1];
  if (possibleSquare1.occupied === true) {
    possibleSquare1 = game.board[this.row + 2][this.column - 2];
  };
  if (possibleSquare2.occupied === true) {
    possibleSquare2 = game.board[this.row + 2][this.column + 2];
  };

  /*
     $('#' + possibleSquare1.row + possibleSquare1.column).addClass('destination');
     $('#' + possibleSquare2.row + possibleSquare2.column).addClass('destination');
     $('#' + this.row + this.column).addClass('currentSquare');
     */

  possibleSquare1.destination = true;
  possibleSquare2.destination = true;
  // NOT WORKING, this MUST BE INCORRECT HERE
  game.currentSquare.isCurrentSquare = true;

  drawBoard();
  drawPieces();
};

Piece.prototype.moveMan = function(destination) {
  // This will move the man
  // Changing coordinates
  // Capturing relevant pieces
  // Updating drawn position
  // Checking for possible chained moves
  // Occupy destination square
  // Unoccupy previous square
  game.board[this.row][this.column].occupied = false;
  this.row = destination.row;
  this.column = destination.column;
  game.board[this.row][this.column].occupied = true;
  // Update relevant values:
  // Last square > unoccupied
  // New square > occupied
  // Captured piece > out of play
  // Kinged man > kinged
};

// A simple looping function that puts eight arrays, representing rows, into 
// the board array
function fillBoard() {
  for (var i = 0; i < 8; i++) {
    game.board[i] = fillRow(i);
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
  $('body').empty();
  $('body').prepend('<div id="board"></div>');
  // Creates divs for each row array in the board array
  for (i = 0; i < game.board.length; i++) {
    $('#board').append('<div id="row' + i + '" class="row"></div>');
    // Creates divs for each square object in the board array
    for (n = 0; n < game.board[i].length; n++) {
      // Checks if the square is a playable square and adds a class if it is
      if (game.board[i][n].playable) {
        $('#row' + i).append(
            '<div id="' + i + n + '" class="playable square"></div>'
            );
        if (game.board[i][n].destination) {
          $('#' + i + n).addClass('destination');
        };
        if (game.board[i][n].isCurrentSquare) {
          $('#' + i + n).addClass('currentSquare');
        };
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
    game.redTeam[i] = new Piece(team, i, row, column);
  };
  for (i = 0; i < 3; i++) {
    game.redTeam[i*4].row = i;
    game.redTeam[i*4 + 1].row = i;
    game.redTeam[i*4 + 2].row = i;
    game.redTeam[i*4 + 3].row = i;
  };
  var n = 0;
  for (i = 0; i < 12; i++) {
    if (isOdd(game.redTeam[i].row)) {
      game.redTeam[i].column = n;
    } else {
      game.redTeam[i].column = n + 1;
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
  for (i = 0; i < game.redTeam.length; i++) {
    game.board[game.redTeam[i].row][game.redTeam[i].column].occupied = true;
    $('#' + game.redTeam[i].row + game.redTeam[i].column).append(
        '<div id="' +  game.redTeam[i].id + '" class="red man"></div>');
  };
  for (i = 0; i < game.whiteTeam.length; i++) {
    game.board[game.whiteTeam[i].row][game.whiteTeam[i].column].occupied = true;
    $('#' + game.whiteTeam[i].row + game.whiteTeam[i].column).append(
        '<div id="' + game.whiteTeam[i].id + '" class="white man"></div>');
  };
}; 

function getPiece(event, team) {
  if (team === 'red') {
    return game.redTeam[event.target.id];
  } else if (team === 'white') {
    return game.whiteTeam[event.target.id];
  };
};

function getSquare(thisSquare) {
  var row = thisSquare.charAt(0);
  var column = thisSquare.charAt(1);

  return game.board[row][column];
};

var game = new Checkers();

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

    // Gets the Piece{} that corresponds with the .man element that has been
    // clicked by the player
    game.team = $(this).attr('class').split(' ')[0];
    game.selectedPiece = getPiece(event, game.team);

    // If the man clicked is already in the .currentSquare, do nothing because
    // the other listener is doing what needs to be done
    /*
    if ((game.currentSquare.row = game.selectedPiece.row) && (game.currentSquare.column = game.selectedPiece.row)) {
      return;
    };
    */

    game.selectedPiece.availableMoves();

    // Gets the Square{} that corresponds with the .playable element that has
    // been clicked by the player
    game.currentSquare = getSquare($(this).closest('.playable').attr('id'));
    game.currentSquare.isCurrentSquare = true;
  });

  $('body').on('click', '.currentSquare', function(event) {
    // currentSquareClick();
    
    // game.currentSquare = getSquare($(this).closest('.playable').attr('id'));

    game.currentSquare.isCurrentSquare = false;

    drawBoard();
    drawPieces();

    // THIS IS A COP OUT
    $('.currentSquare').removeClass('currentSquare');
    $('.destination').removeClass('destination');
  });

  $('body').on('click', '.destination', function(event) {
    game.destinationSquare = getSquare(event.currentTarget.id);

    game.selectedPiece.moveMan(game.destinationSquare);

    game.currentSquare.isCurrentSquare = false;

    drawBoard();
    drawPieces();

    // THIS IS A COP OUT
    $('.currentSquare').removeClass('currentSquare');
    $('.destination').removeClass('destination');
  });
});
