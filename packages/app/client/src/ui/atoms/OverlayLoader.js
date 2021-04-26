import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => 
  ({
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
      height: 'auto',
      [theme.breakpoints.down("md")]: {
        height: '100%',
      }
    },
    progress: {
      width: '100%'
    }
  })
)

const OverlayLoader = ({ isLoading }) => {
  const classes = useStyles()

  return (
    <Fade in={isLoading}>
       <div className={classes.container}>
          <LinearProgress className={classes.progress} />
        </div>
    </Fade>
  )
}

export default OverlayLoader
