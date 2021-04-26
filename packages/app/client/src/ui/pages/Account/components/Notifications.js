import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Switch } from '@material-ui/core'
import NotificationsActivity from './NotificationsActivity'

function Notifications() {
  const [commentPost, setCommentPost] = useState(false)
  const [updatePost, setUpdatePost] = useState(false)
  const [commentProject, setCommentProject] = useState(false)
  const [updateProject, setUpdateProject] = useState(false)
  const [replyComment, setReplyComment] = useState(false)
  const [updateComment, setUpdateComment] = useState(false)

  return (
    <div style={{ maxWidth: '470px' }}>
      <Typography variant="h3">Notifications settings</Typography>
      <Typography style={{ margin: '5% 0', width: '81%' }} variant="body1">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s,
      </Typography>
      <div style={{ borderBottom: '1px solid #E7E7E7', width: '100%' }} />
      <div style={{ display: 'flex', alignItems: 'center', margin: '3% 0' }}>
        <Switch />
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
