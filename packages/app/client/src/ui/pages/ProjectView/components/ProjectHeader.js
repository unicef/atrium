import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { Image } from '../../../atoms'
import { BackArrow } from '../../../molecules'
import { makeStyles } from '@material-ui/core/styles'
import ProjectHeaderDetails from './ProjectHeaderDetails'
import ActionButtons from './ActionButtons'
import ProjectHeaderMiddleSection from './ProjectHeaderMiddleSection'

const useStyles = makeStyles(theme => ({
  actionsWrapper: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      marginTop: 30
    }
  }
}))

const ProjectHeader = props => {
  const classes = useStyles()

  return (
    <>
      <Grid item xs={12}>
        <BackArrow dest={'/projects'} destName="projects" />
      </Grid>
      <Box mb="35px" mt="30px">
        <Grid justify="center" container item xs={12}>
          <Image
            src={props.attachment.url}
            alt="project picture"
            height={400}
          />
        </Grid>
      </Box>

      <Grid item xs={12} container justify="space-between">
        <Grid item xs={12} md={10}>
          <ProjectHeaderDetails details={props.details} name={props.name} />
          <ProjectHeaderMiddleSection {...props} />
        </Grid>

        <Grid
          className={classes.actionsWrapper}
          direction="column"
          container
          alignItems="flex-end"
          item
          xs={12}
          md={2}
        >
          <ActionButtons projectData={props.projectData} />
        </Grid>
      </Grid>
    </>
  )
}

export default ProjectHeader
