import React from 'react'
import { MainContainer } from '../templates'
import { SimpleFormWithHeader } from '../organisms'
import { password, currentPassword } from '../../utils/formFields'

function ChangePassword(props) {
  const fields = [
    {
      ...currentPassword
    },
    {
      ...password,
      label: 'New password'
    },
    {
      ...password,
      label: 'Confirm new password'
    }
  ]
  return (
    <MainContainer size="small">
      <SimpleFormWithHeader title="Change password" fields={fields} />
    </MainContainer>
  )
}

export default ChangePassword
