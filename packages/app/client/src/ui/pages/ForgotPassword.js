import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { SimpleFormWithHeader } from '../organisms'
import {  email } from '../../utils/formFields'
import { useContainerStyle, useToast } from '../hooks'
import { validateEmail } from '../../utils/validators'
import { sendForgotPasswordEmail } from '../../api/users'
import { EmailSent } from './Register/components'

const formProps = {
  title: "Forgot password",
  titleProps: {
    alignMobile: "left",
    align: "center"
  },
  validate: ({ email }) => validateEmail(email),
  submitLabel: 'Reset password',
  fields: [email],
  buttonLayout: { xs: 8, sm: 8 }
}

const ForgotPassword = () => {
  const [emailSent, showEmailWasSent] = useState(false)
  const [verifiedEmail, saveEmail] = useState(undefined)
  const containerStyle = useContainerStyle({ size: 'small' })
  const { showToast } = useToast()

  const verifyEmail = async ({ email }) => {
    try {
      await sendForgotPasswordEmail(email)
      saveEmail(email)
      showEmailWasSent(true)
    } catch(e) {
      showToast({ message: e, severity: 'danger' }) 
    }
  }

  const verifyEmail = async ({ email }) => {
    try {
      await sendForgotPasswordEmail({ email })
      saveEmail(email)
      showEmailWasSent(true)
    } catch(e) {
      showToast({ message: e, severity: 'danger' }) 
    }
  }

  return (
    <Container component="main" className={containerStyle}>
      {emailSent ?
        <EmailSent email={verifiedEmail} /> :
        <SimpleFormWithHeader
          onSubmit={verifyEmail}
          {...formProps}
        /> 
      }
    </Container>
  )
}

export default ForgotPassword
