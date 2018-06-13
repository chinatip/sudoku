import React from 'react'
import styled from 'styled-components'
import { withStateHandlers } from 'recompose'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.21);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 2px;
  ${props => props.isSameRolCol && 'background: rgba(255, 255, 255, 0.43)'};
  ${props => props.isSameNum && 'background: rgba(106, 106, 173, 0.33)'};
`

const Label = styled.div`
  font-weight: bold;
  font-family: 'Open Sans', sans-serif;
  color: white;
`

const Input = styled.input`
  width: 96%;
  height: 96%;
  font-size: 16px;
  text-align: center;
  border: none;
  background: none;
  font-family: 'Open Sans', sans-serif;
  color: white;
  ${props => props.incorrect && 'color: red'};
`

const Cell = ({ value, input, blank, isSameRolCol, isSameNum, updateInput, updateSelect }) => {
  return (
    <Container onClick={updateSelect} isSameRolCol={isSameRolCol} isSameNum={isSameNum}>
      { blank? <Input onChange={updateInput} incorrect={input !== '' && parseInt(value) !== parseInt(input)}/>: 
          <Label>{value}</Label> 
      }
    </Container>
  )
}

export default withStateHandlers(
  () => ({ input: '' }),
  {
    updateInput: ({ input }, { value, updateStatus }) => (e) => {
      if (updateStatus) {
        updateStatus(value === parseInt(e.target.value))
      }

      return { input : e.target.value}
    },
  }
)(Cell)