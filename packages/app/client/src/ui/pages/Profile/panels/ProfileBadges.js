import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { TabContentTitle } from '../components'
import { makeStyles} from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import {getProfileBadges, getUser} from '../../../../selectors'
import { BadgesList } from '../../../molecules'

const useStyles = makeStyles(() => ({
  subText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '180%',
    marginBottom: 49
  }
}))

const ProfileBadges = () => {
  const classes = useStyles()
  const user = useSelector(getUser)

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <TabContentTitle>Badges</TabContentTitle>
        <Typography className={classes.subText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </Typography>
        <Grid item container spacing={5}>
          <BadgesList start={0} end={user.badges} earned={true} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileBadges
