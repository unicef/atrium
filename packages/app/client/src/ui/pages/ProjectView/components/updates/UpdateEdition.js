import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { TextField, Button } from '../../../../atoms'
import {
  useProjectsAsyncActions,
  useProjectViewActions
} from '../../../../hooks'

const UpdateEdition = ({ text, dismissEdit, year, month, id, title }) => {
  const { editUpdate } = useProjectViewActions()
  const { editUpdateBE } = useProjectsAsyncActions()
  const [editableText, setText] = React.useState(text)

  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Box display="flex" bgcolor="white">
          <TextField
            value={editableText}
            multiline
            onChange={event => {
              setText(event.target.value)
            }}
          />
        </Box>
      </Grid>
      <Grid container item justify="flex-end" xs={12}>
        <Box mt={2}>
          <Button onClick={dismissEdit} variant="outlined">
            Cancel
          </Button>

          <Button
            ml={15}
            color="primary"
            onClick={() => {
              editUpdateBE({ id, text: editableText, title })
              editUpdate({ text: editableText, year, month, id })
              dismissEdit()
            }}
          >
            Edit
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default UpdateEdition
