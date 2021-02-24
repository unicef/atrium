import React from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'

import { Button, TextField } from '../../ui'
import { setError } from '../../actions/errorActions'
import { useRedirectIfAuthenticated } from './hooks'
import { resetPassword } from '../../api/users'

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

const ResetPassword = props => {
  const params = new URLSearchParams(props.history.location.search)
  const token = params.get('token')
  if(!token){
    props.history.push('/learn')
  }
  useRedirectIfAuthenticated(props.history, props.auth)

  return (
    <Container component="main" className={props.classes.main}>
      <Typography component="h1" className={props.classes.title}>
        To reset your password, please enter a new password below.
      </Typography>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: ''
        }}
        validate={values => {
          const errors = {}
          if (!values.password || values.password.length < 6) {
            errors.password = true
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'required'
          }
          if (values.confirmPassword && values.confirmPassword!==values.password) {
            errors.confirmPassword = 'passwords must match'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try { 
            await resetPassword({ password: values.password, token })
            props.history.push('/login', { redirectedFrom: 'reset-password' } )
          } catch(err) {
            props.setError('Reset password link already used or expired')
          }
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
                  type="password"
                  name="password"
                  id="password"
                  label="New password"
                  value={values.password}
                  helperText={!!(touched.password && errors.password) && 'Mininum of 6 characters'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.password && errors.password)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  label="Confirm password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={!!(touched.confirmPassword && errors.confirmPassword && values.confirmPassword.length) && 'The specified passwords do not match'}
                  error={!!(touched.confirmPassword && errors.confirmPassword)}
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
                  RESET PASSWORD
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </Container>
  )
}

ResetPassword.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  setError: (err) => dispatch(setError(err))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ResetPassword)
