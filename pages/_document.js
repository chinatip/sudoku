// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import { ServerStyleSheet } from 'styled-components'

const Script = ({children}) => (
  <script dangerouslySetInnerHTML={{__html: `(${children.toString()})();` }}></script>
)

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()

    return (
      <html prefix="og: http://ogp.me/ns#">
       <Head>         
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <meta property="og:title" content="Sudoku" />
          <meta property="og:description" content="Sudoku" />
          <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
          <meta name="title"              content="Sudoku" />
          <link rel="icon" href="/public/favicon.png" /> 
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.css"/>
          <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
          {/* <link rel="stylesheet" href="/public/antd.min.css" /> */}
          <title>Sudoku</title>
          <script src="https://unpkg.com/react@15.5.0/dist/react.min.js"></script>
          <script src="https://unpkg.com/react-dom@15.5.0/dist/react-dom.min.js"></script>
          {styleTags}
       </Head>
       <body>
         <div id="root">
          {main}
         </div>
         <NextScript />
       </body>
     </html>
    )
  }
}