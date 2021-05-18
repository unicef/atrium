import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CommentBox from './CommentBox'
import LinearProgress from '@material-ui/core/LinearProgress'
import { replyComment, getCommentReplies } from '../../api/comments'
import { deleteComment } from '../../api/projects'
import { useHandledRequest } from '../hooks'
import { CollapseWithFade } from '../atoms'
import { CommentInput } from '../molecules'

// TODO: IMPROVE TO USE MENTIONS
const CommentTree = ({
  openReplies,
  parentId,
  replyInputIsVisible,
  userId,
  dissmissReplyInput,
  expandReplies,
  setReplies,
  replies,
  collapseReplies
}) => {
  const [isLoading, setLoading] = React.useState(false)
  
  const handledRequest = useHandledRequest()

  const onReply = (updatedComment) => {
    const newReplies = updatedComment.replies
    setReplies(newReplies)
  }

  const specificLoading = {
    show: () => setLoading(true),
    dismiss: () => setLoading(false)
  }

  const onRemove = (id) => {
    const filteredReplies = replies.filter(rpl => rpl.id !== id)
    setReplies(filteredReplies)
    if (filteredReplies.length === 0) {
      collapseReplies()
    }
  }

  const removeReply = async (id) => {
    const request = handledRequest(
      { 
        request: deleteComment,
        onSuccess: () => onRemove(id),
        specificLoading,
        showFullPageLoading: true,
        successMessage: 'Reply successfully deleted'
      }
    )

    await request(id)
  }

  const fetchReplies = handledRequest(
    { 
      request: getCommentReplies,
      onSuccess: (res) => setReplies(res.replies),
      specificLoading,
      showFullPageLoading: false
    }
  )

  const reply = handledRequest(
    { 
      request: replyComment,
      onSuccess: (res) => {
        onReply(res.comment)
        dissmissReplyInput()
        expandReplies()
      },
      specificLoading,
      successMessage: 'Reply successfully saved'
    }
  )

  React.useEffect(() => {
    if (openReplies) {
      fetchReplies(parentId)
    }
  }, [openReplies])

  const shouldExpandReplies = openReplies && replies.length > 0
  const renderReplies = replies.length > 0 && Boolean(replies[0].id)
  
  return (
    <Box 
      position="relative"
      width="100%"
      minHeight={openReplies || replyInputIsVisible ? 100 : 0}
    >
      <CollapseWithFade in={shouldExpandReplies}>
        <Grid container item xs={12}>
          {renderReplies && 
            replies.map((comment) => (
                <CommentBox
                removeComment={removeReply}
                userIsTheOwner={comment.user.id === userId}
                key={comment.id}
                author={comment.user.name}
                {...comment}
              />
            ))
          }
        </Grid>
      </CollapseWithFade>

      <CollapseWithFade in={replyInputIsVisible}>
        <CommentInput
          avatarGrowth={7}
          submitLabel="Submit"
          handleSubmit={(content) => reply({ content, mentions: [], commentId: parentId })}
          buttonPlacement="inside"
        />
      </CollapseWithFade>

      {isLoading &&
        <Box marginLeft="-25px">
          <LinearProgress />
        </Box>
      
      }
    </Box>
  )
}

export default React.memo(CommentTree)
