import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Switch } from '@material-ui/core'
import NotificationsActivity from './NotificationsActivity'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  wraper: {
    maxWidth: '470px'
  },
  root: {
    width: 54,
    height: 24,
    padding: 0,
    margin: '3% 3% 3% 0'
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(30px)',
      color: 'white',
      '& + $track': {
        backgroundColor: '#15B54A',
        opacity: 1,
        border: 'none'
      }
    },
    '&$focusVisible $thumb': {
      color: '#15B54A',
      border: '6px solid #fff'
    }
  },
  thumb: {
    width: 22,
    height: 22
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid #BCBEBE`,
    backgroundColor: '#BCBEBE',
    opacity: 1
  },
  checked: {},
  focusVisible: {},
  line: {
    borderBottom: '1px solid #E7E7E7',
    width: '100%'
  },
  description: {
    margin: '5% 0',
    width: '81%'
  },
  allSection: {
    display: 'flex',
    alignItems: 'center',
    margin: '3% 0'
  }
}))

function Notifications(props) {
  const classes = useStyles()
  const [commentPost, setCommentPost] = useState(props.commentOnPost)
  const [updatePost, setUpdatePost] = useState(props.updatesOnPost)
  const [commentProject, setCommentProject] = useState(props.commentOnProject)
  const [updateProject, setUpdateProject] = useState(props.updatesOnProject)
  const [replyComment, setReplyComment] = useState(props.repliesOnComments)
  const [updateComment, setUpdateComment] = useState(props.updatesOnComments)
  const [all, setAll] = useState(
    commentPost &&
      updatePost &&
      commentProject &&
      updateProject &&
      replyComment &&
      updateComment
  )

  return (
    <div className={classes.wraper}>
      <Typography variant="h3">Notifications settings</Typography>
      <Typography className={classes.description} variant="body1">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s,
      </Typography>
      <div className={classes.line} />
      <div className={classes.allSection}>
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked
          }}
          checked={all}
          onChange={() => setAll(!all)}
        />
        <Typography variant="subtitle1"> All notifications</Typography>
      </div>
      <NotificationsActivity
        variant="posts"
        firstValue={commentPost}
        firstHandler={setCommentPost}
        secondValue={updatePost}
        secondHandler={setUpdatePost}
      />
      <NotificationsActivity
        variant="projects"
        firstValue={commentProject}
        firstHandler={setCommentProject}
        secondValue={updateProject}
        secondHandler={setUpdateProject}
      />
      <NotificationsActivity
        variant="comments"
        firstValue={replyComment}
        firstHandler={setReplyComment}
        secondValue={updateComment}
        secondHandler={setUpdateComment}
      />
    </div>
  )
}

export default Notifications
