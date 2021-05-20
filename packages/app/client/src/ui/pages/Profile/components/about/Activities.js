import React from 'react'
import Grid from '@material-ui/core/Grid'
import TabContentTitle from '../TabContentTitle'
import { useSelector } from 'react-redux'
import { getProfileUserActivities } from '../../../../../selectors'
import Activity from './Activity'

const Activities = () => {
  const activities = useSelector(getProfileUserActivities)

  return (
    <Grid item xs={12}>
      <TabContentTitle>Activity</TabContentTitle>
      <Grid container item xs={12} spacing={2}>
        {activities.map(activity => (
          <Activity key={activity.id} {...activity} />
        ))}
      </Grid>
    </Grid>
  )
}

export default Activities
