import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { comments, projects, updates } from './mocks'
import ReportedComments from './ReportedComments';
import ReportedProjects from "./ReportedProjects";

const mock = {
  projects,
  comments,
  updates
}


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
const ContentReport = () => {
  const classes = useStyles()
  return (
    <>
      <Typography className={classes.greeting} variant="h3">
        Reports
      </Typography>
      <Grid item container xs={12}>
        <Typography className={classes.section} variant="h4">
          Projects
        </Typography>
        <ReportedProjects projects={mock.projects} />
      </Grid>
      <Grid item container xs={12}>
        <Typography className={classes.section} variant="h4">
          Updates
        </Typography>
      </Grid>
      <Grid item container xs={12}>
        <Typography className={classes.section} variant="h4">
          Comments
        </Typography>
        <ReportedComments comments={mock.comments} />
      </Grid>
    </>
  )
}

export default ContentReport
