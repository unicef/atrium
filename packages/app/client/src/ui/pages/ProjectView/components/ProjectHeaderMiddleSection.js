import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { UserInfos } from '../../../molecules'

const useStyles = makeStyles(() => ({
  projectInfo: {
    marginBottom: 20
  }
}))

const TitledPart = ({ children, title }) => (
  <Grid item xs={12}>
    <Box mb={1}>
      <Typography variant="subtitle1">{title}</Typography>
    </Box>
    {children}
  </Grid>
)

const ProjectHeaderMiddleSection = (props) => {
  // TODO: USE useSelector CONNECTION
  const classes = useStyles()
  const contactPerson = props.projectData.contactPerson || {}

  return (
    <>
      <TitledPart title="PROJECT WEBSITE">
        <Typography
            color="primary"
            variant="body1"
            component="a"
            href={props.websiteLink}
            className={classes.link}
          >
            {props.websiteLink}
        </Typography>
      </TitledPart>

      <TitledPart title="PROJECT CODE">
        <Typography
          color="primary"
          variant="body1"
          component="a"
          href={props.linkToRepository}
          className={classes.link}
        >
          {props.linkToRepository}
        </Typography>
      </TitledPart>

      <TitledPart title="CONTACT PERSON">
        <UserInfos {...contactPerson} name={props.projectData.contactPersonFullName} />
      </TitledPart>
    </>
  )
}

export default ProjectHeaderMiddleSection
