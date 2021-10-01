import { OPTIONAL_FIELDS, MANDATORY_FIELDS } from './fieldsNames'

const ALL_FIELDS = [...MANDATORY_FIELDS, ...OPTIONAL_FIELDS] //MANDATORY_FIELDS.concat(OPTIONAL_FIELDS)

const handleSubmitData = ({ values, prevValues = {} }) => {
  const formData = new FormData()
  ALL_FIELDS.forEach((key) => {
    const valueInForm = values[key]
    
    if (valueInForm !== undefined &&  valueInForm !== null && prevValues[key] !== valueInForm) {
      formData.append(key, values[key])
    }
  })
  
  return formData
}

export default handleSubmitData
