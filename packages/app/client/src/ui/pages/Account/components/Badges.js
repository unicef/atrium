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

function Badges({ balance, badges }) {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Grid container spacing={5}>
      <Grid item container spacing={5} className={classes.header}>
        <Typography variant="h3">Badges</Typography>
        <Typography variant="subtitle1" className={classes.points}>
          {balance} points earned
        </Typography>
      </Grid>
      <Grid item container>
        <Typography variant="body1">
          Certain activities on the platform give you points: project creations, becoming a member of a project, likes and comments.
        </Typography>
      </Grid>
      <Grid item container spacing={5}>
        <Typography variant="h5">Badges you've earned</Typography>
        <BadgesList start={0} end={badges} earned={true} />
      </Grid>
      <Grid item container spacing={5}>
        <Typography variant="h5">Badges to earn</Typography>
        <Grid item xs={12} className={classes.earnSection}>
          <Typography variant="body1">
            In order to earn badges, complete tasks in the directed learning
            section.
          </Typography>
          <Button onClick={() => history.push('/projects')} color="primary">
            Earn badges
          </Button>
        </Grid>
        <BadgesList start={badges} end={7} earned={false} />
      </Grid>
    </Grid>
  )
}

export default Badges
