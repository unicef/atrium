import React from 'react'
import Fade from '@material-ui/core/Fade'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { showFullPageLoader } from '../../selectors'

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(188,190,190, 0.4)',
    zIndex: 101,
    height: 'auto'
  },
  progress: {
    position: 'fixed',
    width: '100%'
  }
})

const FullPageLoader = () => {
  const classes = useStyles()
  const shouldShowLoader = useSelector(showFullPageLoader)

  return (
    <Fade in={shouldShowLoader}>
       <div className={classes.container}>
          <LinearProgress className={classes.progress} />
        </div>
    </Fade>
  )
}

export default FullPageLoader
