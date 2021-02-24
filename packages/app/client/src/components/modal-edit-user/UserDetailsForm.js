import React from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Button, TextField, TextButton } from '../../ui'
import UploadPicture from '../auth/components/UploadPicture'
import { AGENCIES_LIST } from '../../unin-constants'

/**
 * Get initial values for form based on user
 * If avatar is available, send the link to display it
 *
 * @param {User} user
 */
const getInitialValues = user => {
  const avatar = user.avatar || ''
  return {
    ...pick(user, ['role', 'company', 'name']),
    avatar
  }
}

export const UserDetailsForm = ({ auth, setIsChangingPassword, onSubmit }) => {
  const initialValues = getInitialValues(auth.user)
  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {}
        if (!values.name) {
          errors.name = 'required'
        }
        if (!values.role) {
          errors.role = 'required'
        }
        return errors
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const formData = new FormData()
        if (!auth.user.avatar || values.avatar !== initialValues.avatar) {
          formData.append('avatar', values.avatar)
        }
        formData.append('name', values.name)
        formData.append('role', values.role)
        formData.append('company', values.company)

        try {
          onSubmit(formData)
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
          <Typography variant="h5">Edit Profile</Typography>
          <Grid container>
            <UploadPicture
              id="avatar"
              label="Upload picture (Maximum size—5 MB)"
              value={values.avatar}
              setFieldValue={setFieldValue}
            />
          </Grid>
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
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                Save Changes
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextButton
                textContent={'I want to change my password'}
                onClick={setIsChangingPassword}
              />
            </Grid>
          </Grid>
        </form>
      )}
    />
  )
}

UserDetailsForm.propTypes = {
  auth: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setIsChangingPassword: PropTypes.func.isRequired
}
