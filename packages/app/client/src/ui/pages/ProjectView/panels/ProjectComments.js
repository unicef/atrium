import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CommentsList, CreateComment } from '../components/comments'

const ProjectComments = () => {
  return (
    <Grid container justify="center">
      <Grid container item xs={10}>
        <CreateComment />
        <CommentsList />
      </Grid>
    </Grid>
  )
}

export default ProjectComments
