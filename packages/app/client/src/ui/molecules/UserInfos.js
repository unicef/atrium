import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Avatar } from '../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  name: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '15px',
    lineHeight: '140%',
    color: theme.palette.text.primary
  },
  role: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '140%',
    color: theme.palette.text.primary
  },
  email: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '140%',
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
}))

const UserInfos = ({ name, role, email, src, containerProps }) => {
  const classes = useStyles()
  return (
    <Grid container wrap="nowrap" spacing={2} {...containerProps}>
      <Grid item>
        <Avatar name={name} growthTimes={12} src={src} />
      </Grid>

      <Grid item xs zeroMinWidth>
        <Typography className={classes.name}>{name}</Typography>
        <Typography className={classes.role}>{role}</Typography>
        <Typography noWrap component="a" href={email ? `mailto:${email}` : ''} className={classes.email}>{email}</Typography>
      </Grid>
    </Grid>
  )
}

UserInfos.defaultProps = {
  name: 'Not defined',
  role: 'Not defined'
}

export default UserInfos
