import React from 'react'
import Box from '@material-ui/core/Box'
import { MainContainer } from '../templates'
import { SimpleFormWithHeader } from '../organisms'
import { BackArrow } from '../molecules'
import {
  password,
  currentPassword,
  confirmPassword
} from '../../utils/formFields'
import {
  validateConfirmPassword,
  validatePassword
} from '../../utils/validators'
import { changeUserPassword } from '../../api/users'
import { useHistory } from 'react-router-dom'
import { useToast } from '../hooks'

function ChangePassword(props) {
  const fields = [
    currentPassword,
    {
      ...password,
      label: 'New password'
    },
    confirmPassword
  ]
  const validate = ({ password, confirmPassword }) => {
    return {
      ...validatePassword(password),
      ...validateConfirmPassword(password, confirmPassword)
    }
  }
  const history = useHistory()
  const { showToast } = useToast()
  const submitHandler = async ({ currentPassword, password }) => {
    try {
      await changeUserPassword(currentPassword, password)
      showToast({ message: 'Password changed', severity: 'success' })
      history.push('profile')
    } catch (e) {
      showToast({ message: e.message, severity: 'danger' })
    }
  }
  return (
    <MainContainer size="small">
      <Box mb="20px">
        <BackArrow handleClick={() => history.goBack()} />
      </Box>
      <SimpleFormWithHeader
        onSubmit={submitHandler}
        submitLabel="Save password"
        title="Change password"
        fields={fields}
        validate={validate}
      />
    </MainContainer>
  )
}

export default ChangePassword
