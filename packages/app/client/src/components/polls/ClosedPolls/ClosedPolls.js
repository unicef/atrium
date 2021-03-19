import React from 'react'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import withStyles from '@material-ui/styles/withStyles'
import PollsNav from './PollsNav'
import ClosedPollCard from './ClosedPollCard'

import { getClosedOrVotedOnPolls } from '../../../actions/pollActions'

const styles = theme => ({
  main: {
    marginTop: 86,
    marginBottom: 50
  }
})

const ClosedPolls = ({
  classes,
  pollList,
  userId,
  loadVotedOnOrClosedPolls,
  ...props
}) => {
  React.useEffect(() => {
    loadVotedOnOrClosedPolls(userId)
  }, [])

  if (!pollList || !pollList.length) {
    return null
  }

  const pollListView = pollList.map((obj, k) => (
    // console.log(obj)
    <ClosedPollCard key={k} {...obj} />
  ))

  return (
    <Container className={classes.main}>
      <PollsNav />
      {pollListView}
    </Container>
  )
}

const mapStateToProps = ({ auth, poll }) => {
  const userId = auth.user.id
  const pollList = poll.closedOrVotedOnPolls
  return { userId, pollList }
}
const mapDispatchToProps = dispatch => ({
  loadVotedOnOrClosedPolls: userId => dispatch(getClosedOrVotedOnPolls(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ClosedPolls))
