import React from 'react'
import { Formik, Form as FormikForm } from 'formik'
import Grid from '@material-ui/core/Grid'
import { Button } from '../atoms'
import { InputList } from '../molecules'

const Form = ({ fields, children, ...props }) => {
  const initialValues = fields.reduce(
    (values, field) => ({ ...values, [field.name]: field.initialValue }),
    {}
  )

  return (
    <Formik
      initialValues={initialValues}
      validate={props.validate}
      onSubmit={props.submit}
      initialErrors={props.initialErrors}
    >
      {formProps => (
        <FormikForm>
          <Grid container spacing={2}>
            <InputList fields={fields} formProps={formProps} />

            {children}

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
