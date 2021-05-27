import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ActivityHeader from './ActivityHeader'
import handleActivityContent from './handleActivityContent'
import { HorizontalCardWithMenu } from '../../../../organisms'
import { Authorship, Avatar, Divider } from '../../../../atoms'
import { useSelector } from 'react-redux'
import { getProfileUserInfo } from '../../../../../selectors'
import { CardInfoRow } from '../../../../molecules'

const Activity = ({ typeOfActivity, createdAt, ...props }) => {
  const userInfo = useSelector(getProfileUserInfo)
  const { text, name, content, path } = handleActivityContent(typeOfActivity, props)

  return (
    <Grid container item xs={12}>
      <Box display="flex" flexDirection="column" width="100%">
        <HorizontalCardWithMenu padding="0">
          <Grid container alignItems="center">
            <Box mr={1}>
              <Avatar growthTimes={5.5} {...userInfo} />
            </Box>
            <Authorship author={userInfo.name} />
            <Typography component="span">{text}</Typography>
            <ActivityHeader data={name} path={path} />
          </Grid>

          <Box my={2}>
            {content}
          </Box>

          <CardInfoRow
            components={[
              {
                type: 'date',
                variant: 'absolute',
                date: createdAt
              }
            ]}
          />
        </HorizontalCardWithMenu>
        <Divider mt={19} mb={2} />
      </Box>
    </Grid>
  )
}

export default Activity
