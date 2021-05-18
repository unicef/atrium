import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CommentBox } from '../../../../organisms'
import { useSelector } from 'react-redux'
import { getUserId, getProjectComments } from '../../../../../selectors'
import { deleteComment } from '../../../../../api/projects'
import { useHandledRequest } from '../../../../hooks'
import { EmptyResults } from '../../../../molecules'

const CommentList = ({ refreshComments }) => {
  const projectsComments = useSelector(getProjectComments)
  const userId = useSelector(getUserId)
  const handledRequest = useHandledRequest()

  const removeComment = handledRequest(
    { 
      request: deleteComment,
      showFullPageLoading: true,
      onSuccess: () => { refreshComments() },
      successMessage: 'Comment successfully deleted'
    }
  )
  
  if (Array.isArray(projectsComments) && projectsComments.length > 0) {
    return (
      <Grid container item xs={12}>
        {projectsComments.map((comment) => (
          <CommentBox
            removeComment={removeComment}
            userIsTheOwner={comment.user.id === userId}
            key={comment.id}
            author={comment.user.name}
            {...comment}
          />
        ))}
      </Grid>
    )
  }

  return (
    <EmptyResults
      height="100%"
      mainMessage="There is no comments found"
      suggestiontext="Add a comment above"
    />
  )
 
}

export default React.memo(CommentList)
