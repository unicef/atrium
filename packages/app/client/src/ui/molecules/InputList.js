import React from 'react'
import Grid from '@material-ui/core/Grid'
import { TextInput, PasswordField, Checkbox } from '../atoms'
import { baseInputsProps, checkboxWithLinks } from '../../utils/formUtils'
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
        InputComponent: TextInput,
        getProps: baseInputsProps
      }
    case 'checkbox':
      const hasLinks = Array.isArray(links)
      return {
        InputComponent: hasLinks ? CheckboxWithLinks : Checkbox,
        getProps: hasLinks ? checkboxWithLinks : baseInputsProps
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
