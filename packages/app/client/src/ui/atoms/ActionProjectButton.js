import React from 'react'
import { Button, Image } from './index'
import { Edit, Trash } from '../assets'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  button: {
    width: '107px',
    height: '42px',
    marginRight: '5%'
  },
  text: {
    marginLeft: '10%'
  }
}))

function ActionProjectButton({ type, onClick }) {
  const classes = useStyles()
  return (
    <>
      <Button
        className={classes.button}
        color="primary"
        variant="outlined"
        onClick={() => onClick()}
      >
        <Image
          sameSize
          borderRadius={0}
          width="14px"
          height="14px"
          src={type === 'edit' ? Edit : Trash}
        />
        <span className={classes.text}>
          {type === 'edit' ? 'Edit' : 'Delete'}
        </span>
      </Button>
    </>
  )
}

export default ActionProjectButton
