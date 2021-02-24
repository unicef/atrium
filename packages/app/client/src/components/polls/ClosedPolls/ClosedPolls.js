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

// ClosedPolls.propTypes = {
// pollList: PropTypes.arrayOf(PropTypes.shape({
//   topic: PropTypes.string.isRequired,
//   choises: PropTypes.arrayOf(PropTypes.object).isRequired,
// })),
// voters: PropTypes.array.isRequired,
// }

// ClosedPolls.defaultProps = {
//   pollList: [
//     {
//       topic: "What should be the area of focus for The Atrium in 2020?",
//       choises: [
//         {
//           value: "Transparent decision making",
//           votes: Math.floor(Math.random() * 22) + 1,
//         },
//         {
//           value: "Providing more learning resources",
//           votes: Math.floor(Math.random() * 22) + 1,
//         },
//         {
//           value: "News related to blockchain use in the UN system",
//           votes: Math.floor(Math.random() * 22) + 1,
//         },
//       ],
//     },
//     {
//       topic: "Why do we use it?",
//       choises: [
//         {
//           value: "It is a long established fact",
//           votes: Math.floor(Math.random() * 9) + 1,
//         },
//         {
//           value: "reader will be distracted by the readable content of a page when looking at its layout",
//           votes: Math.floor(Math.random() * 9) + 1,
//         },
//         {
//           value: "Various versions have evolved over the years",
//           votes: Math.floor(Math.random() * 9) + 1,
//         },
//       ],
//     },
//   ],
//   voters: [],
// }

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
