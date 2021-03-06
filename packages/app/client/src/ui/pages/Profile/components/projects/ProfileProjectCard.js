import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useSelector } from 'react-redux'
import { ProjectVerticalCard } from '../../../../organisms'
import { useProfileAsyncActions } from '../../../../hooks'
import { getProfileProjectById } from '../../../../../selectors'
import { useHistory } from 'react-router'

const ProjectCard = ({ id, onClick, disableActions }) => {
  const project = useSelector(state => getProfileProjectById(state, id))
  const { toggleLike } = useProfileAsyncActions()
  const history = useHistory()

  const onClickComments = () => {
    history.push(`/projects/view/${id}/comments?page=1&sort=asc`)
  }
  return (
    <Grid item xs={12} sm={4} container justify="center">
      <ProjectVerticalCard
        openComments={onClickComments}
        commentsCount={project.comments.length}
        likesCount={project.likes.length}
        src={project.attachment}
        onLike={toggleLike}
        disableActions={disableActions}
        onClick={onClick}
        {...project}
      />
    </Grid>
  )
}

export default ProjectCard
