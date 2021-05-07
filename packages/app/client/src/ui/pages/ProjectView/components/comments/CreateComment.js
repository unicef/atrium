import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { InputWithAvatar } from '../../../../molecules'
import { Button } from '../../../../atoms'
import { useProjectsAsyncActions } from '../../../../hooks'
import { useSelector } from 'react-redux'
import { getCurrentProjectId } from '../../../../../selectors'

const CreateComment = () => {
  const { addComment } = useProjectsAsyncActions()
  const projectId = useSelector(getCurrentProjectId)

  return (
    <Box width="100%" mt={2} mb={2}>
      <Grid container item xs={12}>
        <InputWithAvatar rows={3}>
          {(value) => (
            <Box width="100%" mt={1}>
              <Grid container item xs={12}>
                <Button 
                  color="primary"
                  size="small"
                  onClick={async () => addComment(projectId, value)}
                >
                  Add Comment
                </Button>
              </Grid>
            </Box>
          )}
        </InputWithAvatar>
      </Grid>
    </Box>
  )
}

export default CreateComment
