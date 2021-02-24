import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/styles/withStyles'

import AccessTime from '@material-ui/icons/AccessTime'
import HowToVote from '@material-ui/icons/HowToVote'
import PersonOutline from '@material-ui/icons/PersonOutline'

const styles = theme => ({
  root: {
    marginTop: 15,
    marginBottom: 13
  },
  textElement: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
    '&:not(:last-child)': {
      marginRight: 30
    }
  },
  icon: {
    maxHeight: 14
  },
  floatingValue: {
    color: theme.colors['dark-forest-green']
  }
})

const timeConversion = millisec => {
  const minutes = Math.round((millisec / (1000 * 60)).toFixed(1))
  const hours = Math.round((millisec / (1000 * 60 * 60)).toFixed(1))
  const days = Math.round((millisec / (1000 * 60 * 60 * 24)).toFixed(1))

  if (minutes < 60) {
    return minutes + ' mins'
  } else if (hours < 24) {
    return hours + ' hrs'
  }
  return days + ' days'
}

const ActualPollInfo = ({ classes, actualPoll }) => {
  const author = 'The Atrium'
  const votesCount = actualPoll.voters.length

  const getCloseTime = () => {
    const end = new Date(actualPoll.expiryTime).getTime()
    const now = new Date().getTime()
    const diff = end - now

    return timeConversion(diff)
  }

  return (
    <Grid container item className={classes.root}>
      <Typography
        component="p"
        variant="subtitle1"
        className={classes.textElement}
      >
        <AccessTime className={classes.icon} />
        Poll closes in&nbsp;
        <span className={classes.floatingValue}>{getCloseTime()}</span>
      </Typography>
      <Typography
        component="p"
        variant="subtitle1"
        className={classes.textElement}
      >
        <HowToVote className={classes.icon} />
        Votes casted by&nbsp;
        <span className={classes.floatingValue}>{votesCount} users</span>
      </Typography>
      <Typography
        component="p"
        variant="subtitle1"
        className={classes.textElement}
      >
        <PersonOutline className={classes.icon} />
        Poll created by&nbsp;
        <span className={classes.floatingValue}>{author}</span>
      </Typography>
    </Grid>
  )
}

ActualPollInfo.propTypes = {
  actualPoll: PropTypes.object.isRequired
}

export default withStyles(styles)(ActualPollInfo)
