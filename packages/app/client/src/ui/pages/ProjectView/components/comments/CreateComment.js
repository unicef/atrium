import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { MentionsForm } from '../../../../organisms'
import { useProjectsAsyncActions } from '../../../../hooks'
import { useSelector } from 'react-redux'
import { getCurrentProjectId } from '../../../../../selectors'


const CreateComment = () => {
  const { addComment, getProjectById } = useProjectsAsyncActions()
  const projectId = useSelector(getCurrentProjectId)

  
  return (
    <Box width="100%" mt={2} mb={2}>
      <Grid container item xs={12}>
        <MentionsForm submitLabel="Add Comment" handleSubmit={async ({ text, mentions }) => {
          await addComment(projectId, text, mentions)
          await getProjectById(projectId)
        }} />
      </Grid>
    </Box>
  )
}

 export default CreateComment

