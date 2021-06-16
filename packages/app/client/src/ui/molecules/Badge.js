import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  line: {
    borderBottom: '1px solid #E7E7E7'
  },
  badge: {
    alignItems: 'center'
  },
  points: {
    fontSize: '13px',
    marginTop: '10px'
  }
}))

function Badge({ badge, level, last }) {
  const classes = useStyles()

  return (
    <Grid
      container
      item
      xs={12}
      className={[classes.badge, last ? null : classes.line].join(' ')}
    >
      <Grid item xs={1}>
        {/* <Image />*/}
        img
      </Grid>
      <Grid item xs={11}>
        <Typography variant="subtitle1">Level {level} Badge</Typography>
        <Typography className={classes.points} variant="body1">
          {badge} Points
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Badge
