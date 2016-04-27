function Checkers() {
  this.board = [];
  this.redTeam = [];
  this.whiteTeam = [];
  // WHY DOESN'T THIS WORK WHEN this.currentSquare IS undefined?
  this.currentSquare = true;
  this.destinationSquare = undefined;
  this.team = undefined;
  this.selectedPiece = undefined;
  this.possibleSquareOne = false;
  this.p1jumped = undefined;
  this.possibleSquareTwo = false;
  this.p2jumped = undefined;
  this.turn = 'red';
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

// This function updates the squares in the board array with destination values
// when a .man is clicked
Piece.prototype.availableMoves = function() {
  // Determine 'king' value

  if (game.selectedPiece.team === 'red') {
    if (game.selectedPiece.column === 0) {
      // only look for one possible destination
      game.possibleSquareTwo = game.board[this.row + 1][this.column + 1];
    } else if (game.selectedPiece.column === 7) {
      // only look for one possible destination
      game.possibleSquareOne = game.board[this.row + 1][this.column - 1];
    } else {
      game.possibleSquareOne = game.board[this.row + 1][this.column - 1];
      game.possibleSquareTwo = game.board[this.row + 1][this.column + 1];
    };

    // NEED TO FIND IF THE SECOND DESTINATION IS ALSO ON THE BOARD
    if (game.possibleSquareOne.occupied === true) {
      // Check if the possible square is occupied by a piece of the same team
      // This needs to check the Piece{} that is in the possibleSquare, not the
      // team value of the possibleSquare, because that doesn't exist...
      if (game.selectedPiece.team === game.possibleSquareOne.occupiedBy.team) {
        game.possibleSquareOne.destination = false;
      } else {
        game.possibleSquareOne = game.board[this.row + 2][this.column - 2];
        if (game.possibleSquareOne.occupied === true) {
          game.possibleSquareOne.destination = false;
        } else {
          game.possibleSquareOne.destination = true;
          game.currentSquare.isCurrentSquare = true;
        }
      }
    } else {
      game.possibleSquareOne.destination = true;
      game.currentSquare.isCurrentSquare = true;
    };

    if (game.possibleSquareTwo.occupied === true) {
      // Check if the possible square is occupied by a piece of the same team
      if (game.selectedPiece.team === game.possibleSquareTwo.occupiedBy.team) {
        game.possibleSquareTwo.destination = false;
      } else {
        game.possibleSquareTwo = game.board[this.row + 2][this.column + 2];
        if (game.possibleSquareTwo.occupied === true) {
          game.possibleSquareTwo.destination = false;
        } else {
          game.possibleSquareTwo.destination = true;
          game.currentSquare.isCurrentSquare = true;
        }
      }
    } else {
      game.possibleSquareTwo.destination = true;
      game.currentSquare.isCurrentSquare = true;
    };
  };

  if (game.selectedPiece.team === 'white') {
    if (game.selectedPiece.column === 0) {
      game.possibleSquareOne = game.board[this.row - 1][this.column + 1];
    } else if (game.selectedPiece.column === 7) {
      game.possibleSquareTwo = game.board[this.row - 1][this.column - 1];
    } else {
      game.possibleSquareOne = game.board[this.row - 1][this.column + 1];
      game.possibleSquareTwo = game.board[this.row - 1][this.column - 1];
    };

    if (game.possibleSquareOne.occupied === true) {
      if (game.selectedPiece.team === game.possibleSquareOne.occupiedBy.team) {
        game.possibleSquareOne.destination = false;
      } else {
        game.possibleSquareOne = game.board[this.row - 2][this.column + 2];
        if (game.possibleSquareOne.occupied === true) {
          game.possibleSquareOne.destination = false;
        } else {
          game.possibleSquareOne.destination = true;
          game.currentSquare.isCurrentSquare = true;
        }
      }
    } else {
      game.possibleSquareOne.destination = true;
      game.currentSquare.isCurrentSquare = true;
    };

    if (game.possibleSquareTwo.occupied === true) {
      if (game.selectedPiece.team === game.possibleSquareTwo.occupiedBy.team) {
        game.possibleSquareTwo.destination = false;
      } else {
        game.possibleSquareTwo = game.board[this.row - 2][this.column - 2];
        if (game.possibleSquareTwo.occupied === true) {
          game.possibleSquareTwo.destination = false;
        } else {
          game.possibleSquareTwo.destination = true;
          game.currentSquare.isCurrentSquare = true;
        }
      }
    } else {
      game.possibleSquareTwo.destination = true;
      game.currentSquare.isCurrentSquare = true;
    };
  };
};

// This function moves the selected man from its current square into the 
// destination square
Piece.prototype.moveMan = function() {
  // Changing coordinates of the man
  this.row = game.destinationSquare.row;
  this.column = game.destinationSquare.column;

  // Capturing relevant pieces

  // Unoccupy previous square
  game.currentSquare.occupied = false;

  // Occupy destination square
  game.destinationSquare.occupied = true;

  // Check for possible chained moves

  // Clear destinations and current square
  // MAYBE MAKE THIS INTO ITS OWN FUNCTION, OTHER PLACES COULD USE IT
  game.possibleSquareOne.destination = false;
  game.possibleSquareTwo.destination = false;
  game.currentSquare.isCurrentSquare = false;

  if (game.turn === 'red') {
    game.turn = 'white';
    console.log(game.turn + "'s turn to play.");
  } else if (game.turn === 'white') {
    game.turn = 'red';
    console.log(game.turn + "'s turn to play.");
  };

  // Update relevant values:
  // Last square > unoccupied
  // New square > occupied
  // Captured piece > out of play
  // Kinged man > kinged
  // Turn > other team
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
function createPieces(team) {
  var row = 0;
  var column = 1;
  // Creates 12 pieces for the team
  if (team === 'red') {
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
  } else if (team === 'white') {
    for (i = 0; i < 12; i++) {
      game.whiteTeam[i] = new Piece(team, i, row, column);
    };
    for (i = 0; i < 3; i++) {
      game.whiteTeam[i*4].row = 7 - i;
      game.whiteTeam[i*4 + 1].row = 7 - i;
      game.whiteTeam[i*4 + 2].row = 7 - i;
      game.whiteTeam[i*4 + 3].row = 7 - i;
    };
    var n = 0;
    for (i = 0; i < 12; i++) {
      if (isOdd(game.whiteTeam[i].row)) {
        game.whiteTeam[i].column = n;
      } else {
        game.whiteTeam[i].column = n + 1;
      };
      if (n < 6) {
        n = n + 2;
      } else {
        n = 0;
      };
    };
  }
};

// This clears all the pieces off the board and then redraws the pieces in
// their current positions. 
function drawPieces() {
  $('.man').remove();
  for (i = 0; i < game.redTeam.length; i++) {
    game.board[game.redTeam[i].row][game.redTeam[i].column].occupied = true;
    game.board[game.redTeam[i].row][game.redTeam[i].column].occupiedBy = 
      game.redTeam[i];
    $('#' + game.redTeam[i].row + game.redTeam[i].column).append(
        '<div id="' +  game.redTeam[i].id + '" class="red man"></div>');
  };
  for (i = 0; i < game.whiteTeam.length; i++) {
    game.board[game.whiteTeam[i].row][game.whiteTeam[i].column].occupied = true;
    game.board[game.whiteTeam[i].row][game.whiteTeam[i].column].occupiedBy = 
      game.whiteTeam[i];
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
  fillBoard();
  drawBoard();
  createPieces('red');
  createPieces('white');
  drawPieces();
  $('body').on('click', '.man', function(event) {
    // Grab the ID of the piece clicked
    // Make sure the piece matches the player moving
    // Check for available moves
    // Highlight open squares
    // Move piece selected to square clicked
    // Remove captured men
    // Check for additional moves

    // This prevents more than one .man from being selected
    if ($('.currentSquare').length === 1) {
      return;
    }

    // Gets the Piece{} that corresponds with the .man element that has been
    // clicked by the player
    game.team = $(this).attr('class').split(' ')[0];
    game.selectedPiece = getPiece(event, game.team);

    if (game.team === game.turn) {

      // Gets the Square{} that corresponds with the .playable element that has
      // been clicked by the player
      // MAYBE JUST GET THE COORDINATES OF THE SELECTED PIECE? IDK
      game.currentSquare = getSquare($(this).closest('.playable').attr('id'));

      game.selectedPiece.availableMoves();

      drawBoard();
      drawPieces();
    } else {
      console.log("Wrong team, wait your turn!");
    };
  });

  $('body').on('click', '.currentSquare', function(event) {
    game.currentSquare.isCurrentSquare = false;

    game.possibleSquareOne.destination = false;
    game.possibleSquareTwo.destination = false;

    drawBoard();
    drawPieces();
  });

  $('body').on('click', '.destination', function(event) {
    game.destinationSquare = getSquare(event.currentTarget.id);

    game.selectedPiece.moveMan();

    drawBoard();
    drawPieces();
  });
});

// To Do:
// Comment more of the code
//
// Clean up Piece.prototype.availableMoves()
// - Currently works for non-king men, but it feels redundant to list moves for
//   red and white teams
// - Add king movement. This should be easier when the function is simplified
//   and condensed.
//
// Add capture logic
//
// Remove redundant variables/trackers
//
// createPieces{} needs to be cleaner
// - There's gotta be a more graceful way to correctly fill in the variables
//   on the men, without weird loops and repeated code
//
// Make the .destination 'x' look nicer... probably with CSS, not JS, but I 
// don't have a to do list in the CSS
//
// Organize functions
//
// Add kinging logic
//
// Add team turn function
//
// Add animations
//
// Add a scoreboard(?)
//
// Create failsafes that prevent:
// - Multiple pieces in the same square
// - Multiple selectedPieces or currentSquares
//   - Currently, there is both the game object's variable for these values 
//     AND properties in the Piece{} and Square{} objects. This may be
//     unnecessary?
// - These failsafes will be easier with cleaner code
//
// Maybe I don't need to completely redraw the board and pieces every click...
// I'll work on this after everything else is a little cleaner
