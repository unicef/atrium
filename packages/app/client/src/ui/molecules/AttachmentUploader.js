import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { setError } from '../../actions/errorActions'
import { withStyles, Grid } from '@material-ui/core'
import { Button, AttachmentControl } from '../'
import { MAX_UPLOAD_SIZE } from '../../unin-constants'

const styles = theme => ({
  attachmentButton: {
    borderColor: 'rgb(1, 206, 75)', // 'green',
    alignSelf: 'flex-start',
    margin: 0,
    color: 'rgb(1, 206, 75)' // theme.colors['deep-green']
  },
  input: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  },
  inputLabel: {
    cursor: 'pointer'
  },
  attachmentContainer: {
    margin: '16px 0',
    maxWidth: '100%'
  }
})

const AttachmentUploader = ({
  classes,
  attachment,
  setAttachment,
  setError
}) => {
  const inputRef = React.useRef()
  const [filePreview, setFilePreview] = React.useState()
  const clickInput = e => {
    e.preventDefault()
    inputRef.current.click()
  }

  const handleChange = e => {
    const nextFile = e.target.files[0]
    if (nextFile) {
      if (nextFile.size > MAX_UPLOAD_SIZE) {
        setError('File exceeds maximum size of 5MB, please use a smaller image')
        e.target.value = null
        return
      }
      setFilePreview(URL.createObjectURL(nextFile))
      setAttachment(nextFile)
    }
  }

  React.useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview)
      }
    }
  })

  return (
    <Grid container direction="column" className={classes.container}>
      <input
        ref={inputRef}
        type="file"
        id="attachment-input"
        className={classes.input}
        onChange={handleChange}
      />
      <div className={classes.attachmentContainer}>
        {attachment ? (
          <AttachmentControl
            src={filePreview}
            fileName={attachment.name}
            removeFile={() => setAttachment(null)}
          />
        ) : (
          <Button
            // startIcon={<AttachmentIcon />}
            size="small"
            variant="outlined"
            className={classes.attachmentButton}
            id="attach-btn"
            // variant="text"
            onClick={clickInput}
          >
            <label
              htmlFor={'attachment-input'}
              className={classes.inputLabel}
              aria-label={'ATTACH FILE'}
              title={'ATTACH FILE'}
            >
              Select
            </label>
          </Button>
        )}
      </div>
    </Grid>
  )
}

AttachmentUploader.propTypes = {
  classes: PropTypes.object,
  attachment: PropTypes.object,
  setAttachment: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  setError: err => dispatch(setError(err))
})

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles)
)(AttachmentUploader)
