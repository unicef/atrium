import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import { Grid } from '@material-ui/core'

const styles = theme => ({
  previewContainer: {
    width: 138,
    height: 86,
    minWidth: 138,
    minHeight: 86,
    borderRadius: 5,
    border: 'solid 1px #aeaeae',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  image: {
    height: '100%',
    width: 'auto'
  },
  fileTypeIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 20,
    opacity: 0.7,
    borderRadius: '0 0 5px 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors['black'],
    color: theme.colors['white'],
    textTransform: 'uppercase'
  },
  fileNameText: {
    paddingTop: 5
  }
})

/**
 * Get file type from a file name
 * @param {string} fileName
 */
const getFileType = fileName => {
  if (!fileName) return
  const splitResult = fileName.split('.')
  return splitResult[splitResult.length - 1]
}

const AttachmentPreview = ({
  src,
  fileName,
  noName = false,
  classes,
  ...props
}) => {
  const fileType = getFileType(fileName)
  const isImage = ['png', 'jpg', 'jpeg', 'svg'].includes(fileType)

  const downloadFile = () => {
    // This one line of code replaces the entire useFetchWithCache.
    window.open(`/api/projects/download/${fileName}`)
  }

  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <button className={classes.previewContainer} onClick={downloadFile}>
          {isImage ? (
            <img
              alt={'Project attachment'}
              src={src}
              className={classes.image}
            />
          ) : (
            <InsertDriveFileIcon />
          )}
          <div className={classes.fileTypeIndicator}>
            <Typography variant="caption">{fileType}</Typography>
          </div>
        </button>
      </Grid>
      {!noName && (
        <Grid item xs={12}>
          <Typography
            noWrap={false}
            variant="subtitle1"
            className={classes.fileNameText}
          >
            {fileName}
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

AttachmentPreview.propTypes = {
  src: PropTypes.string,
  fileName: PropTypes.string.isRequired,
  classes: PropTypes.object
}

export default withStyles(styles)(AttachmentPreview)
