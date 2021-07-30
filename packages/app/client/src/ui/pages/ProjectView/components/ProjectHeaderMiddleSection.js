import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { UserInfos } from '../../../molecules'

const TitledPart = ({ children, title, ...props }) => (
  <Grid item xs={6} md={3} {...props}>
    <Box mt={4} mb={1}>
      <Typography variant="subtitle1">{title}</Typography>
    </Box>
    {children}
  </Grid>
)

const ProjectHeaderMiddleSection = (props) => {
  const contactPerson = props.contactPerson || {}

  return (
    <Grid item container xs={12}>
      <TitledPart title="ORGANIZATION">
        <Typography
          variant="body1"
        >
          {props.organization}
        </Typography>
      </TitledPart>

      <TitledPart title="COUNTRY">
        <Typography
          variant="body1"
        >
          {props.country}
        </Typography>
      </TitledPart>

      <TitledPart title="PROJECT WEBSITE">
        <Typography
          color="primary"
          variant="body1"
          component="a"
          href={props.websiteLink}

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
        >
          {props.linkToRepository}
        </Typography>
      </TitledPart>

      <TitledPart xs={12} title="CONTACT PERSON">
        <UserInfos {...contactPerson} name={props.projectData.contactPersonFullName} />
      </TitledPart>
    </Grid>
  )
}

export default ProjectHeaderMiddleSection
