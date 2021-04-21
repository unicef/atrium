import React from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined'
import { ReactComponent as LikeIcon } from '../../../../icons/like.svg'
import { Button } from '../../../atoms'
import { currentUserIsTheOwner } from '../../../../selectors'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { useProjectsAsyncActions } from '../../../hooks'

const useStyles = makeStyles(theme => ({
  likeButton: {
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
          history.push(`/project-overview/${projectData.id}`)
        }}
      >
        Edit Project
      </Button>
      <Button
        startIcon={<ModeCommentOutlinedIcon />}
        size="full" 
        variant="outlined"
      >
        Comments
      </Button>
    </>
  )
}

const OtherUsersButtons = ({ projectId }) => {
  const classes = useStyles()
  const userLiked = useSelector(state => state.projectsMain.main.selectedProject.userLiked)
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
        startIcon={<ModeCommentOutlinedIcon />}
        size="full" 
        variant="outlined"
        mb={15}
      >
        Comments
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
  const userIsTheOwner = useSelector(currentUserIsTheOwner)
  
  return userIsTheOwner ? <OwnerButtons projectData={projectData} /> : <OtherUsersButtons projectId={projectData.id} />
}

export default ActionButtons
