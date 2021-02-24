import React from 'react'
import { Formik } from 'formik'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import get from 'lodash/get'

import { ConfirmIdentity } from '../assets'
import { TextField, Button, CommonModal } from '../../../ui'
import { Fade } from '@material-ui/core'
import { ATRIUM_CONSTANTS } from '../../../unin-constants'
import { ERRORS } from '../../../actions/authActions'
import { sendEmailToSignUp } from '../../../api/users'
import ResponseModal from '../../ResponseModal/ResponseModal'

const useStyles = makeStyles(theme => ({
  content: {
    padding: '40px 45px 45px 45px',
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    width: '100%',
    marginBottom: 10
  },
  link: {
    width: 'max-content',
    fontSize: 12,
    fontFamily: 'Roboto',
    textDecoration: 'none',
    lineHeight: 2,
    color: theme.colors['black']
  }
}))

const JoinForm = props => {
  const classes = useStyles()
  return (
    <div className={classes.content}>
      <Typography
        component="p"
        variant="h4"
        color="secondary"
        style={{ marginBottom: 7 }}
      >
        Sign up with your UN email address
      </Typography>
      <Typography component="p" variant="body1" style={{ marginBottom: 25 }}>
        The Atrium is a blockchain platform exclusively for the UN community
      </Typography>
      <Formik
        initialValues={{
          email: ''
        }}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Required'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await sendEmailToSignUp(values)
            props.showResponseModal({message: [
              <p>An email has been sent to you. Please check your inbox and confirm your registration. </p>,
              "If you do not receive an email within 5 minutes ", <strong>please check your junk folder, move the email to your inbox and click the registration link </strong>, " to proceed.",
              <p>If you continue to have issues, contact blockchain@uninnovation.network.</p>]})
          } catch (error) {
            props.showResponseModal({
              message: get(error, 'response.data.err', ERRORS.GENERIC),
              error: true
            })
          }
        }}
        render={({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting
        }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} style={{ marginBottom: 30 }}>
                <TextField
                  type="email"
                  name="email"
                  id="email"
                  label="Enter your UN email address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.email && touched.email)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting || !!(errors.email && touched.email)}
                >
                  Sign up
                </Button>
              </Grid>
              <Fade in={!!errors.common} style={{ marginTop: 15 }}>
                <Typography component="span" color="error" variant="subtitle1">
                  {errors.common}
                </Typography>
              </Fade>
            </Grid>
          </form>
        )}
      />
      <a
        href={`mailto:${ATRIUM_CONSTANTS.ATRIUM_EMAIL_CONTACT}`}
        component={RouterLink}
        className={classes.link}
      >
        For assistance, please email blockchain@uninnovation.network
      </a>
    </div>
  )
}

class JoinModal extends React.Component {
  state = {
    response: null,
    error: false
  }

  componentDidUpdate(prevProps, prevState) {
    // clear response before open modal again
    if (prevState.response && !prevProps.isOpen && this.props.isOpen) {
      this.setState({ response: null })
    }
  }

  handleShowResponseModal = ({ message, error = false }) => {
    this.setState({ response: message, error })
  }

  render() {
    const { response, error } = this.state
    const { isOpen, handleClose } = this.props
    const hasResponseContent = !!response

    return !hasResponseContent ? (
      <CommonModal
        open={isOpen}
        onClose={handleClose}
        style={{ maxWidth: 500 }}
      >
        <JoinForm showResponseModal={this.handleShowResponseModal} />
      </CommonModal>
    ) : (
      <ResponseModal
        img={ConfirmIdentity}
        imgAlt="Confirm identity"
        response={response}
        handleClose={handleClose}
        isOpen={isOpen}
        responseTitle={ error ? 'Error creating your account' : 'Confirm your email address'}
      />
    )
  }
}

export default JoinModal
