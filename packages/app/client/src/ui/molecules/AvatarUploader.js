import React from 'react'
import { Avatar, Button } from '../atoms'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  fileInput: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  },
  fileInputLabel: {
    cursor: 'pointer'
  },
  addFileButton: {
    marginRight: '5%'
  },
  clarification: {
    color: '#919492',
    marginTop: '3%'
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center'
  }
}))

function AvatarUploader({ avatar, setAvatar, editting }) {
  const classes = useStyles()

  const inputRef = React.useRef(null)

  return (
    <>
      <div className={classes.avatarSection}>
        <input
          ref={inputRef}
          disabled={!editting}
          type="file"
          id="avatar"
          name="avatar"
          className={classes.fileInput}
          onChange={e => {
            setAvatar(e.target.files[0])
          }}
        />
        <Button
          className={classes.addFileButton}
          disabled={!editting}
          color="primary"
          onClick={e => {
            e.preventDefault()
            inputRef.current.click()
          }}
        >
          <label
            htmlFor="avatar"
            className={classes.fileInputLabel}
            aria-label="ATTACH FILE"
            title="ATTACH FILE"
          >
            Change avatar
          </label>
        </Button>
        {typeof avatar === 'string' ? (
          <Avatar src={avatar} />
        ) : (
          <Typography>{avatar.name}</Typography>
        )}
      </div>
      <Typography className={classes.clarification} variant="body1">
        Upload a photo of size 50 by 50 less then 10mb
      </Typography>
    </>
  )
}

export default AvatarUploader
