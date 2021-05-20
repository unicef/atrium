import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { HorizontalCardWithMenu } from '../../../../organisms'
import { Authorship, Avatar } from '../../../../atoms'
import { useSelector } from 'react-redux'
import { getProfileUserInfo } from '../../../../../selectors'
import { ACTIVITY_ENUM } from '../../../../../unin-constants'
import { CardInfoRow } from '../../../../molecules'

const handleMiddleText = (type) => {
  
  switch(type) {
    case ACTIVITY_ENUM.JOIN_ATRIUM:
      return ''
    case ACTIVITY_ENUM.CREATE_PROJECT:
      return 'created project'
    case ACTIVITY_ENUM.LIKE_PROJECT:
      return 'liked '
    case ACTIVITY_ENUM.COMMENT_PROJECT:
      return 'commented on'
    case ACTIVITY_ENUM.CREATE_POLL:
      return ''
    case ACTIVITY_ENUM.ANSWER_POLL:
      return ''
    case ACTIVITY_ENUM.UPLOAD_LEARNING_RESOURCE:
      return ''
    case ACTIVITY_ENUM.LIKE_LEARNING_RESOURCE:
      return ''
    case ACTIVITY_ENUM.COMMENT_LEARNING_RESOURCE:
      return ''
    case ACTIVITY_ENUM.ISSUE_BADGE:
      return ''
    case ACTIVITY_ENUM.CREATE_DISCUSSION:
      return ''
    case ACTIVITY_ENUM.PARTICIPATE_DISCUSSION:
      return ''
    case ACTIVITY_ENUM.LIKE_DISCUSSION:
      return ''
    default:
      return 'default'
  }
}

const Activity = ({ typeOfActivity, createdAt }) => {
  const userInfo = useSelector(getProfileUserInfo)

  return (
    <Grid container item xs={12}>
      <HorizontalCardWithMenu menuItems={[]} userIsTheOwner={true}>
        <Grid container alignItems="center">
          <Box mr={1}>
            <Avatar growthTimes={6} {...userInfo} />
          </Box>
          <Authorship author={userInfo.name} />
          <Typography component="span">{handleMiddleText(typeOfActivity)}</Typography>
        </Grid>

        <Box my={2}>
          <Typography>
            Zlto (zlah-toh) is an innovative digital rewards system (that uses blockchain) that is aimed at reducing em...
          </Typography>
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
    </Grid>
  )
}

export default Activity
