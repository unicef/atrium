import { validatePassword } from '../../../utils/validators'

const validateCreationForm = ({ password, name, surname, termsCheckbox }) => {
  const errorsObj = { ...validatePassword(password) }

  if (!name) {
    errorsObj.name = 'Name is required'
  }
  
  if (!surname) {
    errorsObj.surname = 'Surname is required'
  }

  if (!termsCheckbox) {
    errorsObj.termsCheckbox = 'You must accept the Terms and the Privacy Policy'
  }
  
  return errorsObj
}

export default validateCreationForm
