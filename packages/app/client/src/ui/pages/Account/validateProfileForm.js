import { validateWebsite } from '../../../utils/validators'

const validateProfileForm = ({ website }) => {
  console.log(...validateWebsite(website))
  return { ...validateWebsite(website) }
}

export default validateProfileForm
