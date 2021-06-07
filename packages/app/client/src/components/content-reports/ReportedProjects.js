import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { ActionProjectButton } from '../../ui'
import { useProjectsMainActions } from '../../ui/hooks'
import ProjectCard from '../../ui/pages/ProjectsMain/components/ProjectCard'
import { ReportActionsButtons } from './ReportActionsButtons'
import Typography from '@material-ui/core/Typography'

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

  const history = useHistory()

  return (
    <Grid xs={12} item container justify="flex-start" alignItems="center">
      {projects && projects.length > 0 &&
        projects.map(project => (
          <Grid
            key={project.id}
            item
            style={{ padding: 20 }}
            justify="flex-start"
            alignItems="center"
            direction="column"
          >
            <Typography gutterBottom variant="h3" component="h6">
              {project.name}
            </Typography>
            <Grid item container xs={12}>
              <Typography variant="caption" component="p">
                {project.details}
              </Typography>
            </Grid>
            <Grid>
              <span>{project.reportMessage}</span>
            </Grid>

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
