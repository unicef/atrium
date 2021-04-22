import React from 'react'
import { createMuiTheme, withStyles } from '@material-ui/core'
import MaterialButton from '@material-ui/core/Button'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import classnames from 'classnames'

import { colors } from '../theme'
import { composeMargins } from '../utils'

const defaultTheme = createMuiTheme({
  ...colors,
  palette: {
    default: {
      main: colors['warg-gray'],
      contrastText: colors['white']
    },
    primary: {
      main: colors['shamrock-green'],
      contrastText: colors['white']
    },
    secondary: {
      main: colors['white'],
      contrastText: colors['shamrock-green']
    }
  }
})

const largeBtnTheme = createMuiTheme({
  ...colors,
  palette: {
    primary: {
      main: '#454545',
      contrastText: colors['white']
    }
  }
})

const useStyles = makeStyles(theme => ({
  root: props => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: 13,
    fontWeight: 500,
    padding: 15,
    textTransform: 'none',
    lineHeight: 1.3,
    ...composeMargins(props),
    maxHeight: 51,
    '&:disabled': {
      color: theme.colors['white'],
      backgroundColor: theme.colors['warm-gray']
    }
  }),
  outlined: {
    letterSpacing: 1,
    color: theme.colors['shamrock-green'],
    borderWidth: 1.2,
    borderColor: theme.colors['shamrock-green'],
    borderRadius: 3,
    textTransform: 'none'
  },
  sizeMini: {
    padding: '7px 14px',
    fontSize: 11,
    letterSpacing: 0.83
  },
  sizeSmall: {
    padding: '9px 21px'
  },
  sizeLarge: {
    letterSpacing: 1,
    borderRadius: 0
  },
  primary: {
    '&:active': {
      backgroundColor: '#00a43c'
    }
  },
  secondary: {
  },
  full: props => ({
    maxHeight: 51,
    color: theme.colors[props.labelColor],
    width: '100%'
  })
}))

export const Button = ({
  type,
  onClick,
  children,
  size,
  className,
  ...props
}) => {
  const classes = useStyles(props)

  const buttonClassName = classnames(className || '', {
    [classes.sizeMini]: size === 'mini',
    [classes.isSmall]: size === 'small',
    [classes.full]: size === 'full',
    [classes.outlined]: props.variant === 'outlined',
    [classes.primary]: props.color === 'primary',
    [classes.secondary]: props.color === 'secondary'
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <MaterialButton
        className={buttonClassName}
        type={type}
        onClick={onClick}
        classes={{
          root: classes.root
        }}
        disableElevation
        {...props}
      >
        {children}
      </MaterialButton>
    </ThemeProvider>
  )
}

export const LargeButton = ({ type, onClick, children, ...props }) => {
  const classes = useStyles()

  const isLarge = props.size === 'large' ? classes.sizeLarge : ''
  const isOutlined = props.variant === 'outlined' ? classes.outlined : ''

  return (
    <ThemeProvider theme={largeBtnTheme}>
      <MaterialButton
        className={`${classes.root} ${isOutlined} ${isLarge}`}
        type={type}
        onClick={onClick}
        classes={{
          root: classes.root
        }}
        {...props}
        disableElevation
      >
        {children}
      </MaterialButton>
    </ThemeProvider>
  )
}

const fabButtonStyles = theme => ({
  fab: {
    position: 'fixed',
    top: 87,
    right: 44
  },
  root: {
    height: 34,
    '&:hover': {
      backgroundColor: '#33d76f'
    },
    '&:active': {
      backgroundColor: '#00a43c'
    }
  }
})

export const FabButton = withStyles(fabButtonStyles)(
  ({ children, className, classes, ...props }) => {
    const buttonClassName = classnames(classes.fab, {
      [className]: !!className
    })
    return (
      <MaterialButton
        color="primary"
        variant="contained"
        classes={{ root: classes.root }}
        className={buttonClassName}
        disableElevation
        {...props}
      >
        {children}
      </MaterialButton>
    )
  }
)

Button.defaultProps = {
  type: 'button',
  children: 'Button',
  variant: 'contained'
}

LargeButton.defaultProps = {
  type: 'button',
  children: 'Button',
  variant: 'contained',
  color: 'primary'
}
