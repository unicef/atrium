import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { Button } from '../atoms'

const DeleteActionDialog = ({ onConfirm, open, handleClose }) => {

  return (
    <Dialog maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">
          Are you sure ?
        </Typography>
      </DialogTitle>
      <DialogContent >
        <Typography variant="caption1">
          This action cannot be undone!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="danger">
          Delete
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteActionDialog
