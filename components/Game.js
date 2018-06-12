import React from 'react'
import $ from 'jquery'
import Generator from './Generator'

const Game = () => {
  const sudoku = new Generator()
  console.log(sudoku)
  
  return <div>Game</div>
}

export default Game