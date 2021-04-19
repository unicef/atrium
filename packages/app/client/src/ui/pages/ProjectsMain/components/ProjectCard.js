import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useSelector } from 'react-redux'
import { ProjectVerticalCard } from '../../../organisms'
import { useProjectsAsyncActions } from '../../../hooks'

const ProjectCard = ({ id, onClick, disableActions }) => {
  const project = useSelector(state => state.projectsMain.main.projects.find(pjt => pjt.id === id))
  const { toggleLike } = useProjectsAsyncActions()

  return (
    <Grid item xs={12} sm={4} container justify="center">
      <ProjectVerticalCard
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
