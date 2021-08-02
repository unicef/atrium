import React from 'react'
import Grid from '@material-ui/core/Grid'
import TabContentTitle from '../components/TabContentTitle'
import { useSelector } from 'react-redux'
import { getProfileUserInfo } from '../../../../selectors'
import { Link } from '@material-ui/core'

const ProfilePosts = () => {
  const userInfo = useSelector(getProfileUserInfo)
  return (
    <Grid container item xs={12}>
      <TabContentTitle>Posts</TabContentTitle>
      <Grid item xs={12}>
        <Link
          href={`/forum/user/${userInfo.name
            .split(' ')[0]
            .toLowerCase()}/posts`}
        >
          This link will send you to {userInfo.name} posts on NodeBB forum
        </Link>
      </Grid>
    </Grid>
  )
}

export default ProfilePosts
