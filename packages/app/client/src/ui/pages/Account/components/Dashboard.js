import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import BorderedInfo from './BorderedInfo'
import Typography from '@material-ui/core/Typography'

function Dashboard(props) {
  const user = useSelector(state => state.auth.user)
  return (
    <>
      <Typography style={{ marginBottom: '2%', fontSize: '34px' }} variant="h3">
        Hello, {user.name}
      </Typography>
      <Grid item container xs={12}>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo>
            <Typography variant="subtitle1">MY STATS</Typography>
            <div>Hello, {user.name}</div>
          </BorderedInfo>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo>
            <Typography variant="subtitle1">MY LATEST PROJECT</Typography>
            <div>My latest project</div>
          </BorderedInfo>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: '2%' }} item container xs={12}>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo>
            <Typography variant="subtitle1">MY COMMENTS</Typography>
            <div>My comments p</div>
          </BorderedInfo>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <BorderedInfo>
            <Typography variant="subtitle1">MY POSTS</Typography>
            <div>My posts</div>
          </BorderedInfo>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
