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
  return status.filter((row, i) => {
    return row.filter((c) => c === false).length > 0
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
  
  if (hintList) {
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

class Board extends React.Component {
  constructor(props) {
    super()

    const { sudoku } = props
    this.state = this.initState(sudoku)
  }


  initState = (sudoku) => {
    const status = []
    const fSudoku = getRandomHint(formatSudoku(sudoku)) 
    for(var i = 0; i < 9; i++) {
      status[i] = []
      for(var j = 0; j < 9; j++) {
        status[i][j] = fSudoku[i][j] !== 0
      }
    }
    console.log('init b', status)
    return { 
      status, 
      done: false, 
      current: null, 
      solution: formatSudoku(sudoku),
      fSudoku
    }
  }

  checkCell = (r, c) => {
    const { solution, current, status } = this.state
    let isSameRolCol = false
    let isSameNum = false

    if (current) {
      const { row, col, value } = current
      isSameRolCol = row === r || col === c
      isSameNum = (value === solution[r][c]) && status[r][c] && status[row][col]
    }

    return { isSameRolCol, isSameNum }
  }

  isDivider = (num) => {
    return (num + 1) % 3 === 0 && (num !== 8)
  }

  updateStatus = (row, col) => (status) => {
    const newStatus = this.state.status
    newStatus[row][col] = status
    
    this.setState({ status: newStatus, done: checkEndGame(newStatus) })
  }

  updateSelect = (row, col, value) => () => {
    this.setState({ current: { row, col, value }})
  }

  renderBoard = (sol = false) => {
    const { sudoku } = this.props
    const { solution, fSudoku, status, current } = this.state

    return _.map(fSudoku, (row, i) => {
      return <Row key={i}>{
        row.map((val, j) => {  
          const r = parseInt(i)
          const c = parseInt(j)
          const { isSameRolCol, isSameNum } = this.checkCell(r, c)

          return (
            <CellWrapper 
              key={j}
              bDivider={this.isDivider(r)}
              rDivider={this.isDivider(c)}
            >
              <Cell 
                blank={val === 0 && !sol} 
                value={solution[i][j]} 
                isSameRolCol={isSameRolCol}
                isSameNum={isSameNum}
                updateSelect={this.updateSelect(r, c, solution[r][c])}
                updateStatus={sol? null: this.updateStatus(r, c)}
              />
            </CellWrapper>
          )})
        }
      </Row>
    })
  }

  render() {
    const { sudoku } = this.props
    const { done } = this.state
    const solution = formatSudoku(sudoku)
    const fSudoku = getRandomHint(_.clone(solution))

    return <div> 
      {!done? <div style={{ display: 'flex'}}>
        <div style={{ marginRight: '30px'}}>{this.renderBoard(true)}</div>
        <div>{this.renderBoard()}</div>
      </div>: 'Finishhhhhhhhhhh'}
      </div>
  }
}

export default Board