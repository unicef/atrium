import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  navLink: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    padding: '17px 8px',
    fontSize: 14,
    fontFamily: 'Roboto',
    height: 41,
    marginRight: 5,
    lineHeight: 1.5,
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme.colors['light-green'],
    }
  },
})

const ProfilePictureHeader = withStyles(styles)(({ user, classes }) => {
  return (
      <NavLink
        to={'/profile'}
        className={classes.navLink}
      >
      <ImgPreview avatar={user.avatar} />
      {user.name}
      </NavLink>
  )
})

ProfilePictureHeader.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object
}

const imgPreviewStyles = theme => ({
  previewFigure: {
    position: 'relative',
    backgroundColor: theme.colors['dark-forest-green'],
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginRight: '7px'
  },
  previewHead: {
    position: 'absolute',
    display: 'block',
    top: 7,
    left: '50%',
    height: 12,
    width: 12,
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    borderRadius: '100%'
  },
  previewBody: {
    position: 'absolute',
    display: 'block',
    bottom: -10,
    left: '50%',
    height: 20,
    width: 20,
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    borderRadius: '100%'
  }
})

const ImgPreview = withStyles(imgPreviewStyles)(({ avatar, classes }) => (
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
  </div>
))

ImgPreview.propTypes = {
  avatar: PropTypes.string,
  classes: PropTypes.object
}

export default ProfilePictureHeader