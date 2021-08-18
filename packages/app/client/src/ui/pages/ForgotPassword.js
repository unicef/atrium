import React, { useState } from 'react'
import { SimpleFormWithHeader } from '../organisms'
import { email } from '../../utils/formFields'
import { useToast } from '../hooks'
import { validateEmail } from '../../utils/validators'
import { sendForgotPasswordEmail } from '../../api/users'
import { EmailSent } from './Register/components'
import { MainContainer } from '../templates'

const formProps = {
  title: "Forgot password",
  titleProps: {
    alignMobile: "left",
    align: "center"
  },
  validate: ({ email }) => validateEmail(email),
  submitLabel: 'Reset password',
  fields: [email],
  buttonLayout: { xs: 12 }
}

const ForgotPassword = () => {
  const [emailSent, showEmailWasSent] = useState(false)
  const [verifiedEmail, saveEmail] = useState(undefined)
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

  return (
    <MainContainer size="small">
      {emailSent ?
        <EmailSent email={verifiedEmail} action={sendForgotPasswordEmail} /> :
        <SimpleFormWithHeader
          onSubmit={verifyEmail}
          {...formProps}
        />
      }
    </MainContainer>
  )
}

export default ForgotPassword
