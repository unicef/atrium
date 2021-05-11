import React from 'react'
import { Button } from './Button'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  viewProject: {
    width: '139px',
    height: '42px'
  }
}))

function ViewProjectButton({ id }) {
  const classes = useStyles()
  const history = useHistory()
  return (
    <>
      <Button
        className={classes.viewProject}
        color="primary"
        variant="outlined"
        onClick={() => history.push(`projects/${id}`)}
      >
        View Project
      </Button>
    </>
  )
}

export default ViewProjectButton
