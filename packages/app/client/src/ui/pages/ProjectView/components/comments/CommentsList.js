import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CommentBox } from '../../../../organisms'
import { useSelector } from 'react-redux'
import { getUserId, getSelectedProjectComments } from '../../../../../selectors'

const CommentList = () => {
  const projectsComments = useSelector(getSelectedProjectComments)
  const userId = useSelector(getUserId)

  if (Array.isArray(projectsComments) && projectsComments.length > 0) {
    return (
      <Grid container item xs={12}>
        {projectsComments.map((comment, index) => (
          <CommentBox userIsTheOwner={comment.user.id === userId} key={comment.id} author={comment.user.name} {...comment} >
            {Array.isArray(comment.replies) && comment.replies.length > 0 ? comment.replies.map((reply) => <CommentBox key={reply.id} author={reply.user.name} {...reply} />) : null}
          </CommentBox>
        ))}
      </Grid>
    )
  }

  return null
 
}

export default CommentList
