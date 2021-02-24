import React from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter, Link as RouterLink } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'

import { Button, TextField } from '../../ui'
import { QueryReceivedImg } from '../../components/projects/assets'
import { loginUser } from '../../actions/authActions'
import JoinModal from '../layout/Landing/JoinModal'
import ResponseModal from '../ResponseModal/ResponseModal'
import { ERRORS } from '../../actions/authActions'
import { useRegisterModal, useRedirectIfAuthenticated, useResponseModal } from './hooks'
import { sendForgotPasswordEmail } from '../../api/users'

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

const ForgotPassword = props => {
  useRedirectIfAuthenticated(props.history, props.auth)
  const { handleCloseJoinModal, isOpenJoinModal } = useRegisterModal(props.history, '/forgot-password')
  const {
    isResponseModalOpen,
    response,
    handleCloseResponseModal,
    dispatch,
    RESPONSE_MODAL_ACTIONS
  } = useResponseModal(props.history, '/')

  return (
    <Container component="main" className={props.classes.main}>
      <ResponseModal
        img={QueryReceivedImg}
        imgAlt="Recover password email sent"
        response={response}
        handleClose={handleCloseResponseModal}
        isOpen={isResponseModalOpen}
      />
      <JoinModal isOpen={isOpenJoinModal} handleClose={handleCloseJoinModal} />
      <Typography component="h1" className={props.classes.title}>
        To reset your password please enter your registered email id.
      </Typography>
      <Formik
        initialValues={{
          email: ''
        }}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'required'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await handleSubmit(values, dispatch, RESPONSE_MODAL_ACTIONS)
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
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Reset Password
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
                  <Link component={RouterLink} variant="body2" to="/login">
                    Sign in
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

const handleSubmit = async (values, dispatch, actions) => {
  try {
    await sendForgotPasswordEmail(values)
    dispatch({
      type: actions.EMAIL_SENT_SUCCESS,
      payload: 'We have sent you an email with a link to reset your password'
    })
  } catch (err) {
    let errorMessage = ERRORS.GENERIC
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 403:
          errorMessage = ERRORS.AWAITING_VERIFICATION
          break
        case 404:
          errorMessage = ERRORS.EMAIL_NOT_FOUND
          break
        default:
          break
      }
    }
    dispatch({
      type: actions.ERROR,
      payload: errorMessage
    })
  }
}

ForgotPassword.propTypes = {
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
)(ForgotPassword)
