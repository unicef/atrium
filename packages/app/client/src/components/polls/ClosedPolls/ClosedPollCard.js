import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50
  },
  titleOfPoll: {
    fontSize: 23,
    marginBottom: 25
  },
  choisesList: {
    marginBottom: 21
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 22,
    '&:last-child': {
      marginBottom: 41
    }
  },
  percentRow: {
    display: 'flex',
    alignItems: 'center'
  },
  colorLine: {
    position: 'relative',
    height: 1,
    width: '100%',
    backgroundColor: theme.colors['shamrock-green'],
    '&:after': {
      position: 'absolute',
      content: '""',
      top: -4,
      left: 0,
      height: 8,
      width: props => `${props.width}%`,
      backgroundColor: theme.colors['shamrock-green'],
      borderRadius: 8
    }
  },
  value: {
    marginBottom: 15
  },
  percentValue: {
    marginLeft: 14
  },
  details: {
    display: 'flex',
    justifyContent: 'center',
    padding: 14,
    borderTop: '1px solid #aeaeae',
    borderBottom: '1px solid #aeaeae'
  },
  detailsText: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamily,
    letterSpacing: 0.8,
    textTransform: 'uppercase'
  }
}))

const ChoiseRow = ({ votes, value, voters }) => {
  const classes = useStyles({ width: !votes ? 0 : (100 * votes) / voters })

  const percentageValue = Math.round(((!votes ? 0 : votes) / voters) * 100)
  return (
    <div className={classes.row}>
      <Typography component="span" variant="body1" className={classes.value}>
        {value}
      </Typography>
      <div className={classes.percentRow}>
        <span className={classes.colorLine} />
        <Typography
          component="span"
          variant="body1"
          className={classes.percentValue}
        >
          {percentageValue}%
        </Typography>
      </div>
    </div>
  )
}

const ClosedPollCard = ({ topic, choices }) => {
  const classes = useStyles()

  const totalNumberOfVoters = choices.reduce((prev, current, index) => {
    if (current.votes) {
      return prev + current.votes
    }
    return prev
  }, 0)

  const choisesListView = choices.map((obj, k) => (
    <ChoiseRow voters={totalNumberOfVoters} key={k} {...obj} />
  ))

  return (
    <Grid className={classes.root}>
      <Typography component="p" variant="h5" className={classes.titleOfPoll}>
        {topic}
      </Typography>
      <div>{choisesListView}</div>
      <Divider />
    </Grid>
  )
}

ClosedPollCard.propTypes = {
  topic: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ClosedPollCard
