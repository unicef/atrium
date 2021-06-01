import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { SimpleFormWithHeader } from '../organisms'
import { Button, Title } from '../atoms'
import { password } from '../../utils/formFields'
import { useQueryParams, useToast } from '../hooks'
import { validatePassword } from '../../utils/validators'
import { resetPassword } from '../../api/users'
import { MainContainer } from '../templates'

const formProps = {
  title: 'Reset password',
  titleProps: {
    alignMobile: 'left',
    align: 'center'
  },
  validate: ({ password }) => validatePassword(password),
  submitLabel: 'Confirm password',
  fields: [password],
  buttonLayout: { xs: 8, sm: 8 }
}

const ResetPassword = ({ history, match }) => {
  const { token } = useQueryParams().getEntriesObj()

  if (!token) {
    history.push('/')
  }

  const [showSuccess, setSuccess] = useState(false)
  const { showToast } = useToast()

  const saveNewPassword = async ({ password }) => {
    try {
      await resetPassword({ password, token })
      setSuccess(true)
    } catch (e) {
      showToast({ message: e, severity: 'danger' })
      setSuccess(true)
    }
  }

  return (
    <MainContainer size="small">
      {showSuccess ? (
        <Grid
          direction="column"
          container
          item
          xs={12}
          justify="center"
          alignItems="center"
        >
          <Title>New password saved</Title>
          <Button
            type="submit"
            color="primary"
            onClick={() => history.push('/login')}
          >
            Log in
          </Button>
        </Grid>
      ) : (
        <SimpleFormWithHeader onSubmit={saveNewPassword} {...formProps} />
      )}
    </MainContainer>
  )
}

export default ResetPassword
