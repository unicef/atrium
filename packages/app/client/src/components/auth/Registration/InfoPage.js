import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'
import { Formik } from 'formik'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { AGENCIES_LIST } from '../../../unin-constants'
import { registerUser } from '../../../actions/authActions'
import { Button, TextField } from '../../../ui'
import { LimitedHeader } from '../../layout/Header'
import { getEmailHash } from './libs/get-email-hash'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
  titleOfHeader: {
    fontSize: 16,
    color: theme.colors['black-two'],
    letterSpacing: 1.8,
    textTransform: 'uppercase'
  },
  main: {
    maxWidth: 475,
    marginTop: 50
  },
  title: {
    fontSize: 21,
    fontFamily: 'Roboto',
    color: theme.colors['dark-forest-green'],
    marginBottom: 45
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    flex: 1
  }
})

const InfoPage = ({ classes, auth, submitStage, ...props }) => {
  const [optIn, setOptIn] = useState(true)
  return (
    <Formik
      initialValues={{
        avatar: '',
        name: '',
        company: 'UNICEF',
        role: '',
        password: '',
        password2: ''
      }}
      validate={values => {
        const errors = {}
        if (!values.name) {
          errors.name = 'This field is required'
        }
        if (!values.password) {
          errors.password = 'This field is required'
        }
        if (!values.password2) {
          errors.password2 = 'This field is required'
        }
        if (values.password !== values.password2) {
          errors.password2 = 'Please ensure that your passwords match'
        }
        if (!values.role) {
          errors.role = 'This field is required'
        }
        if (!(values.password.length >= 6)) {
          errors.password =
            'Length of password must be greater than 6 characters'
        }
        return errors
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const formData = new FormData()
        if (values.avatar) {
          formData.append('avatar', values.avatar)
        }
        formData.append('name', values.name)
        formData.append('password', values.password)
        formData.append('password2', values.password2)
        formData.append('emailHash', getEmailHash(props.location.search))
        formData.append('role', values.role)
        formData.append('company', values.company)

        try {
          const params = new URLSearchParams(window.location.search)
          const invitationCode = params.get('code')
          formData.append('invitationCode', invitationCode)
          props.registerUser(formData, submitStage)
        } catch (e) {
          console.error(e)
        } finally {
          setSubmitting(false)
        }
      }}
      render={({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <LimitedHeader
            title="The Atrium"
            titleProps={{
              component: 'h1',
              variant: 'h6',
              className: classes.titleOfHeader
            }}
          />

          <Container component="main" className={classes.main}>
            <Typography component="h1" className={classes.title}>
              Welcome to The Atrium!
              <br />
              Let’s get started by creating your profile.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  name="company"
                  id="company"
                  value={values.company}
                  onChange={handleChange}
                  fullWidth
                >
                  {AGENCIES_LIST.map(agency => (
                    <MenuItem value={agency.shortName}>
                      {agency.shortName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  label="Your full name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.name && touched.name)}
                  errorMessage={errors.name}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="role"
                  name="role"
                  label="Your role in the organisation"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.role && touched.role)}
                  errorMessage={errors.role}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="password"
                  id="password"
                  label="Create password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.password && touched.password)}
                  errorMessage={errors.password}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="password2"
                  id="password2"
                  label="Confirm password"
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.password2 && touched.password2)}
                  errorMessage={errors.password2}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={optIn}
                      onChange={() => {
                        setOptIn(!optIn)
                      }}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="By selecting this box, I agree to receive communications from The Atrium"
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: '1em' }}>
                <Button
                  type="submit"
                  color="primary"
                  size="small"
                  disabled={isSubmitting || !optIn}
                  style={{ width: '100%' }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
      )}
    />
  )
}

InfoPage.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  withRouter,
  connect(mapStateToProps, { registerUser }),
  withStyles(styles)
)(InfoPage)
