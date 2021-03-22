import React from 'react'
import { SimpleFormWithHeader } from '../../../organisms'
import proptypes from 'prop-types'
import { useIsMobileViewPort } from '../../../hooks'

const CreateAccountForm = ({ onSubmit, formProps }) => {
  const isMobileViewPort = useIsMobileViewPort()
  
  if (!formProps) {
    return null
  }

  let subtitle = formProps.subtitle

  if (isMobileViewPort) {
    subtitle = ""
  }

  return (
    <SimpleFormWithHeader
      onSubmit={onSubmit}
      {...formProps}
      subtitle={subtitle}
    />
  )
}

CreateAccountForm.propTypes = {
  onSubmit: proptypes.func
}

CreateAccountForm.defaultProps = {
  onSubmit: () => {}
}

export default CreateAccountForm