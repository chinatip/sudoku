import React from 'react'
import $ from 'jquery'
import Generator from './Generator'
import Board from './Board'

const size = 9
const Game = () => {
  const sudoku = new Generator()

  return <Board sudoku={sudoku} size={size} />
}

export default Game