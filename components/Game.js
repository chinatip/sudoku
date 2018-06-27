import React from 'react'
import $ from 'jquery'
import styled from 'styled-components'
import { lifecycle, withStateHandlers, compose } from 'recompose'

import { generate } from './Generator'
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
  background: rgba(150, 149, 149, 0.1);
  border-radius: 5px;
  border: 1px solid transparent;
  box-shadow: 2px 4px 8px rgba(101, 101, 101, 0.28);
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

const formatTime = (time) => {
  const h = Math.floor(time / 3600)
  const m = Math.floor((time - (h * 3600)) / 60)
  const s = time - (m * 60) - (h * 3600)

  return (h > 0? `${h < 10? '0' + h: h}:`: '') + `${m < 10? '0' + m: m}:${s < 10? '0' + s: s}`
}

const Game = ({ sudoku, isEnd, time, f, showSol, updateIsEnd, updateShowSol, reset }) => {
  return (
    <Container>
      <InnerContainer>
        <Title>Sudoku Game</Title>
        <button onClick={updateShowSol}>{!showSol? 'Show solution': 'Hide Solution'}</button>
        <button onClick={reset}>reset</button>
        <Board sudoku={sudoku} updateIsEnd={updateIsEnd} showSol={showSol} />
        <Time>
          { !isEnd ? formatTime(time): `Done: ${formatTime(time)}`}
        </Time>
      </InnerContainer>
    </Container>
  )     
}

export default compose(
  withStateHandlers(
    ({}) => ({ 
      isEnd: false, 
      time: 0, 
      showSol: false, 
      sudoku: generate()
    }),
    {
      updateIsEnd: ({ isEnd }) => (status) => {
        return { isEnd: status }
      },
      updateTime: ({ time, isEnd }) => () => {
        if (isEnd) {
          return { time }
        }
        return { time: time + 1 }
      },
      updateShowSol: ({ showSol }) => () => { 
        return { showSol: !showSol }
      },
      reset: () => () => ({ 
        isEnd: false, 
        time: 0, 
        sudoku: generate()
      })
    }
  ),
  lifecycle({
    componentDidMount() {
      const { time, isEnd, updateTime } = this.props
      
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