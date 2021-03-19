import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import Box from '@material-ui/core/Box'
import withStyles from '@material-ui/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import ActualPoll from './components/ActualPoll'
import ActualPollNav from './components/ActualPollNav'
import ActualPollInfo from './components/ActualPollInfo'
import { getActivePolls, voteOnActivePoll } from '../../../actions/pollActions'

const styles = theme => ({
  main: {
    marginTop: 66,
    marginBottom: 193
  },
  pollWrapper: {
    padding: '30px 68px',
    backgroundColor: 'white',
    borderRadius: 5,
    '@media (max-width: 600px)': {
      padding: '30px 20px'
    }
  },
  noPolls: {
    marginTop: 20,
    fontFamily: ['Red Hat Display', 'sans-serif'].join(','),
    fontSize: '24px',
    fontWeight: 500,
    letterSpacing: '1.8px',
    textAlign: 'center'
  }
})

/**
 * filter polls if not completed and if the user did not vote
 *
 * @param {*} { userName, list }
 * @returns {object[]}
 */
const filterPollList = ({ userId, list }) => {
  if (!list || list.length <= 0) {
    return list
  }

  return list.reduce((acc, obj) => {
    const isCompleted = obj.completed
    const hasCurrentUserVote = obj.voters.includes(userId)

    if (!isCompleted && !hasCurrentUserVote) {
      acc.push(obj)
    }
    return acc
  }, [])
}

const ActivePolls = ({
  classes,
  pollList,
  voters,
  completed,
  loadPolls,
  voteOnActivePoll,
  userId,
  ...props
}) => {
  const [actualPoll, setActualPoll] = React.useState(null)
  const [actualIndex, setActualIndex] = React.useState(0)

  React.useEffect(() => {
    loadPolls()
  }, [loadPolls])

  React.useMemo(() => {
    const poll = pollList.find((obj, index) => actualIndex === index)
    setActualPoll(poll)
  }, [pollList, actualIndex])

  const handleNextPoll = () => {
    if (actualIndex < pollList.length) {
      setActualIndex(prev => prev + 1)
    }
  }

  const handlePrevPoll = () => {
    if (actualIndex > 0) {
      setActualIndex(prev => prev - 1)
    }
  }

  const handleVotePoll = async (choice, cb) => {
    console.log(props)
    const pollId = actualPoll._id
    const formData = { choice, user: userId, address: props.address }

    try {
      await voteOnActivePoll(pollId, formData)
      loadPolls()
      setActualIndex(0)
    } catch (error) {
      console.warn(error)
    } finally {
      cb() // callback. set btn status loading -false
    }
  }

  if (!actualPoll) {
    return (
      <Typography className={classes.noPolls}>
        There are currently no active polls on The Atrium
      </Typography>
    )
  }
  return (
    <div>
      <Box className={classes.main}>
        <ActualPollNav
          actualIndex={actualIndex}
          count={pollList.length}
          onNext={handleNextPoll}
          onPrev={handlePrevPoll}
        />
        <div className={classes.pollWrapper}>
          <ActualPoll actualPoll={actualPoll} onVotePoll={handleVotePoll} />
          <ActualPollInfo actualPoll={actualPoll} />
        </div>
      </Box>
    </div>
  )
}

ActivePolls.propTypes = {
  pollList: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string,
      choises: PropTypes.arrayOf(PropTypes.object)
    })
  ),
  voters: PropTypes.array.isRequired,
  completed: PropTypes.bool.isRequired
}

ActivePolls.defaultProps = {
  pollList: [],
  voters: [],
  completed: false
}

const mapStateToProps = ({ auth, poll }) => {
  const userId = auth.user.id
  const pollList = filterPollList({ userId, list: poll.activePolls })

  const address = auth.user.badges['3'] ? '' : auth.user.address
  return { userId, pollList, address }
}

const mapDispatchToProps = dispatch => ({
  loadPolls: () => dispatch(getActivePolls()),
  voteOnActivePoll: (pollId, data) => dispatch(voteOnActivePoll(pollId, data))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ActivePolls)
