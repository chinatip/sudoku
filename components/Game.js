import React from 'react'
import $ from 'jquery'
import styled from 'styled-components'
import { lifecycle, withStateHandlers, compose } from 'recompose'

import Generator from './Generator'
import Board from './Board'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-39deg,#349cfc -13%,#15bcee 22%,#00e0dc 56%,#00eecb 80%);
`
const InnerContainer = styled.div`
  padding: 20px;
  text-align: center;
  background: rgba(150, 149, 149, 0.2);
  border-radius: 5px;
  border: 1px solid transparent;
  box-shadow: 0 4px 8px rgba(101, 101, 101, 0.28);
`
const Title = styled.div`
  font-family: 'Michroma', sans-serif;
  font-size: 46px;
  font-weight: 700;
  margin-bottom: 18px;
  color: white;
  text-shadow: 3px 2px rgba(128, 128, 128, 0.3);
  letter-spacing: 1px;
`
const Time = styled.div`
  margin-top: 40px;
  font-family: 'Michroma', sans-serif;
  color: white;
  font-size: 20px;
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
      <InnerContainer>
        <Title>Sudoku Game</Title>
        <Board sudoku={sudoku} updateIsEnd={updateIsEnd} />
        <Time>
          {`${time}s ${isEnd? '(Done)': ''}`}
        </Time>
      </InnerContainer>
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
      const { time, isEnd, updateTime } = this.props
      
      updateTime(0)
      this.interval = setInterval(() => {
        if (!isEnd) {
          updateTime(time + 1)
        }
      }, 1000)
    },
    componentWillUnmount() {
      clearInterval(this.interval)
    }
  })
)(Game)