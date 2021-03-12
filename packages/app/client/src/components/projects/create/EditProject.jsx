import React from 'react'
import CreateProject from './CreateProject'

export default function SimpleModal(props) {
  return (
    <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
      <CreateProject
        editting={props.editting}
        setEditting={props.setEditting}
        {...props.projectData}
      />
    </div>
  )
}
