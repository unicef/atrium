import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import orderBy from 'lodash/orderBy'
import { createSelector } from 'reselect'
import { DISCUSSION_FILTER_ENUM } from '../../unin-constants'
import { DiscussionRow } from '../'

const styles = theme => ({
  noDiscussionsText: {
    marginTop: 64,
    fontFamily: theme.typography.fontFamily,
    fontSize: '24px',
    fontWeight: 500,
    letterSpacing: '1.8px'
  }
})

const DiscussionList = ({ discussionList, filter, userId, classes }) => {
  if (!discussionList || !discussionList.length) {
    if (filter.search) {
      return (
        <Typography
          variant="h5"
          align="center"
          className={classes.noDiscussionsText}
        >
          No discussions match your search
        </Typography>
      )
    }

    return (
      <Typography align="center" className={classes.noDiscussionsText}>
        There are currently no discussions on The Atrium
      </Typography>
    )
  }

  return discussionList.map(discussion => {
    console.log(discussion)
    return (
      <DiscussionRow
        key={`discussion-${discussion.id}`}
        id={discussion.id}
        title={discussion.title}
        content={discussion.content}
        creator={discussion.user}
        type={discussion.type}
        createdAt={discussion.createdAt}
        likes={discussion.likes.length}
        isLiked={!!discussion.likes.find(like => like.id === userId)}
        userId={userId}
        comments={discussion.comments.length}
      />
    )
  })
}

DiscussionList.propTypes = {
  filter: PropTypes.object.isRequired,
  discussionList: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string.isRequired,
  classes: PropTypes.object
}

// get all discussions available in store
const getDiscussions = state => state.discussions.discussionList

// get current search
const getSearchFilter = (state, filter) =>
  filter.search ? filter.search.toLowerCase() : ''

// get current sort
const getSort = (state, filter) => filter.sort

/**
 * Selector to get sorted and filtered discussion list
 */
const discussionSelector = createSelector(
  [getDiscussions, getSearchFilter, getSort],
  (discussions, search, filter) => {
    let filteredDiscussions = discussions
    if (filter) {
      switch (filter.value) {
        case DISCUSSION_FILTER_ENUM.DISCUSSION:
          filteredDiscussions = discussions.filter(
            d => d.type === DISCUSSION_FILTER_ENUM.DISCUSSION
          )
          break
        case DISCUSSION_FILTER_ENUM.FEATURE_BUGS:
          filteredDiscussions = discussions.filter(
            d => d.type === DISCUSSION_FILTER_ENUM.FEATURE_BUGS
          )
          break
        default:
          break
      }

      filteredDiscussions = orderBy(
        filteredDiscussions,
        ['createdAt'],
        [filter.direction]
      )
    }
    if (search) {
      return filteredDiscussions.filter(
        disc =>
          disc.title.toLowerCase().includes(search) ||
          disc.content.toLowerCase().includes(search) ||
          disc.type.toLowerCase().includes(search) ||
          disc.user.name.toLowerCase().includes(search) ||
          disc.user.email.toLowerCase().includes(search)
      )
    }

    return filteredDiscussions
  }
)

const mapStateToProps = (state, ownProps) => ({
  discussionList: discussionSelector(state, ownProps.filter),
  userId: state.auth.user.id
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(DiscussionList)
