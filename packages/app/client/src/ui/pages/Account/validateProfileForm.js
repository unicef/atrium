import { validateWebsite } from '../../../utils/validators'

const validateProfileForm = ({ website }) => {
  return { ...validateWebsite(website) }
}

export default validateProfileForm
