import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { IconButton, InputBase } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { CancelIcon, UploadIcon } from '../../../ui/assets'
import { MAX_UPLOAD_SIZE } from '../../../unin-constants'
import { setError } from '../../../actions/errorActions'

const imgPreviewStyles = theme => ({
  previewFigure: {
    position: 'relative',
    backgroundColor: theme.colors['dark-forest-green'],
    minWidth: 118,
    minHeight: 118,
    maxWidth: 118,
    maxHeight: 118,
    borderRadius: '100%'
  },
  previewHead: {
    position: 'absolute',
    display: 'block',
    top: 22,
    left: '50%',
    height: 40,
    width: 40,
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    borderRadius: '100%'
  },
  previewBody: {
    position: 'absolute',
    display: 'block',
    bottom: -36,
    left: '50%',
    height: 80,
    width: 80,
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    borderRadius: '100%'
  }
})

const iconStyles = theme => ({
  inputIcon: {
    marginRight: 5,
    objectFit: 'contain'
  },
  inputIconRemove: {
    marginLeft: 5,
    padding: 0
  }
})

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    marginBottom: 20
  },
  avatar: {
    minWidth: 118,
    minHeight: 118,
    maxWidth: 118,
    maxHeight: 118,
    display: 'block',
    borderRadius: '100%',
    objectFit: 'cover'
  },
  inputLabel: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    fontSize: 12,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.colors['black'],
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    cursor: 'pointer',
    zIndex: 0,
    '&:focus-within': {
      outline: '-webkit-focus-ring-color auto 5px'
    },
    overflowWrap: 'anywhere'
  },
  input: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  }
})

const ImgPreview = withStyles(imgPreviewStyles)(({ classes }) => (
  <div className={classes.previewFigure}>
    <span className={classes.previewHead} />
    <span className={classes.previewBody} />
  </div>
))

const StateButton = withStyles(iconStyles)(
  ({ classes, file, label, onRemove }) => {
    if (file) {
      const fileName = file && file.name ? file.name.split('.')[0] : ''
      return (
        <>
          <span>{fileName}</span>
          <IconButton
            aria-label="remove"
            title="Remove"
            onClick={onRemove}
            className={classes.inputIconRemove}
          >
            <CancelIcon />
          </IconButton>
        </>
      )
    }
    return (
      <>
        <UploadIcon className={classes.inputIcon} />
        <span>{label}</span>
      </>
    )
  }
)

const UploadPicture = ({ classes, setError, ...props }) => {
  const inputRef = React.useRef()
  const [image, setImage] = React.useState(props.value)

  const handleChange = e => {
    const nextFile = e.target.files[0]
    if (nextFile) {
      if(nextFile.size > MAX_UPLOAD_SIZE){
        setError('File exceeds maximum size of 5MB, please use a smaller image')
        inputRef.current.firstChild.value = ''
        return
      }
      setImage(URL.createObjectURL(nextFile))
      props.setFieldValue('avatar', nextFile)
    }
  }

  const handleRemove = e => {
    e.preventDefault()

    if (inputRef.current) {
      // clear input value
      inputRef.current.firstChild.value = ''
    }
    setImage('') // clear image preview
    props.setFieldValue('avatar', '') // clear props value
  }

  const imagePreview = props.value ? (
    <img className={classes.avatar} src={image} alt="Your uploaded avatar" />
  ) : (
    <ImgPreview />
  )

  return (
    <div className={classes.root}>
      {imagePreview}
      <label
        htmlFor={props.id}
        className={classes.inputLabel}
        aria-label={props.label}
        title={props.label}
      >
        <InputBase
          type="file"
          id={props.id}
          name={props.name}
          onChange={handleChange}
          className={classes.input}
          accept=".png, .jpg, .jpeg"
          ref={inputRef}
        />
        <StateButton
          file={props.value}
          label={props.label}
          onRemove={handleRemove}
        />
      </label>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setError: (err) => dispatch(setError(err))
})

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles)
)(UploadPicture)
