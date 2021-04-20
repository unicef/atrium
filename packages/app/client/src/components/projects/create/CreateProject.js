import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import { FirstProjectForm } from './components'
import {
  createProject,
  deleteFileFromProject,
  editProject
} from '../../../actions/projectActions'
import { refreshToken } from '../../../actions/authActions'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  titleOfPage: {
    textAlign: 'center',
    fontSize: '120%'
  },
  cancelButton: {
    position: 'absolute',
    right: 0,
    marginRight: 13,
    '&:focus': {
      outline: '-webkit-focus-ring-color auto 1px'
    }
  },
  cancelIcon: {
    display: 'flex',
    height: 35,
    width: 35
  }
})

function CreateProject(props) {
  const [dynamicFormData, setDynamicFormData] = useState({
    projectId: props._id,
    projectName: props.name || '',
    projectDescription: props.details || '',
    websiteLink: props.websiteLink || '',
    blockchainType: props.blockchainType || '',
    blockchainName: props.blockchainName || '',
    freeForAll: props.freeForAll || false,
    stageOfProject: props.stageOfProject || '',
    innovationCategory: props.innovationCategory || '',
    thematicArea: props.thematicArea || '',
    contactPersonFullName: props.contactPersonFullName || '',
    contactPersonEmail: props.contactPersonEmail || '',
    attachment: props.attachment || null,
    documents: props.documents || [],
    photos: props.photos || [],
    videos: props.videos || [],
  })

  const { auth, classes } = props
  const handleCreateProject = async (data, editting) => {
    const {
      projectName,
      projectDescription,
      attachment,
      blockchainType,
      blockchainName,
      freeForAll,
      stageOfProject,
      innovationCategory,
      thematicArea,
      contactPersonFullName,
      contactPersonEmail,
      documents,
      videos,
      photos
    } = data
    const { projectId } = dynamicFormData
    await setDynamicFormData(prev => ({ ...prev, ...data }))
    const formData = new FormData()
    if (attachment) {
      formData.append('attachment', attachment)
    }
    if (documents) {
      formData.append('documents', documents)
    }
    if (photos) {
      formData.append('photos', photos)
    }
    if (videos) {
      formData.append('videos', videos)
    }
    formData.append('name', projectName)
    formData.append('details', projectDescription)
    formData.append('owner', auth.user.id)
    formData.append('projectOwner', auth.user.name)
    formData.append('projectOwnerEmail', auth.user.email)
    formData.append('blockchainName', blockchainName)
    formData.append('blockchainType', blockchainType)
    formData.append('freeForAll', freeForAll)
    formData.append('stageOfProject', stageOfProject)
    formData.append('innovationCategory', innovationCategory)
    formData.append('thematicArea', thematicArea)
    if (contactPersonFullName) {
      formData.append('contactPersonFullName', contactPersonFullName)
    } else {
      formData.append('contactPersonFullName', auth.user.name)
    }
    if (contactPersonEmail) {
      formData.append('contactPersonEmail', contactPersonEmail)
    } else {
      formData.append('contactPersonEmail', auth.user.email)
    }
    if (props.auth.user.badges['2']) {
      formData.append('address', '')
    } else {
      formData.append('address', auth.user.address)
    }
    if (editting) {
      await props.editProject(projectId, formData, () => {
        window.location.reload()
      })
    } else {
      await props.createProject(formData, () => {
        window.location.replace(`/view-projects`)
      })
    }
    props.refreshToken()
  }
  return (
    <Container>
      <FirstProjectForm
        formData={dynamicFormData}
        handleCreateProject={handleCreateProject}
        editting={props.editting}
        deleteFileFromProject={props.deleteFileFromProject}
        refreshToken={props.refreshToken}
      />
    </Container>
  )
}

CreateProject.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  createProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  refreshToken: PropTypes.func.isRequired,
  deleteFileFromProject: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  connect(mapStateToProps, {
    refreshToken,
    createProject,
    editProject,
    deleteFileFromProject
  }),
  withStyles(styles)
)(CreateProject)
