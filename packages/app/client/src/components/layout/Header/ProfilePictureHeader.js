import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Typography, withStyles } from '@material-ui/core'

const styles = theme => ({
  navLink: {
    textDecoration: 'none',
    color: 'black',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: theme.colors['light-green']
    },
    marginRight: theme.spacing(1.5)
  }
})

const ProfilePictureHeader = withStyles(styles)(({ user, classes }) => {
  return (
    <NavLink to={'/profile/dashboard'} className={classes.navLink}>
      <Typography>My account</Typography>
    </NavLink>
  )
})

ProfilePictureHeader.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object
}

export default ProfilePictureHeader
