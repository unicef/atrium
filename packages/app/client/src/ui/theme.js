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
  'black-three': 'rgb(32,38,37)', // #202625
  'warm-gray': 'rgb(151, 151, 151)', // #979797
  'light-gray': 'rgb(229,229,229)', // #E5E5E5
  'dark-gray': 'rgb(99,103,103)', // #636767
  'light-gray-two': 'rgb(188,190,190)', // #BCBEBE
  'light-gray-three': 'rgb(248,248,248)', //#F8F8F8
  watermelon: 'rgb(253, 69, 91)', // #fd455b
  'white-smoke': 'rgb(248,248,248)', // #F5F5F5
  'error': 'rgb(230, 50, 50)',//'#E63232'
  'blue-info': 'rgb(23, 143, 226)', //#178FE2,
  'section-bg': 'rgb(221,251,246)' //#DDFBF6
}

const MuiTheme = createMuiTheme({
  colors,
  overrides: {
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderWidth: '1.2px',
          borderColor: colors['light-gray-two']
        },
        "&:hover $notchedOutline": {
          borderColor: colors['black-two']
        },
        "&$focused $notchedOutline": {
          borderColor: colors['black-two'],
          borderWidth: '1.6px',
        },
        "&$error $notchedOutline": {
          borderColor: colors.error
        }
      }
    }
  },
  palette: {
    error: {
      main: colors.error
    },
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
      primary: colors['black-three'],
      secondary: colors['deep-green']
    }
  },
  typography: {
    fontFamily: 'Montserrat, Verdana, sans-serif',
    h1: {
      fontSize: 44,
      fontWeight: 700,
      lineHeight: 1.25
    },
    h2: {
      fontSize: 43,
      fontWeight: 700,
      lineHeight: 1.4,
      textTransform: 'none'
    },
    h3: {
      fontSize: 28,
      fontWeight: 700,
      lineHeight: 1.6,
      textTransform: 'none'
    },
    h4: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1.34,
      textTransform: 'none',
      '@media (max-width: 600px)': {
        fontSize: 26
      }
    },
    h5: {
      fontSize: 21,
      fontWeight: 600,
      textTransform: 'none',
      '@media (max-width: 600px)': {
        fontSize: 18
      }
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: 15,
      fontWeight: 400,
      lineHeight: 1.4,
      fontWeight: 600
    },
    subtitle2: {
      fontSize: 12,
      fontWeight: 600,
      color: colors['black']
    },
    body1: {
      fontWeight: 400,
      textTransform: 'none',
    },
    body2: {
      fontWeight: 600,
      textTransform: 'none',
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: '24px'
    }
  }
})

export const theme = createMuiTheme({
  ...MuiTheme,
  overrides: {
    MuiSelect: {
      root: {
        fontSize: MuiTheme.typography.body1.fontSize,
        paddingRight: MuiTheme.spacing(4),
      }
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
