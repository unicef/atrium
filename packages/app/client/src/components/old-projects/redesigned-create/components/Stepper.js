import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  stepper: {
    marginTop: 13,
    display: 'flex',
    alignItems: 'center'
  },
  step: {
    display: 'flex',
    marginRight: 9,
    borderRadius: 50,
    width: 61,
    height: 1,
    backgroundColor: theme.colors['warm-gray']
  },
  active: {
    height: 3,
    backgroundColor: theme.colors['shamrock-green']
  }
}))

const Stepper = ({ activeStep }) => {
  const classes = useStyles()

  const steps = {
    1: (
      <>
        <span className={`${classes.step} ${classes.active}`} />
        <span className={`${classes.step}`} />
      </>
    ),
    2: (
      <>
        <span className={`${classes.step} ${classes.active}`} />
        <span className={`${classes.step} ${classes.active}`} />
      </>
    )
  }

  return (
    <div>
      <Typography component="p" variant="body1">
        Step {activeStep}/{Object.keys(steps).length}
      </Typography>

      <div className={classes.stepper}>{steps[activeStep]}</div>
    </div>
  )
}

export default Stepper
