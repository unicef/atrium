import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  projectInfo: {
    marginBottom: 20
  },
  personFullName: {
    fontSize: '17px',
    marginBottom: 0,
    textAlign: 'left'
  },
  link: {
    textDecoration: 'none'
  }
}))

const TitledPart = ({ children, title }) => (
  <Grid item xs={12}>
    <Typography variant="subtitle1">{title}</Typography>
    {children}
  </Grid>
)

const ProjectHeaderMiddleSection = (props) => {
  const classes = useStyles()
  const contactPerson = props.contactPerson || {}

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
        <Grid container alignItems="center" item xs={12}>
          <Avatar
            alt="Avatar"
            src={contactPerson.avatar || null}
          />
          <Box ml={2}>
            <Typography
              color="secondary"
              className={classes.personFullName}
              variant="subtitle1"
            >
              {contactPerson.name || null /* then + surname*/}
            </Typography>
            <Typography color="secondary" variant="body1">
              Project menager
            </Typography>
            <Typography
              component="a"
              href={contactPerson.email ? `mailto:${contactPerson.email}`: ''}
              color="primary"
              variant="body1"
              className={classes.link}
            >
              {contactPerson.email || null}
            </Typography>
          </Box>
        </Grid>
      </TitledPart>
    </>
  )
}

export default ProjectHeaderMiddleSection
