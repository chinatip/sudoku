import React from 'react'
import styled from 'styled-components'
import { withStateHandlers } from 'recompose'
import _ from 'lodash'

import Cell from './Cell'

const size = 9

const Row = styled.div`
  display: flex;
`

const cellSize = 50
const CellWrapper = styled.div`
  width: ${cellSize}px;
  height: ${cellSize}px;
  border: 1px solid black;
  ${props => props.bDivider && 'border-bottom: 5px solid black'};
  ${props => props.rDivider && 'border-right: 5px solid black'};
`

const checkEndGame = (status) => {
// console.log(status.filter((row) => {
//   return row.filter((c) => c === false).length > 1
// }).length < 1, status)

  return status.filter((row) => {
    return row.filter((c) => c === false).length > 1
  }).length < 1
}

const fixHint = (list, total) => {
  var i = 0
  while(total !== 0) {
    if (total < 0) {
      if (list[i % size] === 1) return
      list[i]--
      total++
    } else {
      if (list[i % size] === 8) return
      list[i]++
      total--
    } 

    i++
  }

  return list
}

const randomNumHintPerBlock = () => {
  const rNum = Math.floor(Math.random() * 10)
  let totalHint = rNum < 7? 38: rNum === 9? 37: ((9 - rNum) + 38)  
  let hintList = []
  const pNumHint = [0.03, 0.17, 0.36, 0.56, 0.75, 0.89, 0.97, 1]

  for (var i = 0; i < size; i++) {
    const r = Math.random()
    let numHint = pNumHint.map((p, i) => r < p? i+1: null).filter((e) => e !== null)[0] || 1

    hintList[i] = numHint
    totalHint -= numHint
  }

  return fixHint(hintList, totalHint)
}

const randomCellinBlock = (row, col) => {
  const rRow = Math.floor(Math.random() * 3) + row * 3
  const rCol = Math.floor(Math.random() * 3) + col * 3

  return { r: rRow, c: rCol }
}

const getRandomHint = (fSudoku) => { 
  let hintList = randomNumHintPerBlock()
  
  if(hintList){
    // console.log(hintList)
    
    var block = 0
    while(block < 9) {
      const row = Math.floor(block / 3)
      const col = block % 3

      const { r, c } = randomCellinBlock(row, col)
      if (fSudoku[r][c] !== 0) {
        // console.log('in:', fSudoku[r][c], 'r,c',r,c, 'block', block, hintList[block])
        fSudoku[r][c] = 0
        hintList[block]++
      }

      if (9 - hintList[block] === 0) {
        block++
      }
    }
  }
  
  return fSudoku
}

const formatSudoku = (sudoku) => {
  const fSudoku = {}

  for(var i = 0; i < Math.pow(size, 2); i++) {
    if (!fSudoku[Math.floor(i / size)]) {
      fSudoku[Math.floor(i / size)] = []
    }
    fSudoku[Math.floor(i / size)].push(sudoku[i])
  }

  return fSudoku
}

const renderBoard = ({ sudoku, solution, fSudoku, updateStatus, sol }) => {
  return _.map(fSudoku, (row, i) => {
    return <Row key={i}>{
      row.map((c, j) => {
        updateStatus({ row: i, col: j, status: c === 0? false: true })

        return (
          <CellWrapper 
            key={j}
            bDivider={(parseInt(i)+1) % 3 === 0 && (parseInt(i) !== 8)}
            rDivider={(parseInt(j)+1) % 3 === 0 && (parseInt(j) !== 8)}
          >
            <Cell 
              blank={c === 0 && !sol} 
              value={solution[i][j]} 
              status={c !== 0} 
              row={i} 
              col={j}
              updateStatus={updateStatus}
            />
          </CellWrapper>
        )})
      }
    </Row>
  })
}

const Board = ({ sudoku, updateStatus }) => {
  const solution = formatSudoku(sudoku)
  const fSudoku = getRandomHint(_.clone(solution))

  return <div style={{ display: 'flex'}}> <div>{renderBoard({ solution: formatSudoku(sudoku), fSudoku, updateStatus })}</div>
    <div style={{ marginLeft: '30px'}}>{renderBoard({ solution: formatSudoku(sudoku), fSudoku, updateStatus, sol: true })}</div></div>
}

export default withStateHandlers(
  () => ({ 
    done: false,
    status: [[],[],[],[],[],[],[],[],[]]
   }),
  {
    updateStatus: ({ status }) => ({ row, col, status: uStatus }) => {
      const newStatus = status
      newStatus[row][col] = uStatus

      return { status: newStatus, done: checkEndGame(newStatus) }
    }
  }
)(Board)