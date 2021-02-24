import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Button, TextField } from '../../ui'

export const UserPasswordForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        password: '',
        password2: ''
      }}
      validate={values => {
        const errors = {}
        if (!values.password) {
          errors.password = 'required'
        }
        if (!values.password2) {
          errors.password2 = 'required'
        }
        if (values.password !== values.password2) {
          errors.password2 = 'Passwords must match'
        }
        return errors
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          onSubmit(values)
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
        <form onSubmit={handleSubmit}>
          <Typography variant="h5">Change Password</Typography>
          <Grid container spacing={2} style={{ marginTop: 30 }}>
            <Grid item xs={12}>
              <TextField
                type="password"
                name="password"
                id="password"
                label="New Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.password && touched.password)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                name="password2"
                id="password2"
                label="New Password"
                value={values.password2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.password2 && touched.password2)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Button
                type="submit"
                color="primary"
                disabled={errors.password || errors.password2}
                fullWidth
                onClick={handleSubmit}
              >
                Update Password
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  )
}

UserPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
