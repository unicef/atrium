import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { SimpleFormWithHeader } from '../organisms'
import { Button, Title } from '../atoms'
import { password } from '../../utils/formFields'
import { useContainerStyle, useToast } from '../hooks'
import { validatePassword } from '../../utils/validators'
import { resetPassword } from '../../api/users'

const formProps = {
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

const ForgotPassword = ({ history, match }) => {
  const { params: { token } } = match

  if(!token){
    history.push('/')
  }

  const [showSuccess, setSuccess] = useState(false)
  const containerStyle = useContainerStyle({ size: 'small' })
  const { showToast } = useToast()
  
  const saveNewPassword = async ({ password }) => {
    try {
      await resetPassword({ password, token })
      setSuccess(true)
    } catch(e) {
      showToast({ message: e, severity: 'danger' })
      setSuccess(true)
    }
  }

  return (
    <Container component="main" className={containerStyle}>
      {showSuccess ?
        <Grid direction="column" container item xs={12} justify="center" alignItems="center">
          <Title >
            New password saved
          </Title>
          <Button type="submit" color="primary" onClick={() => history.push('/login')}>
            Log in
          </Button>
        </Grid> :
        <SimpleFormWithHeader
          onSubmit={saveNewPassword}
          {...formProps}
        /> 
      }
    </Container>
  )
}

export default ForgotPassword
