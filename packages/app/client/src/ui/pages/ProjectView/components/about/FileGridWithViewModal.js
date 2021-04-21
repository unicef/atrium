import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FilesGrid from './FilesGrid'
import { Video, Image } from '../../../../atoms'

const handleMedia = ({ mediaType, ...fileProps }) => {
  if (mediaType === 'video') {
    return (
      <Video
        type={`video/${fileProps.extention}`}
        controls
        height="100%"
        width="100%"
        autoPlay
        {...fileProps}
      />
    )
  }

  return (
    <Image {...fileProps} height="100%" />
  )
}

const FileViewModal = ({ mediaType, files }) => {
  const [open, setOpen] = React.useState(false)
  const [file, setFile] = React.useState(undefined)

  const handleClickOpen = (file) => () => {
    setFile(file)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Grid container item xs={12}>
      <FilesGrid handleClick={handleClickOpen} mediaType={mediaType} files={files} />
      <Dialog maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Typography variant="h4">
            {file && file.name}
          </Typography>
        </DialogTitle>
        <DialogContent >
         {file && handleMedia({ mediaType, ...file })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default FileViewModal
