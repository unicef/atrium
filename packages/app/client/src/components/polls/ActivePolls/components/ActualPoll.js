import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import RadioGroup from '@material-ui/core/RadioGroup'
import withStyles from '@material-ui/styles/withStyles'

import { RadioField, Button } from '../../../../ui'

const styles = theme => ({
  radioGroup: {},
  voteContainer: {
    marginTop: 17,
    marginBottom: 15,
    padding: '20px 0',
    borderTop: `1px solid ${theme.colors['warm-gray']}`,
    borderBottom: `1px solid ${theme.colors['warm-gray']}`,
    '& > button': {
      marginTop: 22,
      marginBottom: 7,
      width: 126,
      letterSpacing: 1
    }
  }
})

const ActualPoll = ({ classes, actualPoll, onVotePoll }) => {
  const [value, setValue] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  // clear value on CDM
  React.useEffect(() => {
    if (value) {
      setValue('')
    }
  }, [actualPoll])

  const handleChange = e => {
    setValue(String(e.target.value))
  }

  const handleVotePoll = () => {
    setLoading(true)
    onVotePoll(value, () => {
      setLoading(false)
    })
  }

  const choicesListView = actualPoll.choices.map((obj, k) => (
    <RadioField
      key={k}
      value={obj.value}
      label={obj.value}
      checked={obj.value === value}
    />
  ))

  return (
    <Grid>
      <Typography component="p" variant="h4" style={{ marginBottom: 25 }}>
        {actualPoll.topic}
      </Typography>
      <Typography component="span" variant="body2" style={{ fontWeight: 400 }}>
        Voting options
      </Typography>

      <div className={classes.voteContainer}>
        <RadioGroup
          aria-label={actualPoll.topic}
          name={actualPoll.topic}
          value={value}
          onChange={handleChange}
          className={classes.radioGroup}
        >
          {choicesListView}
        </RadioGroup>
        <Button
          type="button"
          color="primary"
          onClick={handleVotePoll}
          disabled={!value || loading}
        >
          Submit
        </Button>
      </div>
    </Grid>
  )
}

ActualPoll.propTypes = {
  actualPoll: PropTypes.shape({
    topic: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.object).isRequired
  })
}

export default withStyles(styles)(ActualPoll)
