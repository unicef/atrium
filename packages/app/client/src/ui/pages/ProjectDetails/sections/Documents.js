import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useHandledRequest } from '../../../hooks'
import { deleteFile } from '../../../../api/projects'
import { DocumentUpload, FormTitle, SECTIONS_NAME, SECTIONS_ID } from '../components'

const Documents = (props) => {
  const oldFiles = props.formProps.values.documents
  const oldPhotos = props.formProps.values.photos
  const oldVideos = props.formProps.values.videos
  const handledRequest = useHandledRequest()

  const deleteFileFromProject = handledRequest({
    request: deleteFile,
    successMessage: 'File successfully removed',
    showFullPageLoading: true
  })

  return (
    <Grid item xs={12}>
      <FormTitle id={SECTIONS_ID[SECTIONS_NAME.DOCUMENTS]}>{SECTIONS_NAME.DOCUMENTS}</FormTitle>
      <DocumentUpload
        htmlFor="documents"
        name="documents"
        title="Documents"
        handleChange={props.formProps.setFieldValue}
        prevValues={oldFiles}
        deleteHandler={deleteFileFromProject}
        type="document"
        projectId={props.projectId}
      />

      <DocumentUpload
        htmlFor="photos"
        name="photos"
        title="Photos"
        handleChange={props.formProps.setFieldValue}
        prevValues={oldPhotos}
        deleteHandler={deleteFileFromProject}
        type="photo"
        projectId={props.projectId}
      />

      <DocumentUpload
        htmlFor="videos"
        name="videos"
        title="Videos"
        handleChange={props.formProps.setFieldValue}
        prevValues={oldVideos}
        deleteHandler={deleteFileFromProject}
        type="video"
        projectId={props.projectId}
      />
    </Grid>
  )
}

export default Documents
