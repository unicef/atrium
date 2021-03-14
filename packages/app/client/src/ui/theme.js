import { createMuiTheme } from '@material-ui/core/styles'

export const colors = {
  'shamrock-green': 'rgb(1, 206, 75)', // #01ce4b
  'dark-shamrock-green': 'rgb(0,164,60)', // #00a43c
  'light-shamrock-green': 'rgb(51,215,111)', // #33d76f
  'light-green': 'rgb(240, 255, 245)', //  #f0fff5
  'deep-green': 'rgb(0, 91, 33)', // #005b21
  'dark-forest-green': 'rgb(0, 47, 17)', // #002f11
  'dark-forest-green-two': 'rgb(0, 59, 21)', // #003b15
  white: 'rgb(255, 255, 255)', // #fff
  black: 'rgb(0, 0, 0)', // #000
  'black-two': 'rgb(53, 53, 53)', // #353535
  'warm-gray': 'rgb(151, 151, 151)', // #979797
  'light-gray': 'rgb(229,229,229)', // #E5E5E5
  watermelon: 'rgb(253, 69, 91)', // #fd455b
  'white-smoke': 'rgb(248,248,248)' // #F5F5F5
}

export const theme = createMuiTheme({
  colors,
  palette: {
    default: {
      main: `${colors['white']} !important`
    },
    primary: {
      main: colors['shamrock-green'],
      dark: colors['dark-shamrock-green'],
      light: colors['light-shamrock-green'],
      contrastText: colors['white']
    },
    secondary: {
      main: colors['dark-forest-green']
    },
    text: {
      secondary: colors['deep-green']
    }
  },
  typography: {
    fontFamily: ['Red Hat Display', 'Roboto', 'sans-serif'].join(','),
    h5: {
      fontSize: 21,
      textTransform: 'none',
      '@media (max-width: 600px)': {
        fontSize: 18
      }
    },
    h4: {
      fontSize: 32,
      lineHeight: 1.34,
      textTransform: 'none',
      '@media (max-width: 600px)': {
        fontSize: 26
      }
    },
    h3: {
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: 1.6,
      textTransform: 'none'
    },
    h2: {
      fontWeight: 'bold',
      fontSize: 43,
      lineHeight: 1.4,
      textTransform: 'none'
    },
    h1: {
      fontSize: 58,
      lineHeight: 0.93,
      textTransform: 'none',
      '@media (max-width: 600px)': {
        fontSize: 42
      }
    },
    body2: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      textTransform: 'none',
      fontWeight: 500
    },
    body1: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      textTransform: 'none',
      letterSpacing: 'normal'
    },
    subtitle1: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      fontSize: 15,
      lineHeight: 1.4,
      fontWeight: 600
    },
    subtitle2: {
      fontFamily: ['Red Hat Display', 'Roboto', 'sans-serif'].join(','),
      fontSize: 12,
      letterSpacing: 0.8,
      color: colors['black']
    },
    caption: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      fontSize: 12,
      lineHeight: '24px'
    }
  }
})

// set a global var to check at any time from the browser console
window.theme = theme

export const globalStyles = () => ({
  '@global': {
    html: {
      boxSizing: 'border-box'
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit'
    },
    body: {
      margin: '0 !important'
    },
    '#root': {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    main: {
      flex: 1,
      paddingTop: 50,
      paddingBottom: 50
    }
  }
})
