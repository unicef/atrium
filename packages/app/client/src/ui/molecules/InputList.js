import React from 'react'
import Grid from '@material-ui/core/Grid'
import { TextField, PasswordField, CheckboxField } from '../atoms'
import { baseInputsProps } from '../../utils/formUtils'
import CheckboxWithLinks from './CheckboxWithLinks'

const getInput = ({ type, links }) => {
  switch(type) {
    case 'password':
      return {
        InputComponent: PasswordField,
        getProps: baseInputsProps
      }
    case 'text':
    case 'email':
      return {
        InputComponent: TextField,
        getProps: baseInputsProps
      }
    case 'checkbox':
      const hasLinks = Array.isArray(links)
      return {
        InputComponent: hasLinks ? CheckboxWithLinks : CheckboxField,
        getProps: baseInputsProps
      }
    default:
      return {}
  }
}

const InputList = ({ fields, formProps }) => (
  fields.map(({ gridProps = { xs: 12 }, ...fieldsProps }) => {
                
    const { InputComponent, getProps } = getInput(fieldsProps)

    return (
      InputComponent && 
      <Grid key={fieldsProps.id} item {...gridProps}>
        <InputComponent {...getProps({ ...fieldsProps, formProps })} />
      </Grid>
    )
  })
)

export default InputList
