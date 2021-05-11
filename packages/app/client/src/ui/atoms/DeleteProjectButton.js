import React from 'react'
import { Button, Image } from './index'
import { DeleteButton } from '../../components/projects/overview/assets'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(() => ({
    deleteButton: {
    width: '107px',
    height: '42px'
  },
    deleteText: {
    marginLeft: '10%'
  }
}))
function DeleteProjectButton({ id }) {
  const classes = useStyles()
  const history = useHistory()
  return (
    <>
      <Button
        className={classes.deleteButton}
        color="primary"
        variant="outlined"
        onClick={() => history.push(`projects/overview/${id}`)}
      >
        <Image
          sameSize
          borderRadius={0}
          width="14px"
          height="14px"
          src={DeleteButton}
        />
        <span className={classes.deleteText}>Delete</span>
      </Button>
    </>
  )
}

export default DeleteProjectButton
