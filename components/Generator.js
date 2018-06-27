/** original code from http://www.emanueleferonato.com/2015/06/23/pure-javascript-sudoku-generatorsolver/ **/

let sudoku

function returnRow(cell) {
	return Math.floor(cell / 9)
}

function returnCol(cell) {
	return cell % 9
}

function returnBlock(cell) {
	return Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3)
}

function isPossibleRow(number, row, sudoku) {
	for (let i=0; i<=8; i++) {
		if (sudoku[row*9 + i] == number) {
			return false
		}
	}

	return true
}

function isPossibleCol(number, col, sudoku) {
	for (let i=0; i<=8; i++) {
		if (sudoku[col + 9*i] == number) {
			return false
		}
	}

	return true
}

function isPossibleBlock(number, block, sudoku) {
	for (let i=0; i<=8; i++) {
		if (sudoku[Math.floor(block / 3)*27 
		+ i % 3 + 9*Math.floor(i/3) 
		+ 3*(block % 3)] == number) {
			return false
		}
	}

	return true
}

function isPossibleNumber(cell, number, sudoku) {
	let row = returnRow(cell)
	let col = returnCol(cell)
	let block = returnBlock(cell)

	return isPossibleRow(number, row, sudoku) 
		&& isPossibleCol(number, col, sudoku) 
		&& isPossibleBlock(number, block, sudoku)
}

function isCorrectRow(row, sudoku) {
	let rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9)
	let rowTemp= new Array()

	for (let i=0; i<=8; i++) {
		rowTemp[i] = sudoku[row*9 + i]
	}
	rowTemp.sort()

	return rowTemp.join() == rightSequence.join()
}

function isCorrectCol(col, sudoku) {
	let rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9)
	let colTemp= new Array()

	for (let i=0; i<=8; i++) {
		colTemp[i] = sudoku[col + i*9]
	}
	colTemp.sort()

	return colTemp.join() == rightSequence.join()
}

function isCorrectBlock(block, sudoku) {
	let rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9)
	let blockTemp= new Array()

	for (let i=0; i<=8; i++) {
		blockTemp[i] = sudoku[Math.floor(block / 3)*27
			+ i % 3
			+ 9 * Math.floor(i / 3)
			+ 3 * (block % 3)
		]
	}
	blockTemp.sort()

	return blockTemp.join() == rightSequence.join()
}

function isSolvedSudoku(sudoku) {
	for (let i=0; i<=8; i++) {
		if (!isCorrectBlock(i, sudoku) || !isCorrectRow(i, sudoku) || !isCorrectCol(i, sudoku)) {
			return false
		}
	}

	return true
}

function determinePossibleValues(cell, sudoku) {
	let possible = new Array()
	for (let i=1; i<=9; i++) {
		if (isPossibleNumber(cell, i, sudoku)) {
			possible.unshift(i)
		}
	}

	return possible
}

function determineRandomPossibleValue(possible, cell) {
	let randomPicked = Math.floor(Math.random() * possible[cell].length)

	return possible[cell][randomPicked]
}

function scanSudokuForUnique(sudoku) {
	let possible = new Array()
	for (let i=0; i<=80; i++) {
		if (sudoku[i] == 0) {
			possible[i] = new Array()
			possible[i] = determinePossibleValues(i, sudoku)
			if (possible[i].length == 0) {
				return false
			}
		}
	}

	return possible
}

function removeAttempt(attemptArray, number) {
	let newArray = new Array()
	for (let i=0; i < attemptArray.length; i++) {
		if (attemptArray[i] != number) {
			newArray.unshift(attemptArray[i])
		}
	}

	return newArray
}

export function generate() {
	sudoku = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
	let saved = new Array()
	let savedSudoku = new Array()
	let nextMove
	let whatToTry
	let attempt

	while (!isSolvedSudoku(sudoku)) {
		nextMove = scanSudokuForUnique(sudoku)

		if (nextMove == false) {
			nextMove = saved.pop()
			sudoku = savedSudoku.pop()
		}
		whatToTry = nextMove.length - 1
		attempt = determineRandomPossibleValue(nextMove, whatToTry)

		if (nextMove[whatToTry].length > 1) {
			nextMove[whatToTry] = removeAttempt(nextMove[whatToTry], attempt)
			saved.push(nextMove.slice())
			savedSudoku.push(sudoku.slice())
		}
		sudoku[whatToTry] = attempt
  }
  
	return sudoku
}