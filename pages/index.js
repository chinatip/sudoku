import React from 'react'
import styled, { injectGlobal, css } from 'styled-components'
import { media, mediaExceed } from '../utils/media-style'
import Game from '../components/Game'

const GlobalStyles = ({ theme }) => {
  injectGlobal `
    body, html {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
    }

    ${mediaExceed.medium`html { font-size: 20px; }`}
    ${mediaExceed.super`html { font-size: 1vw; }`}
    ${media.large`html { font-size: 16px; }`}
    ${media.medium`html { font-size: 16px; }`}
    ${media.small`html { font-size: 14px; }`}
    ${media.mobile`html { font-size: 12px; }`}
    ${media.small_mobile`html { font-size: 10px; }`}
  `
  return null
}

class Index extends React.Component {  
  render() {     
    return (
      <div>
        Hello Sudoku
        <Game />
      </div>
    )
  }
} 

export default Index