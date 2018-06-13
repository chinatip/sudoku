import React from 'react'
import $ from 'jquery'
import { withStateHandlers } from 'recompose'

import Generator from './Generator'
import Board from './Board'

const Game = ({ isEnd, updateIsEnd }) => {
  const sudoku = new Generator()

  return isEnd ? <div>finish</div>: <Board sudoku={sudoku} updateIsEnd={updateIsEnd} />
}

export default withStateHandlers(
  ({}) => ({ isEnd: false }),
  {
    updateIsEnd: ({ isEnd }) => (status) => {
      return { isEnd: status }
    }
  }
)(Game)