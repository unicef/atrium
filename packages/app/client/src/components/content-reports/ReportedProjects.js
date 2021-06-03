import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import { ActionProjectButton } from '../../ui'
import { useProjectsMainActions } from '../../ui/hooks'
import ProjectCard from '../../ui/pages/ProjectsMain/components/ProjectCard'
import { ReportActionsButtons } from './ReportActionsButtons'

const useStyles = makeStyles(() => ({
  greeting: {
    marginBottom: '2%',
    fontSize: '34px'
  },
  section: {
    marginBottom: '2%',
    fontSize: '24px'
  },
  projectCards: {
    maxWidth: '100%'
  }
}))
const ReportedProjects = ({ projects }) => {
  const classes = useStyles()
  const { saveSearchedProjects } = useProjectsMainActions()
  saveSearchedProjects(projects)
  const history = useHistory()
  return (
    <Grid xs={12} item container justify="flex-start" alignItems="center">
      {projects.length > 0 &&
        projects.map(project => (
          <Grid
            item
            style={{ padding: 20 }}
            justify="flex-start"
            alignItems="center"
            direction="column"
          >
            <ProjectCard
              className={classes.projectCards}
              projectParent={project}
              disableActions={true}
              id={project.id}
              key={project.id}
              onClick={() => {
                history.push(`/projects/view/${project.id}/about`)
              }}
              adminGrid={{ xs: 12 }}
            />
            <Grid>
              <span>the report reason</span>
            </Grid>
            {/* color */}
            {/* email on delete also */}

            <ReportActionsButtons
              deleteAction={() => {}}
              dismissAction={() => {}}
              key={project.id}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default ReportedProjects
