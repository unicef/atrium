import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import ReportedComments from './ReportedComments'
import ReportedProjects from './ReportedProjects'
import ReportedUpdates from './ReportedUpdates'
import { useSelector } from 'react-redux'
import {
  getSearchedReportedComments,
  getSearchedReportedProjects,
  getSearchedReportedUpdates
} from '../../selectors'
import { useReportsAsyncActions } from '../../ui/hooks'

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

  const { fetchSearchedReports } = useReportsAsyncActions()
  const projects = useSelector(getSearchedReportedProjects)
  const comments = useSelector(getSearchedReportedComments)
  const updates = useSelector(getSearchedReportedUpdates)

  React.useEffect(() => {
    const requestReports = async () => {
      await fetchSearchedReports()
    }
    requestReports()
  }, [])

  return (
    <>
      <Typography className={classes.greeting} variant="h3">
        Reports
      </Typography>
      <Grid item container xs={12}>
        <Typography className={classes.section} variant="h4">
          Projects
        </Typography>
        <ReportedProjects projects={projects} />
      </Grid>
      <Grid item container xs={12}>
        <Typography className={classes.section} variant="h4">
          Updates
        </Typography>
        <ReportedUpdates updates={updates} />
      </Grid>
      <Grid item container xs={12}>
        <Typography className={classes.section} variant="h4">
          Comments
        </Typography>
        <ReportedComments comments={comments} />
      </Grid>
    </>
  )
}

export default ContentReport
