import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { deleteComment } from '../../api/projects'
import { ActionProjectButton, CommentBox } from '../../ui'
import { useHandledRequest } from '../../ui/hooks'
import { ReportActionsButtons } from './ReportActionsButtons'

const ReportedComments = ({ comments }) => {
  const [commentsState, setCommentsState] = useState(comments || [])
  const handledRequest = useHandledRequest()

  const removeItemFromArray = commentId => {
    console.log(
      '🚀 ~ file: ReportedComments.js ~ line 11 ~ ReportedComments ~ commentId',
      commentId
    )
    commentsState.pop(commentsState.indexOf(commentId))
    console.log(
      '🚀 ~ file: ReportedComments.js ~ line 10 ~ ReportedComments ~ commentsState',
      commentsState
    )
    setCommentsState(commentsState)
  }

  const removeComment = handledRequest({
    request: deleteComment,
    showFullPageLoading: true,
    onSuccess: removeItemFromArray,
    successMessage: 'Comment successfully deleted'
  })
  return (
    <>
      {commentsState.map(comment => (
        <>
          <CommentBox
            removeComment={removeComment}
            key={comment.id}
            author={comment.user.name}
            adminArea={true}
            {...comment}
          />
          <Grid>
            <span>{comment.reportMessage}</span>
          </Grid>
          <ReportActionsButtons
            deleteAction={() => {}}
            dismissAction={() => {}}
            key={comment.id}
          />
        </>
      ))}
    </>
  )
}

export default ReportedComments
