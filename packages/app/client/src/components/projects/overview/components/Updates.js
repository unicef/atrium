import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { editProject } from '../../../../actions/projectActions'
import { refreshToken } from '../../../../actions/authActions'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import UpdatesForm from './UpdatesForm'

function Updates(props) {
  const [dynamicFormData, setDynamicFormData] = useState({
    projectId: props._id,
    updates: props.updates || []
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
        <UpdatesForm
          formData={dynamicFormData}
          handleCreateProject={handleCreateProject}
        />
      </div>
    </Container>
  )
}

Updates.propTypes = {
  editProject: PropTypes.func.isRequired,
  refreshToken: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  connect(mapStateToProps, { refreshToken, editProject }),
)(Updates)
