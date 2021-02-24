import React from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter, Link as RouterLink } from 'react-router-dom'
import get from 'lodash/get'

import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'

import { Button, TextField } from '../../ui'
import { loginUser } from '../../actions/authActions'
import JoinModal from '../layout/Landing/JoinModal'
import { useRegisterModal, useRedirectIfAuthenticated } from './hooks'

const styles = theme => ({
  main: {
    maxWidth: 475,
    marginTop: 50
  },
  title: {
    fontSize: 21,
    fontFamily: 'Roboto',
    color: theme.colors['dark-forest-green'],
    marginBottom: 45
  }
})

const LoginPage = props => {
  useRedirectIfAuthenticated(props.history, props.auth)
  const { handleCloseJoinModal, isOpenJoinModal } = useRegisterModal(props.history, '/login')
  const redirectedFromResetPassword = get(props, 'history.location.state.redirectedFrom', false) === 'reset-password'

  return (
    <Container component="main" className={props.classes.main}>
      <JoinModal isOpen={isOpenJoinModal} handleClose={handleCloseJoinModal} />
      <Typography component="h1" className={props.classes.title}>
        {redirectedFromResetPassword
          ? 'Password reset was successful. To Sign in, please enter you email and password.'
          : 'Please provide your registered email id and password to sign in'}
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'required'
          }
          if (!values.password) {
            errors.password = 'required'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await props.loginUser(values)
          setSubmitting(false)
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  id="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.email && errors.email)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="password"
                  id="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.password && errors.password)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Grid>
              <Grid
                container
                justify="space-between"
                style={{ marginTop: 10, padding: 8 }}
              >
                <Grid item>
                  <Link component={RouterLink} variant="body2" to="#register">
                    Sign up
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={RouterLink}
                    variant="body2"
                    to="/forgot-password"
                  >
                    Forgot password
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </Container>
  )
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  withRouter,
  connect(mapStateToProps, { loginUser }),
  withStyles(styles)
)(LoginPage)
