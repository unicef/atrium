import React from 'react'
import Typography from '@material-ui/core/Typography'
import { BadgesList } from '../../../molecules'
import Grid from '@material-ui/core/Grid'
import { Button } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  header: {
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  points: {
    color: '#15B54A'
  },
  earnSection: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center'
  }
}))

function Badges({balance, badges}) {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Grid container spacing={5}>
      <Grid item container spacing={5} className={classes.header}>
        <Typography variant="h3">Badges</Typography>
        <Typography variant="subtitle1" className={classes.points}>
          Balance {509} points
        </Typography>
      </Grid>
      <Grid item container spacing={5}>
        <Typography variant="h5">Badges you've earned</Typography>
        <BadgesList start={0} end={3} />
      </Grid>
      <Grid item container spacing={5}>
        <Typography variant="h5">Badges to earn</Typography>
        <Grid item xs={12} className={classes.earnSection}>
          <Typography variant="body1">
            In order to earn badges, complete tasks in the directed learning
            section.
          </Typography>
          <Button onClick={() => history.push('/learn')} color="primary">Earn badges</Button>
        </Grid>
        <BadgesList start={3} end={7} />
      </Grid>
    </Grid>
  )
}

export default Badges
