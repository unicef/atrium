import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import { useProjectsAsyncActions, useProfileAsyncActions, useHandledRequest } from '../../hooks'
import { getCurrentProject, getUser } from '../../../selectors'
import { RequiredInformations, Project, ContactPerson, ExtraInformation, Team, Links, Documents } from './sections'
import { FooterButtons, validateForm, handleSubmitData, MANDATORY_FIELDS, SideNav } from './components'
import { updateProject, createProject } from '../../../api/projects'

const ProjectDetails = ({ editing = false }) => {
  const projectData = useSelector(getCurrentProject)
  const params = useParams()
  const user = useSelector(getUser)
  const handledRequest = useHandledRequest()
  const history = useHistory()
  const { getProjectById } = useProjectsAsyncActions()
  const { refreshToken } = useProfileAsyncActions()

  useEffect(() => {
    if (projectData === undefined && editing) {
      getProjectById(params.id)
    }
  }, [])

  const [picture, setPicture] = useState(null)

  const onCreate = handledRequest({
    request: createProject,
    onSuccess: async project => {
      await refreshToken()
      history.replace(`/projects/overview/${project.id}`)
    },
    successMessage: 'Project successfully created',
    showFullPageLoading: true
  })

  const onUpdate = handledRequest({
    request: updateProject,
    onSuccess: async () => {
      await refreshToken()
      window.location.reload()
    },
    successMessage: 'Project successfully updated',
    showFullPageLoading: true
  })

  if (editing && !projectData) {
    return null
  }

  const handleInitialValues = () => {
    if (projectData) {
      const userIsTheContact = projectData.contactPersonFullName === user.name && projectData.contactPersonEmail === user.email
      return { ...projectData, iamTheContact: userIsTheContact }
    }

    return MANDATORY_FIELDS.reduce((acc, key) => ({ ...acc, [key]: undefined }), {})
  }

  return (
    <Grid container justify="center" style={{ paddingTop: '60px'}}>
      {editing && 
        <Grid item xs={12} sm={2} lg={2} xl={1}>
          <Hidden mdDown>
            <SideNav />
          </Hidden>
        </Grid>
      }
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Formik
          initialValues={handleInitialValues()}
          enableReinitialize={true}
          validate={(values) => validateForm({ values, editing })}
          onSubmit={(values) => {
            const data = handleSubmitData({ values, prevValues: projectData })

            if (user.badges['2']) {
              data.append('address', '')
            } else {
              data.append('address', user.address)
            }

            if (editing) {
              onUpdate(data, params.id)
            } else {
              onCreate(data)
            }
          }}
        >
          {(formProps) => (
            <form
              onSubmit={formProps.handleSubmit}
              noValidate
            >
              <RequiredInformations
                editing={editing}
                setPicture={setPicture}
                data={projectData?.attachment}
                picture={picture}
                formProps={formProps}
              />
              <Project formProps={formProps} />
              <ContactPerson formProps={formProps} />
              {editing && <ExtraInformation formProps={formProps} />}
              {editing && <Team />}
              {editing && <Links formProps={formProps} />}
              {editing && <Documents projectId={params.id} formProps={formProps} />}
              <FooterButtons editing={editing} projectId={params.id} formProps={formProps} />
            </form>
          )}
        </Formik>
      </Grid>
      
    </Grid>
  )
}

export default ProjectDetails
