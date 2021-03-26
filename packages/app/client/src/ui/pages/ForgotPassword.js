import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { SimpleFormWithHeader } from '../organisms'
import { Button, Title } from '../atoms'
import { password, email } from '../../utils/formFields'
import { useContainerStyle } from '../hooks'
import { validateEmail, validatePassword } from '../../utils/validators'
import { sendForgotPasswordEmail, changeUserPassword } from '../../api/users'

const formProps = [
  {
    title: "Forgot password",
    titleProps: {
      alignMobile: "left",
      align: "center"
    },
    validate: ({ email }) => validateEmail(email),
    submitLabel: 'Reset password',
    fields: [email],
    buttonLayout: { xs: 8, sm: 8 }
  },
  {
    title: "Reset password",
    titleProps: {
      alignMobile: "left",
      align: "center"
    },
    validate: ({ password }) => validatePassword(password),
    submitLabel: 'Confirm password',
    fields: [password],
    buttonLayout: { xs: 8, sm: 8 }
  }
]

const ForgotPassword = ({ history }) => {
  const [step, changeStep] = useState(2)
  const containerStyle = useContainerStyle({ size: 'small' })

  const verifyEmail = async ({ email }) => {
    try {
      await sendForgotPasswordEmail({ email })
      changeStep(1)
    } catch(e) {
      // TODO: add handler
      console.log(e)
    }
  }
  const showSuccess = step === 2

  const saveNewPassword = async ({ password }) => {
    try {
      await changeUserPassword({ password })
      changeStep(2)
    } catch(e) {
      // TODO: add handler
      console.log(e)
    }
  }

  return (
    <Container component="main" className={containerStyle}>
      {showSuccess ?
        <Grid direction="column" container item xs={12} justify="center" alignItems="center">
          <Title >
            New password saved
          </Title>
          <Button type="submit" color="primary" onClick={() => history.push('/register')}>
            Sign in
          </Button>
        </Grid> :
        <SimpleFormWithHeader
          onSubmit={step === 0 ? verifyEmail : saveNewPassword}
          {...formProps[step]}
        /> 
      }
    </Container>
  )
}

export default ForgotPassword
