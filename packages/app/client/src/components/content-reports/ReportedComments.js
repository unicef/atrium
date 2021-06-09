import { Grid } from '@material-ui/core'
import React from 'react'
import { ActionDialog, CardInfoRow, HorizontalCardWithMenu } from '../../ui'
import { useProjectsAsyncActions, useHandledRequest } from '../../ui/hooks'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useHistory } from 'react-router'
import { deleteComment } from '../../api/projects'

const ReportedComments = ({ comments }) => {
  const { reportComment } = useProjectsAsyncActions()
  const userIsTheOwner = true
  const [showDeletionModal, setDeletionModalVisibility] = React.useState(false)
  const history = useHistory()

  const handledRequest = useHandledRequest()
  const removeComment = handledRequest({
    request: deleteComment,
    showFullPageLoading: true,
    onSuccess: () => window.location.reload(),
    successMessage: 'Comment successfully deleted'
  })

  return (
    <Grid container spacing={1} xs={12}>
      {comments &&
        comments.length > 0 &&
        comments.map(comment => (
          <Grid item xs={12} key={comment._id}>
            <HorizontalCardWithMenu
              key={comment._id}
              menuItems={[
                {
                  label: 'Delete',
                  handleClick: () => {
                    setDeletionModalVisibility(true)
                  }
                },
                {
                  label: 'Unreport',
                  handleClick: () => {
                    reportComment({ id: comment._id, reported: false })
                  }
                }
              ]}
              userIsTheOwner={userIsTheOwner}
            >
              <Box display="flex" mb={1}>
                <CardInfoRow
                  components={[
                    {
                      type: 'authorship',
                      author: comment.user.name
                    },
                    {
                      type: 'date',
                      variant: 'absolute',
                      date: comment.date
                    }
                  ]}
                />
              </Box>
              <Typography
                onClick={() =>
                  history.push(`projects/view/${comment.projectId}/comments`)
                }
              >
                {comment.content}
              </Typography>
            </HorizontalCardWithMenu>
            <Grid>
              <span>{comment.reportMessage}</span>
            </Grid>
            <ActionDialog
              open={showDeletionModal}
              handleClose={() => setDeletionModalVisibility(false)}
              onConfirm={async () => {
                await removeComment(comment._id)
                setDeletionModalVisibility(false)
              }}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default ReportedComments
