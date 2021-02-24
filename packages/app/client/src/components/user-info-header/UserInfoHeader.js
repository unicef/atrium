import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles, InputBase } from '@material-ui/core'
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined'

const imgPreviewStyles = theme => ({
  previewFigure: {
    position: 'relative',
    backgroundColor: theme.colors['dark-forest-green'],
    minWidth: 118,
    minHeight: 118,
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
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
    height: 70,
    width: 70,
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    borderRadius: '100%'
  },
  uploadAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: '6px',
    padding: '7px',
    backgroundColor: theme.palette.primary.main,
    height: 34,
    width: 34,
    borderRadius: '50%',
    cursor: 'pointer'
  },
  uploadAvatarIcon: {
    fontSize: 20,
    color: theme.colors['white']
  }
})

const ImgPreview = withStyles(imgPreviewStyles)(
  ({ avatar, classes, onChangeAvatarClick }) => (
    <div
      style={{
        backgroundImage: avatar
          ? `url('${avatar}')`
          : ''
      }}
      className={classes.previewFigure}
      alt="User Avatar"
    >
      {avatar ? null : (
        <>
          <span className={classes.previewHead} />
          <span className={classes.previewBody} />
        </>
      )}
      {onChangeAvatarClick ? (
        <>
          <label
            htmlFor={'change-avatar'}
            className={classes.uploadAvatarButton}
          >
            <CameraAltOutlinedIcon className={classes.uploadAvatarIcon} />
          </label>
          <InputBase
            style={{ display: 'none' }}
            type="file"
            id={'change-avatar'}
            onChange={onChangeAvatarClick}
            accept=".png, .jpg, .jpeg"
          />
        </>
      ) : null}
    </div>
  )
)

ImgPreview.propTypes = {
  avatar: PropTypes.string,
  classes: PropTypes.object,
  onChangeAvatarClick: PropTypes.func
}

const UserInfoHeader = ({
  user,
  actionButton,
  iconButton,
  onChangeAvatarClick
}) => {
  return (
    <Grid container wrap="nowrap">
      <ImgPreview
        avatar={user.avatar}
        onChangeAvatarClick={onChangeAvatarClick}
      />
      <Grid
        container
        style={{
          marginLeft: 30
        }}
        direction="column"
        justify="space-between"
      >
        <div>
          <Typography component="h5" variant="h5" color={'textSecondary'}>
            {user.name}
          </Typography>
          <Typography variant="body1">
            {user.role} @{user.company}
          </Typography>
        </div>
        {actionButton}
      </Grid>
      <Grid item>{iconButton}</Grid>
    </Grid>
  )
}

UserInfoHeader.propTypes = {
  user: PropTypes.object.isRequired,
  actionButton: PropTypes.node.isRequired,
  iconButton: PropTypes.node,
  onChangeAvatarClick: PropTypes.func
}

export default UserInfoHeader
