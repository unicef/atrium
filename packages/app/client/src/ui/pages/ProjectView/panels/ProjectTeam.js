import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Divider, Button } from '../../../atoms'
import { UserInfos } from '../../../molecules'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  title: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    marginBottom: 30
  }
}))

const ProjectTeam = () => {
  const classes = useStyles() 
  const project = useSelector(state => state.projects.selectedProject)
  const contact = project.contactPerson

  return (
    <Grid container item xs={12} justify="center" style={{ marginTop: 20 }}>
      <Grid item xs={8}>
        <Typography className={classes.title}>Contact person</Typography>
        <Grid container justify="space-between" item xs={12} style={{ marginBottom: 50, marginTop: 15 }}>
          <UserInfos {...contact} role="Developer" name="Jhon Doe" containerProps={{ xs: 6, item: true }} />
          <Button variant="outlined">
            View profile
          </Button>
        </Grid>

        <Typography className={classes.title}>Team</Typography>
        {project.team.map((member, index) => {
          if ((index + 1) === project.team.length) {
            return (
              <Grid justify="space-between" container item xs={12} style={{ marginBottom: 20, marginTop: 15 }}>
                <UserInfos {...member} role="Black Crow" name="John Snow" containerProps={{ xs: 6, item: true }} />
                <Button variant="outlined">
                  View profile
                </Button>
              </Grid>
            )
          }

          return (
            <>
              <Grid justify="space-between" container item xs={12} style={{ marginBottom: 20, marginTop: 15 }}>
                <UserInfos containerProps={{ xs: 6, item: true }} {...member} role={index % 2 === 0 ? 'Queen of the North' : 'Queen of the Andalos'} name={index % 2 === 0 ? 'Sansa Stark' : 'Daenerys Targaryen'} />
                <Button variant="outlined">
                  View profile
                </Button>
              </Grid>
              <Divider />
            </>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default ProjectTeam
