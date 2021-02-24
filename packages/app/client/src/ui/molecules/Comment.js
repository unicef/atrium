import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles, Avatar, Grid, Typography } from '@material-ui/core'
import { DateTime } from 'luxon'
import Linkify from 'linkifyjs/react';
import { getRelativeTime } from '../../utils/timeManipulation'
import { UserLink } from '../atoms'
import EditDeletePopover from '../../components/edit-delete-popover'
import { editComment } from '../../api/projects'
import CommentInput from '../../components/CommentInput'
import { deleteComment } from '../../api/projects'

const styles = theme => ({
  container: {
    marginBottom: 40
  },
  avatar: {
    height: 45,
    width: 45,
    marginRight: 15
  },
  timeAgo: {
    color: theme.colors['warm-gray']
  },
  author: {
    fontWeight: 500
  },
  comment: {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    marginBottom: 10,
    marginTop: 5
  },
  commentBox: {
    paddingLeft: 7
  },
  commentLink: {
    color: theme.colors['shamrock-green']
  }
})

const commentRegexString = '\\@\\[([a-zA-Z0-9 ]*)\\]\\(([a-zA-Z0-9]*)\\)' // eslint-disable-line

/**
 * Get markup for a comment based on the commentRegexString
 *
 * @param {string} content
 */
const getCommentMarkup = content => {
  const markup = []
  let currentString = content
  let currentIndex = 0

  const commentRegex = new RegExp(commentRegexString)
  while (commentRegex.test(currentString)) {
    const result = commentRegex.exec(currentString)

    markup.push(currentString.substring(0, result.index))
    markup.push(<UserLink name={result[1]} id={result[2]} />)
    currentIndex = result.index + result[0].length
    currentString = currentString.slice(currentIndex)
  }
  if (currentString) {
    markup.push(currentString)
  }
  return markup
}

const Comment = ({ classes, id, user, content, date, auth, ...props }) => {
  const [editting, setEditting] = useState(false)
  const [commentContent, setCommentContent] = useState(null)
  const parsedCreatedAt = DateTime.fromISO(date)
  const now = DateTime.local().toUTC()

  const { user: loggedInUser } = auth

  useEffect(() => {
    setCommentContent(content)
  }, [content])

  return (
    <Grid container wrap="nowrap" className={classes.container}>
      <Grid container>
        {editting ? (
          <Grid item xs={12}>
            <CommentInput
              commentText={commentContent}
              onChange={e => {
                console.log(commentContent)
                setCommentContent(e.target.value)
              }}
              labelText={'Comment'}
              onClick={() => {
                setEditting(false)
                editComment(id, commentContent)
              }}
            />
          </Grid>
        ) : (
          <Fragment>
            <Grid item xs={1}>
              <Avatar
                alt={user.name}
                src={user.avatar}
                className={classes.avatar}
              />
            </Grid>
            <Grid item xs={10} className={classes.commentBox}>
              <Typography variant="subtitle1" className={classes.author}>
                {user.name}
              </Typography>

              <Typography
                variant="subtitle1"
                component="div"
                className={classes.comment}
              >
                <Linkify options={{target: '_blank', className: classes.commentLink}}>
                  {getCommentMarkup(commentContent)}
                </Linkify>    
              </Typography>

              <Typography variant="subtitle1" className={classes.timeAgo}>
                Posted {getRelativeTime(parsedCreatedAt, now)} ago
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {loggedInUser.id === user.id ? (
                <EditDeletePopover
                  commentId={id}
                  type={'comment'}
                  deleteRedirectUrl={window.location.href}
                  onDeleteClick={() => {
                    deleteComment(id)
                    window.location.reload()
                  }}
                  onEditClick={setEditting}
                ></EditDeletePopover>
              ) : null}
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

Comment.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Comment))
