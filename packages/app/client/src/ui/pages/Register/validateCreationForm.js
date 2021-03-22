import { validatePassword } from '../../../utils/validators'

const validateCreationForm = ({ values, labels }) => {
  const entries = Object.entries(values)

  const errorsObj = entries.reduce((errors, [key, value]) => {
    if (!value) {
      return {...errors, [key]: `${labels[key]} is required` }
    }
    
    if (key === 'password') {
      return validatePassword(value)
    }

    return errors
  }, {})
  
  return errorsObj
}

export default validateCreationForm
