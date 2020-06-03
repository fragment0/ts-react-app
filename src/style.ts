import {DefaultTheme} from 'styled-components'

let isDesktop = false
if (typeof document !== 'undefined') {
  if (window.innerWidth > 700) {
    isDesktop = true
  }
}

const theme: DefaultTheme = {
  primaryColor: '#f00',
}

export {theme, isDesktop}
