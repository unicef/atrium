import React from 'react'
import Grid from '@material-ui/core/Grid'
import { TextField, PasswordField, CheckboxField, TextArea, Select } from '../atoms'
import RadioGroup from './RadioGroup'
import { baseInputsProps } from '../../utils/formUtils'
import CheckboxWithLinks from './CheckboxWithLinks'

const getInput = ({ type, links }) => {
  switch(type) {
    case 'password':
      return PasswordField
    case 'textArea':
      return TextArea
    case 'text':
    case 'email':
      return TextField
    case 'checkbox':
      const hasLinks = Array.isArray(links)
      return hasLinks ? CheckboxWithLinks : CheckboxField
    case 'radioGroup':
      return RadioGroup
    case 'select':
      return Select
    default:
      return null
  }
}

const InputList = ({ fields, formProps }) => (
   fields.map(({ gridProps = { xs: 12 }, ...fieldsProps }) => {
                
    const InputComponent = getInput(fieldsProps)

    return (
      InputComponent && 
      <Grid key={fieldsProps.id} item {...gridProps}>
        <InputComponent {...baseInputsProps({ ...fieldsProps, formProps })} />
      </Grid>
    )
  })
)

export default InputList
