import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '../atoms'

const useStyles = makeStyles(() => ({
  paper: {
    width: '500px',
    maxWidth: '50%',
    maxHeight: '75%',
    height: '200px'
  }
}))

const ActionDialog = ({
  title,
  content,
  buttonLabel,
  onConfirm,
  open,
  handleClose
}) => {
  const classes = useStyles()

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="caption1">{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="danger">
          {buttonLabel}
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
ActionDialog.defaultProps = {
  title: 'Are you sure ?',
  content: 'This action cannot be undone!',
  buttonLabel: 'Delete'
}

export default ActionDialog
