const validateProjectForm = ({ values, editing }) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Project name is required'
  }
  if (!values.details) {
    errors.details = 'Project description is required'
  }
  if (values.details && values.details.length > 250) {
    errors.details =
      'Description must be no longer than 250 characters'
  }
  if (!values.blockchainType) {
    errors.blockchainType = 'Blockchain type is required'
  }
  if (!values.attachment) {
    errors.attachment = 'Project photo is required'
  }
  if (!values.blockchainName) {
    errors.blockchainName = 'Blockchain name is required'
  }
  if (!values.stageOfProject) {
    errors.stageOfProject = 'Stage of project is required'
  }
  if (!values.innovationCategory) {
    errors.innovationCategory = 'Innovation category is required'
  }
  if (!values.country) {
    errors.country = 'Country is required'
  }
  if (!values.organization) {
    errors.organization = 'Organization is required'
  }
  if (!values.thematicArea) {
    errors.thematicArea = 'Thematic area is required'
  }
  if (
    values.contactPersonEmail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      values.contactPersonEmail
    )
  ) {
    errors.contactPersonEmail = 'Invalid email address'
  }
  if (!values.contactPersonEmail) {
    errors.contactPersonEmail =
      'Please also fill out project contact person email'
  }
  if (!values.contactPersonFullName) {
    errors.contactPersonFullName =
      'Please also fill out project contact person name'
  }
  return errors
}

export default validateProjectForm
