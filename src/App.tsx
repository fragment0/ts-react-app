import React from 'react'
import {EasyReactRouter} from 'easy-react-router'
import styled, {createGlobalStyle, ThemeProvider, ThemeInterface} from './helpers/styled'
import {theme} from './style'

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

interface AppProps {
  initLocation?: string,
}

export default class App extends React.Component<AppProps> {
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
