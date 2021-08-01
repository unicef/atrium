import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Button } from '../../../atoms'
import { Trash } from '../../../assets'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  document: {
    padding: '2% 4%',
    border: `1.6px solid ${theme.colors['dark-gray']}`,
    borderRadius: '3px',
    margin: '2% 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteButton: {
    width: '13px',
    height: '13px',
    minWidth: 0,
    margin: 0,
    color: theme.colors['dark-gray']
  },
  documentName: {
    fontSize: '13px'
  }
}))

const AddedFile = ({ size, name, newFile, onDelete, file }) => {
  const classes = useStyles()
  const handledName = name.substr(name.indexOf('-') + 1)

  return (
    <div key={`${handledName}_${size}`} className={classes.document}>
      <Typography
          variant="h5"
          className={classes.documentName}
        >
          {handledName}
        </Typography>
      <Button
        color="secondary"
        className={classes.deleteButton}
        onClick={() => onDelete(file)}
      >
          {newFile ? <CloseOutlinedIcon /> : <img alt="delete icon" src={Trash} />}
      </Button>
    </div>
  )
}

export default AddedFile