import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    position: 'relative'
  },
  loader: props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 1s',
    backgroundColor: 'rgba(188,190,190, 0.3)',
    opacity: props.imageLoaded ? 0 : 1,
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: props.mediaBorderRadius
  })
})

const MediaLoader = ({ children, ...props }) => {
  const classes = useStyles(props)

  return (
    <div className={classes.container}>
      {children}
      {!props.imageLoaded && <div className={classes.loader}><CircularProgress /></div>}
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
