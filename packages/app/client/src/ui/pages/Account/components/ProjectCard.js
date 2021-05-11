import React from 'react'
import Grid from '@material-ui/core/Grid'
import { ProjectVerticalCard } from '../../../organisms'
import { useSelector } from 'react-redux'
import { getUserId } from '../../../../selectors'

const ProjectCard = ({ project, onClick, disableActions, count }) => {
  const userId = useSelector(getUserId)

  return (
    <Grid item xs={12} sm={12 / count} container justify="center">
      <ProjectVerticalCard
        isOwner={userId === project.owner.id}
        maxWidth={userId === project.owner.id ? 469 : 345}
        commentsCount={project.comments.length}
        likesCount={project.likes.length}
        src={project.attachment}
        disableActions={disableActions}
        onClick={onClick}
        {...project}
      />
    </Grid>
  )
}

export default ProjectCard
