import React, { useState } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined'
import { ReactComponent as LikeIcon } from '../../../../icons/like.svg'
import { Button } from '../../../atoms'
import { currentUserIsTheOwner, getUserId } from '../../../../selectors'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { useProjectsAsyncActions, useAuthAsyncActions } from '../../../hooks'

const useStyles = makeStyles(theme => ({
  likeButton: {
    marginBottom: '5%',
    width: '215px',
    '& > span > span > svg': {
      fill: theme.colors.white
    }
  },
  bookmarkButton: {
    width: '215px'
  }
}))

const OwnerButtons = ({ projectData }) => {
  const history = useHistory()

  return (
    <>
      <Button
        mb={15}
        size="full"
        color="primary"
        startIcon={<EditOutlinedIcon />}
        onClick={() => {
          history.push(`/projects/overview/${projectData.id}`)
        }}
      >
        Edit Project
      </Button>
    </>
  )
}

const OtherUsersButtons = ({ projectId }) => {
  const classes = useStyles()
  const userLiked = useSelector(
    state => state.projects.selectedProject.userLiked
  )
  const userBookmarks = useSelector(state => state.auth.user.bookmarks)
  const { toggleLike } = useProjectsAsyncActions()
  const { addBookmark } = useAuthAsyncActions()
  const [bookmarked, setBookmarked] = useState(
    userBookmarks.find(bookmark => bookmark == projectId)
  )
  return (
    <>
      <Button
        color="primary"
        startIcon={<LikeIcon />}
        size="full"
        mb={15}
        className={classes.likeButton}
        onClick={() => toggleLike(projectId)}
      >
        {userLiked ? 'Liked' : 'Like Project'}
      </Button>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<BookmarkBorderOutlinedIcon />}
        size="full"
        className={classes.bookmarkButton}
        onClick={() => {
          addBookmark(projectId)
          setBookmarked(!bookmarked)
        }}
      >
        {bookmarked ? 'Bookmarked' : 'Add to bookmarks'}
      </Button>
    </>
  )
}

const ActionButtons = ({ projectData }) => {
  const userId = useSelector(getUserId)
  const userIsTheOwner =
    useSelector(currentUserIsTheOwner) ||
    projectData.team.map(user => user._id === userId).includes(true)
  return userIsTheOwner ? (
    <OwnerButtons projectData={projectData} />
  ) : (
    <OtherUsersButtons projectId={projectData.id} />
  )
}

export default ActionButtons
