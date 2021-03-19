import React from 'react'
import { Formik, Form as FormikForm } from 'formik'
import Grid from '@material-ui/core/Grid'
import { Button, TextField, PasswordField } from '../atoms'
import { textInputsProps } from '../../utils/formUtils'

const getInput = (type) => {
  switch(type) {
    case 'password':
      return {
        InputComponent: PasswordField,
        getProps: textInputsProps
      }
    case 'text':
      return {
        InputComponent: TextField,
        getProps: textInputsProps
      }
    default:
      return {
        InputComponent: null,
      }
  }
}

const Form =  ({ fields, ...props }) => {
  const initialValues = fields.reduce((values, field) => ({ ...values, [field.name]: field.initialValue }), {})

  return (
    <Formik
        initialValues={initialValues}
        validate={props.validate}
        onSubmit={props.submit}
      >
        {(formProps) => (
          <FormikForm>
            <Grid container spacing={2}>
              {fields.map(({ gridProps = { xs: 12 }, ...fieldsProps }) => {
                
                const { InputComponent, getProps } = getInput(fieldsProps.type)
                
                return (
                  InputComponent && 
                  <Grid key={fieldsProps.id} item {...gridProps}>
                    <InputComponent
                      {...getProps({ formProps, ...fieldsProps })}
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