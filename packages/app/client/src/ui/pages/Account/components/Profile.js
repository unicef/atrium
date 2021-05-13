import React from 'react'
import { SimpleFormWithHeader } from '../../../organisms'
import {
  name,
  bio,
  role,
  organization,
  website
} from '../../../../utils/formFields'
import { MainContainer } from '../../../templates'

function Profile(props) {
  const fields = [
    { ...name, initialValue: props.name || '' },
    { ...bio, initialValue: props.bio || '' },
    { ...role, initialValue: props.role || '' },
    { ...organization, initialValue: props.organization || '' },
    website
  ]

  return (
    <MainContainer size="small" mt="-50px" margin="0">
      <SimpleFormWithHeader
        fields={fields}
        title="Profile"
        submitLabel="Save changes"
        titleProps={{ align: 'left' }}
        buttonLayout={{ xs: 4 }}
      />
    </MainContainer>
  )
}

export default Profile
