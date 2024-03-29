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
import { Button } from '../../../ui'

const exclusivePaths = ['/create-projects', '/create-polls']

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    height: 50,
    maxWidth: '100vw',
    left: 0,
    background: 'white',
    fontFamily: theme.typography.fontFamily,
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
    fontSize: '16px',
    [theme.breakpoints.down("xs")]: {
      maxWidth: 80,
      fontSize: '14px',
    },
    flexGrow: 1,

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
  },
  loginButton: {
    width: '105px',
    height: '40px',
    margin: 0,
    padding: 8
  },
  signupButton: {
    width: '105px',
    height: '40px',
    margin: '0 10px 0 0',
    padding: 8
  },
  buttons: {
    display: 'flex',
    textAlign: 'right'
  },
  titleOfHeader: {
    fontSize: 16,
    color: theme.colors['black-two'],
    letterSpacing: 1.8,
    textTransform: 'uppercase'
  }
})

const Header = ({ logoutUser, auth, classes, location, ...props }) => {

  const handleRedirectToLogin = () => {
    props.history.push('/login')
  }

  const handleRedirectToSignUp = () => {
    props.history.push('/register')
  }

  if (location.pathname === '/') {
    return null
  }

  if (exclusivePaths.includes(location.pathname)) {
    return null
  }

  // TODO: IMPROVE HEADER VARIANTS
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
          The Atrium
        </Link>
        <Navbar />
        {auth.isAuthenticated && <ProfilePictureHeader />}
        {auth.isAuthenticated && <DropdownHeaderMenu logoutUser={logoutUser} />}
        {!auth.isAuthenticated && (
          <div className={classes.buttons}>
            <Button
              color="primary"
              onClick={handleRedirectToSignUp}
              className={classes.signupButton}
            >
              Join us
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleRedirectToLogin}
              className={classes.loginButton}
            >
              Sign in
            </Button>
          </div>
        )}
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
