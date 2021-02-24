import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, IconButton, Grid } from '@material-ui/core'
import { AttachmentPreview } from '../'
import { ReactComponent as CancelIcon } from '../../icons/cancel.svg'

const styles = theme => ({
  fileNameText: {
    fontSize: 16,
    marginLeft: 16,
    marginRight: 2
  }
})

const AttachmentControl = ({
  src,
  fileName,
  removeFile,
  classes,
  ...props
}) => {
  return (
    <Grid container alignItems="center" wrap="nowrap">
      <AttachmentPreview fileName={fileName} src={src} />
      <IconButton onClick={removeFile}>
        <CancelIcon />
      </IconButton>
    </Grid>
  )
}

AttachmentControl.propTypes = {
  src: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  removeFile: PropTypes.func.isRequired,
  classes: PropTypes.object
}

export default withStyles(styles)(AttachmentControl)
