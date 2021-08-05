import { Divider, Grid, Typography } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { withStyles } from '@material-ui/styles'
import { DateTime } from 'luxon'
import React from 'react'
import { ACTIVITY_ENUM } from '../../unin-constants'
import { getRelativeTime } from '../../utils/timeManipulation'

const styles = theme => ({
  container: {
    marginTop: 24,
    marginBottom: 24,
    color: theme.colors['warm-gray']
  },
  divider: {
    backgroundColor: theme.colors['warm-gray']
  }
})

const textStyles = theme => ({
  paragraph: {
    color: theme.colors['black']
  },
  accentedDetail: {
    fontWeight: 'bold',
    lineHeight: 1.5,
    color: theme.colors['deep-green']
  }
})

const timeStyles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  timeIcon: {
    float: 'left',
    color: theme.colors['warm-gray'],
    height: 16
  },
  timeText: {
    float: 'right',
    color: theme.colors['warm-gray'],
    fontSize: 14
  }
})

const ActivityText = withStyles(textStyles)(
  ({ mainContent, accentedDetail, classes }) => {
    return (
      <Typography variant="body1" className={classes.paragraph}>
        {mainContent}
        {accentedDetail ? (
          <span className={classes.accentedDetail}>{accentedDetail}</span>
        ) : null}
      </Typography>
    )
  }
)

const TimeMarker = withStyles(timeStyles)(({ classes, createdAt }) => {
  const parsedCreatedAt = DateTime.fromISO(createdAt)
  const now = DateTime.local().toUTC()

  const text = getRelativeTime(parsedCreatedAt, now)

  return (
    <span className={classes.container}>
      <AccessTimeIcon className={classes.timeIcon} />
      <Typography className={classes.timeText}>{text}</Typography>
    </span>
  )
})

function ActivityRow({ classes, activity, sameUser }) {
  let content

  switch (activity.typeOfActivity) {
    case ACTIVITY_ENUM.JOIN_ATRIUM:
      content = <ActivityText mainContent={`${sameUser ? 'You joined' : 'Joined'} The Atrium`} />
      break
    case ACTIVITY_ENUM.ISSUE_BADGE:
      content = (
        <ActivityText
          mainContent={`${sameUser ? 'You were' : 'Was'} issued a badge: ${activity.badgeIssued}`}
        />
      )
      break
    case ACTIVITY_ENUM.CREATE_PROJECT:
      content = (
        activity ? activity.project ?
          <ActivityText
            mainContent={`${sameUser ? 'You created' : 'Created'} the project `}
            accentedDetail={activity.project ? activity.project.name : null}
          />
          : null
          : null
      )
      break
    case ACTIVITY_ENUM.COMMENT_PROJECT:
      content = (
        activity ? activity.project ?
          <ActivityText
            mainContent={`${sameUser ? 'You commented ' : 'Commented'} on the project `}
            accentedDetail={activity.project.name}
          />
          : null
          : null
      )
      break
    case ACTIVITY_ENUM.LIKE_PROJECT:
      content = (
        activity ? activity.project ?
          < ActivityText
            mainContent={`${sameUser ? 'You liked' : 'Liked'} the project `
            }
            accentedDetail={activity.project.name}
          />
          : null
          : null
      )
      break
    case ACTIVITY_ENUM.CREATE_POLL:
      content = (
        activity ? activity.poll ?
          <ActivityText
            mainContent={`${sameUser ? 'You created' : 'Created'} the poll `}
            accentedDetail={activity.poll.topic}
          />
          : null
          : null
      )
      break
    case ACTIVITY_ENUM.ANSWER_POLL:
      content = (
        activity ? activity.poll ?
          <ActivityText
            mainContent={`${sameUser ? 'You answered' : 'Answered'} the poll `}
            accentedDetail={activity.poll.topic}
          />
          : null
          : null
      )
      break
    case ACTIVITY_ENUM.UPLOAD_LEARNING_RESOURCE:
      content = (
        activity ? activity.learningResource ?
          <ActivityText
            mainContent={`${sameUser ? 'You uploaded' : 'Uploaded'} `}
            accentedDetail={activity.learningResource.title}
          />
          : null
          : null
      )
      break
    case ACTIVITY_ENUM.COMMENT_LEARNING_RESOURCE:
      content = (
        activity ? activity.learningResource ?
          <ActivityText
            mainContent={`${sameUser ? 'You commented' : 'Commented'} `}
            accentedDetail={activity.learningResource.title}
          />
          : null
          : null
      )
      break
    case ACTIVITY_ENUM.LIKE_LEARNING_RESOURCE:
      content = (
        activity ? activity.learningResource ?
          <ActivityText
            mainContent={`${sameUser ? 'You liked' : 'Liked'} `}
            accentedDetail={activity.learningResource.title}
          />
          : null
          : null
      )
      break
    case ACTIVITY_ENUM.CREATE_DISCUSSION:
      content = (
        activity ? activity.discussion ?
          <ActivityText
            mainContent={`${sameUser ? 'You created' : 'Created'} the post `}
            accentedDetail={activity.discussion.title}
          />
          : null
          : null
      )
      break
    case ACTIVITY_ENUM.PARTICIPATE_DISCUSSION:
      content = (
        activity ? activity.discussion ?
          <ActivityText
            mainContent={`${sameUser ? 'You participated' : 'Participated'} in the post `}
            accentedDetail={activity.discussion.title}
          />
          : null
          : null
      )
      break
    case ACTIVITY_ENUM.LIKE_DISCUSSION:
      content = (
        activity ? activity.discussion ?
          <ActivityText
            mainContent={`${sameUser ? 'You liked' : 'Liked'} the post `}
            accentedDetail={activity.discussion.title}
          />
          : null
          : null
      )
      break
    default:
      content = null
  }

  console.log('activity row content')
  console.log(content)

  if (!content) {
    return null
  }


  return (
    <>
      <Grid container justify={'space-between'} className={classes.container}>
        {content}
        <TimeMarker createdAt={activity.createdAt} />
      </Grid>
      <Divider className={classes.divider} />
    </>
  )
}

export default withStyles(styles)(ActivityRow)
