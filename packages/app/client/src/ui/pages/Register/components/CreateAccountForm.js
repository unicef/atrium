import React from 'react'
import { SimpleFormWithHeader } from '../../../organisms'
import proptypes from 'prop-types'
import { useIsMobileViewPort } from '../../../hooks'

const CreateAccountForm = ({ onSubmit, formProps }) => {
  const isMobileViewPort = useIsMobileViewPort()
  
  if (!formProps) {
    return null
  }

  return (
    <SimpleFormWithHeader
      onSubmit={onSubmit}
      {...formProps}
      subtitle={isMobileViewPort ? "" : formProps.subtitle}
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