import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { editProject } from '../../../../actions/projectActions'
import { refreshToken } from '../../../../actions/authActions'
import AdditionalInformationForm from './AdditionalInformationForm'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'

function AdditionalInformation(props) {
  const [dynamicFormData, setDynamicFormData] = useState({
    projectId: props._id,
    country: props.country || '',
    organization: props.organization || '',
    launchDateMonth: props.launchDateMonth || '',
    launchDateYear: props.launchDateYear || '',
    numberOfNodes: props.numberOfNodes || '',
    license: props.license || '',
    linkToRepository: props.linkToRepository || '',
    websiteLink: props.websiteLink || ''
  })

  const handleCreateProject = async data => {
    const { projectId } = dynamicFormData
    await setDynamicFormData(prev => ({ ...prev, ...data }))
    await props.editProject(projectId, data, () => {
      window.location.reload()
    })
    props.refreshToken()
  }

  return (
    <Container>
      <div>
        <AdditionalInformationForm
          formData={dynamicFormData}
          handleCreateProject={handleCreateProject}
        />
      </div>
    </Container>
  )
}

AdditionalInformation.propTypes = {
  editProject: PropTypes.func.isRequired,
  refreshToken: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  connect(mapStateToProps, { refreshToken, editProject }),
)(AdditionalInformation)
