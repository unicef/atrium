import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
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

const MemberRow = ({ member }) => (
  <Box mb="20px" mt="15px">
    <Grid justify="space-between" container item xs={12} >
      <UserInfos {...member} containerProps={{ xs: 6, item: true }} />
      <Button variant="outlined">
        View profile
      </Button>
    </Grid>
  </Box>
)

const ProjectTeam = () => {
  const classes = useStyles() 
  const project = useSelector(state => state.projects.selectedProject)
  const contact = project.contactPerson

  return (
    <Box mt="20px">
      <Grid container item xs={12} justify="center" >
        <Grid item xs={8}>
          <Typography className={classes.title}>Contact person</Typography>
          <Box mt="15px" mb="50px">
            <Grid container justify="space-between" item xs={12}>
              <UserInfos {...contact} role="Developer" name="Jhon Doe" containerProps={{ xs: 6, item: true }} />
              <Button variant="outlined">
                View profile
              </Button>
            </Grid>
          </Box>

          <Typography className={classes.title}>Team</Typography>
          {project.team.map((member, index) => {
            if ((index + 1) === project.team.length) {
              return (
                <MemberRow member={member}/>
              )
            }

            return (
              <>
                <MemberRow member={member} />
                <Divider />
              </>
            )
          })}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProjectTeam
