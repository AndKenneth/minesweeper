document.addEventListener('DOMContentLoaded', startGame)
document.addEventListener('click', checkForWin)
document.addEventListener('contextmenu', checkForWin)

// Define your `board` object here!

var generateCells = (size) => {
  var cells = []
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      var isMine = Math.random() < 0.3
      cells.push({row, col, isMine, hidden: true, isMarked: false})  
    }
  }
  return cells
}

var board = {
  cells: generateCells(5)
}

function startGame () {
  board.cells.forEach(cell => {
    cell.surroundingMines = countSurroundingMines(cell)
  });



  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  if (board.cells.filter(cell => cell.isMine && !cell.isMarked).length === 0) {
    lib.displayMessage('You win!')
  }

  if (board.cells.filter(cell => !cell.isMine && cell.hidden).length === 0) {
    lib.displayMessage('You win!')
  }



  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  var mineCount =  surroundingCells.filter(cell => cell.isMine).length
  return mineCount
}

