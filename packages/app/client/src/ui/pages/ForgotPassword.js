import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { SimpleFormWithHeader } from '../organisms'
import { password } from '../../utils/formFields'
import { useContainerStyle } from '../hooks'

const formProps = {
  title: "Forgot password",
  titleProps: {
    alignMobile: "left",
    align: "center"
  },
  validate: () => {},
  submitLabel: 'Reset password',
  fields: [password],
  buttonLayout: { xs: 8, sm: 8 }
}

const ForgotPassword = () => {
  const [showSuccess, setSuccess] = useState(false)
  const containerStyle = useContainerStyle({ size: 'small' })

  return (
    <Container component="main" className={containerStyle}>
      <SimpleFormWithHeader
        onSubmit={() => {}}
        {...formProps}
      />
    </Container>
  )
}

export default ForgotPassword
