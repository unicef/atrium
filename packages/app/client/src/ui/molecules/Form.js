import React from 'react'
import { Formik, Form as FormikForm } from 'formik'
import Grid from '@material-ui/core/Grid'
import { TextField } from '../atoms'
import { Button } from '../atoms'

const Form =  ({ fields, ...props }) => {
  const initialValues = fields.reduce((values, field) => ({ ...values, [field.name]: field.initialValue }), {})

  return (
    <Formik
        initialValues={initialValues}
        validate={props.validate}
        onSubmit={props.submit}
      >
        {({errors, ...formProps}) => (
          <FormikForm>
            <Grid container spacing={2}>
              {fields.map(({ name, id, label, htmlFor, gridProps = { xs: 12 } }) => {
                return (
                  <Grid key={id} item {...gridProps}>
                    <TextField
                      name={name}
                      id={id}
                      label={label}
                      onChange={formProps.handleChange}
                      onBlur={formProps.handleBlur}
                      error={formProps.touched[name] && errors[name]}
                      fullWidth
                      htmlFor={htmlFor}
                      errorMessage={errors[name]}
                    />
                  </Grid>
                )
              })}
              
              <Grid item {...props.buttonLayout}>
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  disabled={formProps.isSubmitting || !formProps.isValid}
                >
                  {props.submitLabel}
                </Button>
              </Grid>
            </Grid>
          </FormikForm>
        )}
      </Formik>
  )
}

Form.defaultProps = {
  buttonLayout: { xs: 12 }
}

export default Form