import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import {Image} from "../atoms";

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

function Badge({ badge, level, last, img, title }) {
  const classes = useStyles()

  return (
    <Grid
      container
      item
      xs={12}
      className={[classes.badge, last ? null : classes.line].join(' ')}
    >
      <Grid item xs={1}>
        <Image height="62px" width="62px" src={img} />
      </Grid>
      <Grid item xs={11}>
        <Typography variant="subtitle1">Level {level} Badge</Typography>
        <Typography className={classes.points} variant="body1">
          {title} ({badge} points)
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Badge
