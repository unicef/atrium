import React from 'react'
import Grow from '@material-ui/core/Grow'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  talkbubble: {
    width: 273,
    height: 113,
    background: theme.colors['blue-info'],
    position: 'relative',
    borderRadius: '5px',
    left: 100,
    '@media (max-width: 1024px)': {
      right: 0,
      left: 0
    }
  },
  triangle: {
    position: 'absolute',
    left: -15,
    top: 0,
    width: 0,
    height: 0,
    borderTop: `30px solid ${theme.colors['blue-info']}`,
    borderLeft: '30px solid transparent',
    borderRight: '30px solid transparent',
    '@media (max-width: 1024px)': {
      left: '45%',
      right: 0,
      top: -15,
      borderTop: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderBottom: `20px solid ${theme.colors['blue-info']}`
    }
  },
  container: {
    position: 'absolute',
    right: -200,
    top: 20,
    '@media (max-width: 1024px)': {
      display: 'flex',
      left: 0,
      right: 0,
      top: 100,
      justifyContent: 'center'
    }
  }
}))

const PasswordInfoBubble = () => {
  const classes = useStyles()

  return (
    <Grow in={true} timeout={{ enter: 500 }}>
      <div className={classes.container}>
        <div className={classes.talkbubble}>
          <div className={classes.triangle} />
          
        </div>
      </div>
    </Grow>
  )
}

export default PasswordInfoBubble
