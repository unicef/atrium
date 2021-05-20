import React from 'react'
import Grid from '@material-ui/core/Grid'
import ProfileProjectCard from './ProfileProjectCard'
import { useSelector } from 'react-redux'
import { useProjectViewActions } from '../../../../hooks'
import { getProfileId, getProfileProjecs } from '../../../../../selectors'
import { useHistory } from 'react-router'
import { EmptyResults } from '../../../../molecules'

const ProjectsList = () => {
  const history = useHistory()
  const userId = useSelector(getProfileId)
  const projects = useSelector(getProfileProjecs)
  const { setCurrentProject } = useProjectViewActions()

  if (!Array.isArray(projects)) return null

  const resultsAreEmpty = projects.length === 0

  if (resultsAreEmpty) {
    return (
      <EmptyResults
        mainMessage="No Projects have been found"
      />
    )
  }

  return (
    <Grid container item xs={12}>
      {projects.map(
          (project) => (
            <ProfileProjectCard
             id={project.id}
             key={project.id}
             onClick={() => {
               setCurrentProject({ project, userId })
               history.push(`/projects/view/${project.id}/about`)
             }}
           />
          )
        )
      }
    </Grid>
  )
}

export default React.memo(ProjectsList)
