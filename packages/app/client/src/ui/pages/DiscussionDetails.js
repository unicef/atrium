import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import {
  withStyles,
  Grid,
  Select,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core'
import { connect } from 'react-redux'
import {
  StandardVerticalTemplate,
  Button,
  CommentList,
  UserLink,
  BackArrow
} from '../'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import {
  getDiscussionDetails as getDiscussionDetailsAction,
  toggleLikeInDiscussion as toggleLikeInDiscussionAction,
  addCommentInDiscussion as addCommentInDiscussionAction
} from '../../reducers/discussionReducer'
import EditDeletePopover from '../../components/edit-delete-popover'
import { ReactComponent as LikeIcon } from '../../icons/like.svg'
import { ReactComponent as CommentIcon } from '../../icons/comment.svg'
import CommentInput from '../../components/CommentInput'
import { getRelativeTimeToNow } from '../../utils/timeManipulation'
import TitledModal from '../templates/TitledModal'
import { DISCUSSION_FILTER_ENUM } from '../../unin-constants'
import {
  deleteDiscussion,
  editDiscussion
} from '../../../src/reducers/discussionReducer'

const styles = theme => ({
  container: {
    overflowWrap: 'break-word'
  },
  pageTemplate: {
    minWidth: 600,
    marginTop: 50,
    flex: 1,
    overflowX: 'hidden',
    alignSelf: 'center',
    padding: '45px 0'
  },
  titleText: {
    color: theme.colors['dark-forest-green'],
    marginTop: 16
  },
  creationText: {
    color: theme.colors['warm-gray']
  },
  contentText: {
    whiteSpace: 'pre-wrap'
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

const DiscussionDetails = ({
  match,
  getDiscussionDetails,
  discussion,
  classes,
  toggleLikeInDiscussion,
  addCommentInDiscussion,
  userId,
  editDiscussion,
  deleteDiscussion
}) => {
  const [value, setValue] = React.useState('')
  const [modalOpen, setModalOpen] = React.useState(false)
  const [newTitle, setNewTitle] = React.useState(null)
  const [newType, setNewType] = React.useState(null)
  const [newContent, setNewContent] = React.useState(null)

  React.useEffect(() => {
    if (!discussion) return

    setNewTitle(discussion.title)
    setNewType(discussion.type)
    setNewContent(discussion.content)
  }, [discussion])

  const handleChange = e => {
    setValue(e.target.value)
  }

  const likedClassName = classnames({
    [classes.actionButtonAccent]:
      !!discussion && !!discussion.likes.find(like => like.id === userId)
  })

  const onSubmit = e => {
    addCommentInDiscussion(discussion.id, { content: value })
    setValue('')
  }

  const discussionId = match.params.id
  React.useEffect(() => {
    // This doesn't even make sense
    if (discussionId && !discussion) {
      getDiscussionDetails(discussionId)
    }
  }, [discussionId, getDiscussionDetails, discussion])

  if (!discussion) {
    return null
  }

  const linkify = inputText => {
    var replacedText, replacePattern1, replacePattern2, replacePattern3

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
    replacedText = inputText.replace(
      replacePattern1,
      '<a href="$1" target="_blank">$1</a>'
    )

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
    replacedText = replacedText.replace(
      replacePattern2,
      '$1<a href="http://$2" target="_blank">$2</a>'
    )

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim
    replacedText = replacedText.replace(
      replacePattern3,
      '<a href="mailto:$1">$1</a>'
    )

    return replacedText
  }

  console.log(discussion)
  const ownerId = discussion.user._id // why make it the same as project? That would make sense
  return (
    <StandardVerticalTemplate className={classes.pageTemplate}>
      <Grid container spacing={1} className={classes.container}>
        <Grid item xs={12}>
          <BackArrow dest={'/engage'} />
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h2" className={classes.titleText}>
            {discussion.title}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          {userId === ownerId ? (
            <EditDeletePopover
              type={'discussion'}
              deleteRedirectUrl={'/engage'}
              onEditClick={() => {
                setModalOpen(true)
              }}
              onDeleteClick={() => {
                deleteDiscussion(discussionId)
              }}
            />
          ) : null}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" className={classes.contentText}>
            {/* {discussion.content} */}
            <div
              dangerouslySetInnerHTML={{ __html: linkify(discussion.content) }}
            />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" className={classes.creationText}>
            Posted by{' '}
            <UserLink id={discussion.user.id} name={discussion.user.name} />{' '}
            {getRelativeTimeToNow(discussion.createdAt)} ago
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="space-between" alignItems="center">
            <div>
              <Button
                variant="text"
                className={likedClassName}
                startIcon={<LikeIcon />}
                size="mini"
                onClick={() => toggleLikeInDiscussion(discussionId)}
              >
                {discussion.likes.length}
              </Button>
              <Button variant="text" startIcon={<CommentIcon />} size="mini">
                {discussion.comments.length}
              </Button>
            </div>
            <Typography className={classes.typeText}>
              #{discussion.type}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CommentInput
            rows={4}
            commentText={value}
            onChange={handleChange}
            onClick={onSubmit}
          />
        </Grid>
        <Grid item xs={12}>
          <CommentList comments={discussion.comments} />
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
                      title: newTitle.length > 0 ? newTitle : discussion.title,
                      type: newType.length > 0 ? newType : discussion.type,
                      content:
                        newContent.length > 0 ? newContent : discussion.content
                    },
                    discussion._id,
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
    </StandardVerticalTemplate>
  )
}

DiscussionDetails.propTypes = {
  match: PropTypes.object.isRequired,
  getDiscussionDetails: PropTypes.func.isRequired,
  discussion: PropTypes.object,
  classes: PropTypes.object,
  toggleLikeInDiscussion: PropTypes.func.isRequired,
  addCommentInDiscussion: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  discussion: state.discussions.discussionList.find(
    discussion => discussion.id === ownProps.match.params.id
  ),
  userId: state.auth.user.id
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, {
    getDiscussionDetails: getDiscussionDetailsAction,
    toggleLikeInDiscussion: toggleLikeInDiscussionAction,
    addCommentInDiscussion: addCommentInDiscussionAction,
    editDiscussion,
    deleteDiscussion
  })
)(DiscussionDetails)
