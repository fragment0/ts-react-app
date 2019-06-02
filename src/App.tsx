import * as React from 'react'
import {EasyReactRouter} from 'easy-react-router'
import styled, {createGlobalStyle, ThemeProvider, ThemeInterface} from './styled'

const GlobalStyle = createGlobalStyle`
body, div, p {
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
}

body, input, button {
  font-family: sans-serif;
}

body, div {
  display: flex;
  flex-direction: column;
}
`

const Wrapper = styled.div`
`

const theme: ThemeInterface = {
  primaryColor: '#003bff',
}

export default class App extends React.Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>

          <EasyReactRouter
            alias={{
              '/': '/index',
            }}
            resolve={pageFolderName => import(/* webpackChunkName: "request" */ `./pages/${pageFolderName}/index`)}
          />

          <GlobalStyle />
        </Wrapper>
      </ThemeProvider>
    )
  }
}
