import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { toggleLikeInDiscussion as toggleLikeInDiscussionAction } from '../../reducers/discussionReducer'
import { UserLink, Button } from '../'
import { getRelativeTimeToNow } from '../../utils/timeManipulation'
import { ReactComponent as LikeIcon } from '../../icons/like.svg'
import { ReactComponent as CommentIcon } from '../../icons/comment.svg'
import EditDeletePopover from '../../components/edit-delete-popover'
import {
  deleteDiscussion,
  editDiscussion
} from '../../../src/reducers/discussionReducer'
import TitledModal from '../templates/TitledModal'
import { TextField, Select, MenuItem } from '@material-ui/core'
import { DISCUSSION_FILTER_ENUM } from '../../unin-constants'

const styles = theme => ({
  rowContainer: {
    margin: '40px 0',
    borderBottom: 'solid 1px #e2e2e2',
    paddingBottom: 20
  },
  titleText: {
    color: theme.colors['dark-forest-green'],
    fontSize: 20,
    lineHeight: 1.4,
    fontFamily: theme.typography.fontFamily,
    '& a': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  createdAtText: {
    color: theme.colors['warm-gray']
  },
  typeText: {
    fontSize: 15,
    lineHeight: 1.8,
    color: theme.colors['dark-forest-green']
  },
  actionButtonAccent: {
    color: theme.colors['shamrock-green'],
    fill: theme.colors['shamrock-green']
  }
})

const filterOptions = Object.values(DISCUSSION_FILTER_ENUM).map(val => ({
  label: val,
  value: val
}))

const DiscussionRow = ({
  id,
  title,
  creator,
  type,
  content,
  createdAt,
  likes,
  comments,
  toggleLikeInDiscussion,
  isLiked,
  classes,
  userId,
  deleteDiscussion,
  editDiscussion
}) => {
  const likedClassName = classnames({
    [classes.actionButtonAccent]: isLiked
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState(null)
  const [newType, setNewType] = useState(null)
  const [newContent, setNewContent] = useState(null)

  useEffect(() => {
    setNewTitle(title)
    setNewType(type)
    setNewContent(content)
  }, [title, type, content])

  return (
    <Grid container className={classes.rowContainer} spacing={1}>
      <Grid item xs={11}>
        <Typography className={classes.titleText}>
          <Link to={`/discussion-details/${id}`}>{title}</Link>
        </Typography>
      </Grid>
      <Grid item xs={1}>
        {userId === creator.id ? (
          <EditDeletePopover
            type={'discussion'}
            deleteRedirectUrl={window.location.href}
            onEditClick={() => {
              setModalOpen(true)
            }}
            onDeleteClick={() => {
              deleteDiscussion(id, window.location.reload())
            }}
          />
        ) : null}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" className={classes.createdAtText}>
          Posted by <UserLink id={creator.id} name={creator.name} />{' '}
          {getRelativeTimeToNow(createdAt)} ago
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="space-between" alignItems="center">
          <div>
            <Button
              className={likedClassName}
              variant="text"
              startIcon={<LikeIcon />}
              size="mini"
              onClick={() => toggleLikeInDiscussion(id)}
            >
              {likes}
            </Button>
            <Link to={`/discussion-details/${id}`}>
              <Button variant="text" startIcon={<CommentIcon />} size="mini">
                {comments}
              </Button>
            </Link>
          </div>
          <Typography className={classes.typeText}>#{type}</Typography>
        </Grid>
      </Grid>
      <TitledModal
        title={'Edit post'}
        description="You can ask a question, request for a new feature or report a bug through your post."
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Select
                name="type"
                id="type"
                value={newType}
                onChange={e => {
                  console.log('lol')
                  console.log(newType)
                  setNewType(e.target.value)
                }}
                fullWidth
              >
                {filterOptions.map(opt => (
                  <MenuItem key={`opt-${opt.value}`} value={opt.value}>
                    #{opt.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="title"
                name="title"
                label="Post heading"
                value={newTitle}
                onChange={e => {
                  setNewTitle(e.target.value)
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="content"
                name="content"
                placeholder="Post description"
                value={newContent}
                onChange={e => {
                  setNewContent(e.target.value)
                }}
                fullWidth
                multiline
                rows={4}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                fullWidth
                color="primary"
                onClick={() => {
                  editDiscussion(
                    {
                      title: newTitle.length > 0 ? newTitle : title,
                      type: newType.length > 0 ? newType : type,
                      content: newContent.length > 0 ? newContent : content
                    },
                    id,
                    window.location.reload()
                  )
                }}
              >
                EDIT POST
              </Button>
            </Grid>
          </Grid>
        </form>
      </TitledModal>
    </Grid>
  )
}

DiscussionRow.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  creator: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.number.isRequired,
  toggleLikeInDiscussion: PropTypes.func.isRequired,
  classes: PropTypes.object
}

export default compose(
  withStyles(styles),
  connect(null, {
    toggleLikeInDiscussion: toggleLikeInDiscussionAction,
    deleteDiscussion,
    editDiscussion
  })
)(DiscussionRow)
