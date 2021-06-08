import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { TextField, Button } from '../../../../atoms'
import { useProjectsAsyncActions } from '../../../../hooks'

const UpdateReporting = ({ dismissReport, id }) => {
  const { reportUpdateBE } = useProjectsAsyncActions()

  const [reportText, setText] = React.useState('')

  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Box display="flex" bgcolor="white">
          <TextField
            multiline
            value={reportText}
            onChange={event => {
              setText(event.target.value)
            }}
          />
        </Box>
      </Grid>
      <Grid container item justify="flex-end" xs={12}>
        <Box mt={2}>
          <Button onClick={dismissReport} variant="outlined">
            Cancel
          </Button>

          <Button
            ml={15}
            color="primary"
            onClick={() => {
              reportUpdateBE({ id, reported: true, reportMessage: reportText })
              dismissReport()
            }}
          >
            Report
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default UpdateReporting
