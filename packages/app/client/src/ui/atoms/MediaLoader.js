import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { mergeClassNames } from '../utils'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative'
  },
  loader: props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(188,190,190, 1)',
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: props.mediaBorderRadius
  }),
  animated: {
    animation: `$pulse 800ms ${theme.transitions.easing.easeInOut} infinite alternate`,
    opacity: 1,
  },
  "@keyframes pulse": {
    "0%": {
      opacity: 0.3,
    },
    "100%": {
      opacity: 0.6,
    }
  }
}))

const MediaLoader = ({ children, ...props }) => {
  const classes = useStyles(props)

  return (
    <div className={classes.container}>
      {children}
      {!props.imageLoaded && <div className={mergeClassNames(classes.loader, classes.animated)}></div>}
    </div>
  )
}

MediaLoader.defaultProps = {
  mediaBorderRadius: 5
}

MediaLoader.propTypes = {
  mediaBorderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageLoaded: PropTypes.bool.isRequired
}

export default MediaLoader
