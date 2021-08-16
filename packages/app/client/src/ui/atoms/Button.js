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
  root: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
    fontWeight: 600,
    padding: theme.spacing(2, 3),
    textTransform: 'none',
    lineHeight: 1.2,
    '&:disabled': {
      color: theme.colors['white'],
      backgroundColor: theme.colors['warm-gray']
    }
  },
  outlined: {
    color: theme.colors['shamrock-green'],
    borderWidth: 1.2,
    borderColor: theme.colors['shamrock-green'],
    borderRadius: 3,
    textTransform: 'none'
  },
  sizeMini: {
    padding: theme.spacing(1, 2),
    fontSize: 11
  },
  sizeSmall: {
    padding: theme.spacing(1.5, 2.5)
  },
  sizeLarge: {
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
    color: theme.colors[props.labelColor],
    width: '100%'
  }),
  zeroMinWidth: {
    minWidth: 0
  }
}))

export const Button = ({
  type,
  onClick,
  children,
  size,
  className,
  disabled,
  zeroMinWidth,
  ...props
}) => {
  const classes = useStyles(props)

  const buttonClassName = classnames(className || '', {
    [classes.sizeMini]: size === 'mini',
    [classes.isSmall]: size === 'small',
    [classes.full]: size === 'full',
    [classes.outlined]: props.variant === 'outlined',
    [classes.primary]: props.color === 'primary',
    [classes.secondary]: props.color === 'secondary',
    [classes.zeroMinWidth]: zeroMinWidth
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <MaterialButton
        className={buttonClassName}
        type={type}
        onClick={onClick}
        disabled={disabled}
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
  variant: 'contained',
  zeroMinWidth: false
}

LargeButton.defaultProps = {
  type: 'button',
  children: 'Button',
  variant: 'contained',
  color: 'primary'
}
