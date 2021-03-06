import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'
import Navbar from './Navbar'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 50,
    background: 'transparent',
    boxShadow: 'none',
    fontFamily: theme.typography.fontFamily,
    backgroundColor: 'white'
  },
  toolBar: {
    position: 'relative',
    minHeight: 50,
    display: 'flex',
    padding: '0 !important'
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: 1.5,
    color: theme.colors['black']
  },
  logo: {
    background: theme.colors['shamrock-green'],
    padding: 11,
    maxWidth: 131,
    height: 50,
    marginRight: '1.3rem',
    position: 'absolute',
    left: 0
  }
})

const positionAbsolute = {
  position: 'absolute',
  right: 0,
  marginRight: 19
}

const LimitedHeader = ({
  title,
  titleProps,
  action,
  actionInlineStyle,
  classes,
  position
}) => {
  const titleDefaultProps = {
    variant: 'h5',
    className: classes.headerTitle,
    ...titleProps
  }

  return (
    <AppBar
      className={classes.root}
      square={true}
      elevation={0}
      color="default"
      position={position}
    >
      <Toolbar className={classes.toolBar}>
        <Typography {...titleDefaultProps}>{title}</Typography>
        <Box pl="86px">
          <Navbar />
        </Box>
        {action
          ? React.cloneElement(action, {
              style: { ...positionAbsolute, ...actionInlineStyle }
            })
          : null}
      </Toolbar>
    </AppBar>
  )
}

LimitedHeader.propTypes = {
  title: PropTypes.string.isRequired,
  titleProps: PropTypes.object,
  action: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired
}

LimitedHeader.defaultProps = {
  position: 'fixed'
}

export default compose(React.memo, withStyles(styles))(LimitedHeader)
