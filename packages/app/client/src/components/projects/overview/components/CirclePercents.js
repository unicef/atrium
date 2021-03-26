import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const useDefaultStyles = makeStyles(() => ({
  circle: {
    margin: '0 5%'
  },
  text: {
    marginLeft: '-69px',
    fontSize: '13px',
    textAlign: 'center',
    width: '40px'
  }
}))

function CirclePercents(props) {
  const classes = useDefaultStyles()

  return (
    <>
      <CircularProgress
        size={52}
        variant="determinate"
        value={props.value}
        className={classes.circle}
      />
      <Typography variant="body1" className={classes.text}>
        {props.update ? `${props.text}` : `${props.text}%`}
      </Typography>
    </>
  )
}

export default CirclePercents
