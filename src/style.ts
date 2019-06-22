import {ThemeInterface} from './helpers/styled'

let isDesktop = false
if (typeof document !== 'undefined') {
  if (window.innerWidth > 700) {
    isDesktop = true
  }
}

const theme: ThemeInterface = {
  primaryColor: '#e63e2e',
}

export {theme, isDesktop}
