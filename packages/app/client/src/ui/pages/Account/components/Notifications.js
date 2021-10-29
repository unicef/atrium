import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { IosSwitch } from '../../../molecules'
import NotificationsActivity from './NotificationsActivity'
import { makeStyles } from '@material-ui/core/styles'
import { useAuthAsyncActions } from '../../../hooks'

const useStyles = makeStyles(() => ({
  wraper: {
    maxWidth: '470px'
  },
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

  const { updateUser } = useAuthAsyncActions()

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

  useEffect(() => {
    if (all) {
      setCommentPost(all)
      setCommentProject(all)
      setReplyComment(all)
      setUpdateComment(all)
      setUpdateProject(all)
      setUpdatePost(all)
    } else if (
      commentPost &&
      updatePost &&
      commentProject &&
      updateProject &&
      replyComment &&
      updateComment
    ) {
      setCommentPost(all)
      setCommentProject(all)
      setReplyComment(all)
      setUpdateComment(all)
      setUpdateProject(all)
      setUpdatePost(all)
    }
  }, [all])

  useEffect(() => {
    setAll(
      commentPost &&
        updatePost &&
        commentProject &&
        updateProject &&
        replyComment &&
        updateComment
    )

    const submitHandler = async () => {
      const formData = new FormData()
      formData.append('commentOnPost', commentPost)
      formData.append('updatesOnPost', updatePost)
      formData.append('commentOnProject', commentProject)
      formData.append('updatesOnProject', updateProject)
      formData.append('repliesOnComments', replyComment)
      formData.append('updatesOnComments', updateComment)

      await updateUser(props.id, formData)
    }
    submitHandler()
  }, [
    commentPost,
    updatePost,
    commentProject,
    updateProject,
    replyComment,
    updateComment
  ])

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
        <IosSwitch
          checked={all}
          onChange={() => {
            setAll(!all)
          }}
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
