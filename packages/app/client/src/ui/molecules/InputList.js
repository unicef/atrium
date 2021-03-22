import React from 'react'
import Grid from '@material-ui/core/Grid'
import { TextInput, PasswordField } from '../atoms'
import { textInputsProps } from '../../utils/formUtils'

const getInput = (type) => {
  switch(type) {
    case 'password':
      return {
        InputComponent: PasswordField,
        getProps: textInputsProps
      }
    case 'text':
    case 'email':
      return {
        InputComponent: TextInput,
        getProps: textInputsProps
      }
    default:
      return null
  }
}

const InputList = ({ fields, formProps }) => (
  fields.map(({ gridProps = { xs: 12 }, ...fieldsProps }) => {
                
    const { InputComponent, getProps } = getInput(fieldsProps.type)
    
    return (
      InputComponent && 
      <Grid key={fieldsProps.id} item {...gridProps}>
        <InputComponent {...getProps({ ...fieldsProps, formProps })} />
      </Grid>
    )
  })
)

export default InputList
