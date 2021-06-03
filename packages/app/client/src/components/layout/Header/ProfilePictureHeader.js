import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  navLink: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    lineHeight: 1.5,
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme.colors['light-green']
    },
    width: '160px'
  }
})

const ProfilePictureHeader = withStyles(styles)(({ user, classes }) => {
  return (
    <NavLink to={'/profile'} className={classes.navLink}>
      My account
    </NavLink>
  )
})

ProfilePictureHeader.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object
}

export default ProfilePictureHeader
