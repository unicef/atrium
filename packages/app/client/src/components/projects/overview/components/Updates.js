import React from 'react'
import Container from '@material-ui/core/Container'
import { addUpdateToProject } from '../../../../actions/projectActions'
import { refreshToken } from '../../../../actions/authActions'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import UpdatesForm from './UpdatesForm'

function Updates(props) {
  const handleCreateProject = async formData => {
    const projectId = props._id
    await props.addUpdateToProject(projectId, formData)
    props.refreshToken()
    window.location.reload()
  }

  return (
    <Container>
      <UpdatesForm handleCreateProject={handleCreateProject} />
    </Container>
  )
}

Updates.propTypes = {
  addUpdateToProject: PropTypes.func.isRequired,
  refreshToken: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  connect(mapStateToProps, { refreshToken, addUpdateToProject }),
)(Updates)
