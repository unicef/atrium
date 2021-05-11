import React from 'react'
import { Button, Image } from './index'
import { Edit } from '../assets'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
const useStyles = makeStyles(() => ({
  editButton: {
    width: '107px',
    height: '42px'
  },
  editText: {
    marginLeft: '10%'
  }
}))

function EditProjectButton({ id }) {
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <Button
        className={classes.editButton}
        color="primary"
        variant="outlined"
        onClick={() => history.push(`projects/overview/${id}`)}
      >
        <Image
          sameSize
          borderRadius={0}
          width="14px"
          height="14px"
          src={Edit}
        />
        <span className={classes.editText}>Edit</span>
      </Button>
    </>
  )
}

export default EditProjectButton
