import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import {
  PreCreateModal,
  CancelUploadModal,
  SuccessfulUploadedModal
} from '.'

export const withModals = WrappedComponent => {
  class Wrapper extends React.Component {
    state = {
      isOpenCancelUpload: false,
      isOpenPreCreate: false,
      isOpenSuccUploaded: false,
    }

    openCancelUploadProject = () => {
      this.setState({ isOpenCancelUpload: true })
    }
    closeCancelUploadProject = () => {
      this.setState({ isOpenCancelUpload: false })
    }

    openPreCreate = () => {
      this.setState({ isOpenPreCreate: true })
    }
    closePreCreate = () => {
      this.setState({ isOpenPreCreate: false })
    }

    openSuccUploaded = () => {
      this.setState({ isOpenSuccUploaded: true })
    }
    closeSuccUploaded = () => {
      // close modal and redirect from `/create-projects`
      this.setState({ isOpenSuccUploaded: false }, () => {
        this.props.history.replace('/view-projects')
      })
    }

    render() {
      const {
        isOpenCancelUpload,
        isOpenPreCreate,
        isOpenSuccUploaded
      } = this.state

      return (
        <>
          <PreCreateModal
            isOpen={isOpenPreCreate}
            onClose={this.closePreCreate}
          />

          <SuccessfulUploadedModal
            isOpen={isOpenSuccUploaded}
            onClose={this.closeSuccUploaded}
          />

          <CancelUploadModal
            isOpen={isOpenCancelUpload}
            onClose={this.closeCancelUploadProject}
          />
          {React.cloneElement(<WrappedComponent {...this.props} />, {
            modals: {
              openCancelUploadProject: this.openCancelUploadProject,
              closeCancelUploadProject: this.closeCancelUploadProject,
              openPreCreate: this.openPreCreate,
              closePreCreate: this.closePreCreate,
              openSuccUploaded: this.openSuccUploaded,
              closeSuccUploaded: this.closeSuccUploaded
            }
          })}
        </>
      )
    }
  }

  return compose(withRouter)(Wrapper)
}
