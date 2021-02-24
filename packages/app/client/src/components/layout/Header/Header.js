import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import Link from '@material-ui/core/Link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { logoutUser } from '../../../actions/authActions'
import ProfilePictureHeader from './ProfilePictureHeader'
import Navbar from './Navbar'
import DropdownHeaderMenu from './DropdownHeaderMenu'

const exclusivePaths = ['/create-projects', '/create-polls']

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    height: 50,
    maxWidth: '100vw',
    left: 0,
    background: 'white',
    fontFamily: ['Red Hat Display', 'sans-serif'].join(','),
    zIndex: 100,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.13)'
  },
  toolBar: {
    minHeight: 50,
    paddingLeft: 0
  },
  title: {
    marginLeft: '1em',
    width: '100%',
    maxWidth: 220,
    flexGrow: 1,
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '1.8px',
    color: theme.colors['black-two'],
    textTransform: 'uppercase',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  logo: {
    background: theme.colors['shamrock-green'],
    padding: 11,
    maxWidth: 131,
    height: 50,
    marginRight: '1.3rem'
  }
})

const Header = ({ logoutUser, auth, classes, location }) => {
  if (!auth.isAuthenticated) {
    return null
  }

  if (exclusivePaths.includes(location.pathname)) {
    // exclude header from specific routes (has LimitedHeader)
    return null
  }

  return (
    <AppBar
      className={classes.root}
      square={true}
      elevation={0}
      color="default"
      position="fixed"
    >
      <Toolbar className={classes.toolBar}>
        <Link component={RouterLink} to="/" className={classes.title}>
          The Atrium (beta)
        </Link>

        <Navbar />
        <ProfilePictureHeader user={auth.user} />
        <DropdownHeaderMenu logoutUser={logoutUser}></DropdownHeaderMenu>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object,
  logoutUser: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  withRouter,
  connect(mapStateToProps, {
    logoutUser
  }),
  withStyles(styles),
  React.memo
)(Header)
