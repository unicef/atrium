import React from 'react'
import Modal from '@material-ui/core/Modal'
import CreateProject from './CreateProject'

export default function SimpleModal(props) {
  return (
    <div>
      <Modal
        open={props.editting}
        onClose={props.handleClose ? props.handleClose : null}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
          <CreateProject
            editting={props.editting}
            setEditting={props.setEditting}
            {...props.projectData}
          />
        </div>
      </Modal>
    </div>
  )
}
