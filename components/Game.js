import React from 'react'
import $ from 'jquery'
import styled from 'styled-components'
import { lifecycle, withStateHandlers, compose } from 'recompose'

import Generator from './Generator'
import Board from './Board'

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const ScoreBoard = styled.div`

`

const ScoreBoardCover = styled.div`
  witdth: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Game = ({ isEnd, time, f, updateIsEnd }) => {
  const sudoku = new Generator()

  return (
    <Container>
      <Board sudoku={sudoku} updateIsEnd={updateIsEnd} />
      <ScoreBoard>
        {time}
      </ScoreBoard>
    </Container>
  )     
}

export default compose(
  withStateHandlers(
    ({}) => ({ isEnd: false, time: 0 }),
    {
      updateIsEnd: ({ isEnd }) => (status) => {
        return { isEnd: status }
      },
      updateTime: ({ time }) => () => {
        return { time: time + 1 }
      }
    }
  ),
  lifecycle({
    componentDidMount() {
      const { time, updateTime } = this.props
      
      updateTime(0)
      this.interval = setInterval(() => {
        updateTime(time + 1)
      }, 1000)
    },
    componentWillUnmount() {
      clearInterval(this.interval)
    }
  })
)(Game)