import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import ButtonBase from '@material-ui/core/ButtonBase'
import { ATRIUM_CONSTANTS } from '../../../unin-constants'
import { withModals } from '../modals'
import { CancelIcon } from '../../../ui'
import { LimitedHeader } from '../../layout/Header'
import { createProject, editProject } from '../../../actions/projectActions'
import { FirstProjectForm, SecondProjectForm } from './components'
import { refreshToken } from '../../../actions/authActions'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  main: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 40px)'
  },
  container: {
    maxWidth: 564,
    marginLeft: 'auto',
    marginRight: 'auto'
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

class NewCreateProject extends Component {
  state = {
    step: 1,
    formData: {
      projectId: this.props.projectId,
      projectName: this.props.projectName || '',
      projectOwner: this.props.projectOwner || '',
      projectOwnerEmail: this.props.projectOwnerEmail || '',
      projectUrl: this.props.projectUrl || '',
      projectDescription: this.props.projectDescription || '',
      email: this.props.auth.user.email,
      projectTags: this.props.projectTags
        ? this.props.projectTags.join(', ')
        : [],
      websiteLink: this.props.websiteLink || '',
      attachment: null
    },
    githubProfileName: ATRIUM_CONSTANTS.GITHUB_PROFILE_NAME // FIXME: load from user data
  }

  handleNextStep = (projectData, editting) => {
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        ...projectData
      }
    })
    this.handleCreateProject(editting)
  }

  handleCreateProject = async editting => {
    const {
      projectId,
      projectName,
      projectUrl,
      projectDescription,
      projectTags,
      projectOwner,
      projectOwnerEmail,
      email,
      attachment,
      websiteLink
    } = this.state.formData

    const formData = new FormData()
    if (attachment) {
      formData.append('attachment', attachment)
    }
    formData.append('name', projectName)
    formData.append('details', projectDescription)
    formData.append('tags', projectTags)
    formData.append('linkToRepository', projectUrl)
    formData.append('websiteLink', websiteLink)
    formData.append('email', email)
    formData.append('projectOwner', projectOwner)
    formData.append('projectOwnerEmail', projectOwnerEmail)

    if (this.props.auth.user.badges['2']) {
      formData.append('address', '')
    } else {
      formData.append('address', this.props.auth.user.address)
    }

    if (editting) {
      await this.props.editProject(projectId, formData, () => {
        window.location.reload()
      })
    } else {
      await this.props.createProject(
        formData,
        this.props.modals.openSuccUploaded
      )
    }
    this.props.refreshToken()
  }

  render() {
    const { step, formData, githubProfileName } = this.state
    const { auth, classes, modals } = this.props

    return (
      <Container className={classes.main} component="main">
        {/*<div className={classes.container}>*/}
        {/*<LimitedHeader*/}
        {/* title={this.props.editting ? 'Update Project' : 'Create project'}*/}

        {/*  action={*/}
        {/*    <ButtonBase*/}
        {/*      aria-label="Cancel project creation"*/}
        {/*      className={classes.cancelButton}*/}
        {/*      onClick={e => {*/}
        {/*        this.props.editting*/}
        {/*          ? this.props.setEditting(false)*/}
        {/*          : modals.openCancelUploadProject(e)*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <CancelIcon className={classes.cancelIcon} />*/}
        {/*    </ButtonBase>*/}
        {/*  }*/}
        {/*/>*/}
        {/*</div>*/}
        <div className={classes.container}>
          {step === 1 ? (
            <FirstProjectForm
              formData={formData}
              userName={auth.user.name}
              handleNextStep={this.handleNextStep}
              editting={this.props.editting}
              handleEditProject={this.handleEditProject}
            />
          ) : (
            <SecondProjectForm
              githubProfileName={githubProfileName}
              onCreateProject={this.handleCreateProject}
            />
          )}
        </div>
      </Container>
    )
  }
}

NewCreateProject.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  createProject: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  withModals,
  connect(mapStateToProps, { refreshToken, createProject, editProject }),
  withStyles(styles)
)(NewCreateProject)
