import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Divider, Button } from '../../../atoms'
import { EmptyResults, UserInfos } from '../../../molecules'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { getCurrentProjectMembers, getCurrentProjectContact } from '../../../../selectors'
import { useHistory } from 'react-router'

const useStyles = makeStyles(() => ({
  title: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    marginBottom: 30
  }
}))

const MemberRow = ({ member }) => {
  const history = useHistory()
  return (
    <Box mb="20px" mt="15px">
      <Grid justify="space-between" container item xs={12} >
        <UserInfos {...member} containerProps={{ xs: 6, item: true }} />
        <Button onClick={() => history.push(`/profile/${member.id}/about`)} variant="outlined">
          View profile
        </Button>
      </Grid>
    </Box>
  )
}

const ProjectTeam = () => {
  const classes = useStyles() 
  const team = useSelector(getCurrentProjectMembers)
  const contact = useSelector(getCurrentProjectContact)
  const history = useHistory()

  const handleTeamMembersRenderer = () => {
    if (team.length > 0) {
      return (
        <>
          <Typography className={classes.title}>Team</Typography>
          {team.map((member, index) => {
            if ((index + 1) === team.length) {
              return (
                <MemberRow key={member.id} member={member}/>
              )
            }

            return (
              <div key={member.id}>
                <MemberRow member={member} />
                <Divider />
              </div>
            )
          })}
        </>
      )
    }

    return (
      <EmptyResults
        height="100%"
        mainMessage="There is no members added"
      />
    )
  }

  return (
    <Box mt="20px">
      <Grid container item xs={12} justify="center" >
        <Grid item xs={8}>
          <Typography className={classes.title}>Contact person</Typography>
          <Box mt="15px" mb="50px">
            <Grid container justify="space-between" item xs={12}>
              <UserInfos {...contact} containerProps={{ xs: 6, item: true }} />
              <Button onClick={() => history.push(`/profile/${contact.id}/about`)} variant="outlined">
                View profile
              </Button>
            </Grid>
          </Box>

          {handleTeamMembersRenderer()}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProjectTeam
