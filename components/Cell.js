import React from 'react'
import styled from 'styled-components'
import { withStateHandlers } from 'recompose'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.isSameRolCol && 'background: grey'};
  ${props => props.isSameNum && 'background: blue'};
`

const Label = styled.div`
  font-weight: bold;
`

const Input = styled.input`
  width: 96%;
  height: 96%;
  text-align: center;
  border: none;
  background: none;
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
        updateStatus(parseInt(value) === parseInt(e.target.value))
      }

      return { input : e.target.value}
    },
  }
)(Cell)