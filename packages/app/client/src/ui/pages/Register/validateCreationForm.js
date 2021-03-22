import { validatePassword } from '../../../utils/validators'

const validateCreationForm = (values) => {
  const entries = Object.entries(values)

  const errorsObj = entries.reduce((errors, [key, value]) => {
    if (!value) {
      return {...errors, [key]: 'Required' }
    }

    if (key === 'password') {
      return validatePassword(value)
    }
  }, {})

  return errorsObj
}

export default validateCreationForm
