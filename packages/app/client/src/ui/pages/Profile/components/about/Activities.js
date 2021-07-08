import React from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Activity from './Activity'
import TabContentTitle from '../TabContentTitle'
import { useSelector } from 'react-redux'
import {
  getProfileUserActivities,
  getLoadMoreActivitiesFlag
} from '../../../../../selectors'
import { Button } from '../../../../atoms'
import { useProfileAsyncActions } from '../../../../hooks'
import { EmptyResults } from '../../../../molecules'

const Activities = () => {
  const activities = useSelector(getProfileUserActivities)
  const loadMoreFlag = useSelector(getLoadMoreActivitiesFlag)
  const [isLoading, setLoadiing] = React.useState(false)
  const { getMoreActivities } = useProfileAsyncActions()

  const loadMore = () => {
    const offset = activities.length
    getMoreActivities(offset, setLoadiing)
  }

  const handleLoadButton = () => {
    if (isLoading) {
      return <CircularProgress />
    }

    if (loadMoreFlag === 'LOAD') {
      return (
        <Button onClick={loadMore} variant="outlined">
          Load more
        </Button>
      )
    }

    return null
  }

  const handleActivitiesRender = () => {
    if (Array.isArray(activities) && activities.length > 0) {
      return (
        <>
          {activities.map(activity => (
            <Activity key={activity.id} {...activity} />
          ))}
          <Grid
            container
            item
            xs={12}
            justify={isLoading ? 'center' : 'flex-start'}
          >
            {handleLoadButton()}
          </Grid>
        </>
      )
    }

    return <EmptyResults mainMessage="No Activities have been found" />
  }

  return (
    <Grid item xs={12}>
      <TabContentTitle>Activity</TabContentTitle>
      <Grid container item xs={12} spacing={2}>
        {handleActivitiesRender()}
      </Grid>
    </Grid>
  )
}

export default Activities
