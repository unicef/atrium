import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import AppBar from '@material-ui/core/AppBar'
// import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 50,
    background: 'transparent',
    boxShadow: 'none',
    fontFamily: ['Red Hat Display', 'sans-serif'].join(','),
    backgroundColor: 'white'
  },
  toolBar: {
    position: 'relative',
    minHeight: 50,
    display: 'flex',
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

const position = {
  position: 'absolute',
  right: 0,
  marginRight: 19
}

const LimitedHeader = ({
  title,
  titleProps,
  action,
  actionInlineStyle,
  classes
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
      position="fixed"
    >
      <Toolbar className={classes.toolBar}>
        {React.createElement(Typography, titleDefaultProps, title)}
        {action
          ? React.cloneElement(action, {
              style: { ...position, ...actionInlineStyle }
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

export default compose(React.memo, withStyles(styles))(LimitedHeader)
