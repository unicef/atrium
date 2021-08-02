import React from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined'
import { ReactComponent as LikeIcon } from '../../../../icons/like.svg'
import { Button } from '../../../atoms'
import {currentUserIsTheOwner, getUserId} from '../../../../selectors'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { useProjectsAsyncActions } from '../../../hooks'

const useStyles = makeStyles(theme => ({
  likeButton: {
    marginBottom: '5%',
    '& > span > span > svg': {
      fill: theme.colors.white
    }
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
  const userLiked = useSelector(state => state.projects.selectedProject.userLiked)
  const { toggleLike } = useProjectsAsyncActions()

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
        startIcon={<BookmarkBorderOutlinedIcon />}
        size="full"
      >
        Bookmarks
      </Button>
    </>
  )
}

const ActionButtons = ({ projectData }) => {
  const userId = useSelector(getUserId)
  const userIsTheOwner =
    useSelector(currentUserIsTheOwner) ||
    projectData.team.map(user => user._id === userId).includes(true)

  return userIsTheOwner ? <OwnerButtons projectData={projectData} /> : <OtherUsersButtons projectId={projectData.id} />
}

export default ActionButtons
