import React from 'react'
import { Button, Image } from './index'
import { Edit } from '../assets'
import { makeStyles } from '@material-ui/core/styles'
import { DeleteButton } from '../../components/projects/overview/assets'
const useStyles = makeStyles(() => ({
  button: {
    width: '107px',
    height: '42px'
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
          src={type === 'edit' ? Edit : DeleteButton}
        />
        <span className={classes.text}>
          {type === 'edit' ? 'Edit' : 'Delete'}
        </span>
      </Button>
    </>
  )
}

export default ActionProjectButton
