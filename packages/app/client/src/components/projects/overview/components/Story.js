import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { editProject } from '../../../../actions/projectActions'
import { refreshToken } from '../../../../actions/authActions'
import StoryForm from './StoryForm'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'

function Story(props) {
  const [dynamicFormData, setDynamicFormData] = useState({
    projectId: props._id,
    story: props.story || '',
    challenges: props.challenges || '',
    benefits: props.benefits || '',
    needs: props.needs || '',
    section: props.section || '',
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
        <StoryForm
          formData={dynamicFormData}
          handleCreateProject={handleCreateProject}
        />
      </div>
    </Container>
  )
}

Story.propTypes = {
  editProject: PropTypes.func.isRequired,
  refreshToken: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  connect(mapStateToProps, { refreshToken, editProject }),
)(Story)
