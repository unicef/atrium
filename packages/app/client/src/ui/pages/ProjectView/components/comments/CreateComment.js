import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { CommentInput } from '../../../../molecules'
import { useHandledRequest } from '../../../../hooks'
import { useSelector } from 'react-redux'
import { getCurrentProjectId } from '../../../../../selectors'
import { addComment } from '../../../../../api/projects'


const CreateComment = ({ refreshComments }) => {
  const handledRequest = useHandledRequest()
  const projectId = useSelector(getCurrentProjectId)

  const onAddComment = handledRequest(
    { 
      request: addComment,
      showFullPageLoading: true,
      onSuccess: () => refreshComments(),
      successMessage: 'Comment successfully added'
    }
  )
  
  return (
    <Box width="100%" mt={2} mb={2}>
      <Grid container item xs={12}>
        <CommentInput rows={4} submitLabel="Add Comment" handleSubmit={(text) => onAddComment(projectId, text, [])} />
      </Grid>
    </Box>
  )
}

 export default CreateComment

