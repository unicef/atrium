import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Button } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  chosenFile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  documentName: {
    fontSize: '13px'
  },
  eraseButton: {
    margin: 0,
    backgroundColor: 'white',
    minWidth: 0,
    width: '5px',
    height: '5px'
  },
}))

const UploadedBanner = ({ name, handleClick }) => {
  const classes = useStyles()
  
  return (
    <div className={classes.chosenFile}>
      <Typography
        variant="h5"
        className={classes.documentName}
      >
        {name}
      </Typography>
      <Button
        className={classes.eraseButton}
        onClick={handleClick}
      >
        X
      </Button>
    </div>
  )
}

export default UploadedBanner
