import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { Button } from '../../../atoms'
import { updateProject } from '../../../../api/projects'
import { useHandledRequest } from '../../../hooks'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => (
  {
    container: {
      marginTop: '50px',
      marginBottom: '30px'
    },
    button: {
      marginRight: '13px'
    }
  }
))

const FooterButtons = ({ formProps, editing, projectId }) => {
  const { isSubmitting } = formProps
  const classes = useStyles()
  const handledRequest = useHandledRequest()
  const history = useHistory()


  const publishProject = handledRequest({
    request: updateProject,
    onSuccess: () => {
      history.push('/projects')
    },
    successMessage: 'Project successfully published',
    showFullPageLoading: true
  })

  return (
    <Grid container item xs={12} justify="space-between" className={classes.container}>
      <Button
        onClick={() => history.goBack()}
        color="secondary"
        variant="outlined"
      >
        Cancel
      </Button>

      <Grid item xs="auto">
        <Button
          color={editing ? "secunadry" : "primary"}
          type="submit"
          disabled={isSubmitting}
          className={classes.button}
          variant={editing ? "outlined" : "contained"}
        >
          Save
        </Button>

        {
          editing && 
          <Button
            color="primary"
            disabled={isSubmitting}
            className={classes.button}
            onClick={
              async () => {
                await publishProject({ published: true }, projectId)
              }
            }
          >
            Publish
          </Button>
        }
      </Grid>
    </Grid>
  )
}

export default FooterButtons
