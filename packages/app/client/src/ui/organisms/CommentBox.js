import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Comment from './Comment'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, Avatar } from '../atoms'
import CommentTree from './CommentTree'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 10,
    marginBottom: 5
  },
  collapseWrapper: {
    marginLeft: 7,
    paddingLeft: 18,
  },
  textInput: {
    padding: 5
  },
  contentText: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '15px',
    lineHeight: '150%',
  }
}))

const CommentBox = ({ 
  src,
  content,
  mentions,
  date,
  author,
  user,
  removeComment,
  id,
  replies,
  likes,
}) => {
  // TODO: IMPROVE TO USE MENTIONS
  const [repliesAreExpanded, expandReplies] = React.useState(false)
  const [replyInputIsVisible, showReplyInput] = React.useState(false)
  const [savedReplies, setReplies] = React.useState(replies)

  const hasChildren = savedReplies.length > 0
  const hasLine = repliesAreExpanded && hasChildren
  const classes = useStyles()

  return (
    <Grid container wrap="nowrap" className={classes.container}>
      <Grid container item xs={12} >
        <Box height="100%" >
          <Box height="100%" display="flex" flex="1" flexDirection="column" alignItems="center" >
            <Avatar growthTimes={7} src={src} name={author} />

            <Box height="100%" paddingY={1}>
              {(hasLine || replyInputIsVisible) && <Divider component="div" orientation="vertical" variant="middle" />}
            </Box>
          </Box>
        </Box>
        
        <Box display="flex" flex={1} ml={1.5}>
          <Box display="flex" flexDirection="column" width="100%">
            <Comment
              removeComment={removeComment}
              handleToggleReplies={() => expandReplies(prevVal => !prevVal)}
              src={src}
              content={content}
              mentions={mentions}
              date={date}
              id={id}
              user={user}
              hasChildren={hasChildren}
              toggleReply={() => showReplyInput(prevVal => !prevVal)}
              numberOfReplies={savedReplies.length}
              likes={likes}
            />
            
            <Box className={classes.collapseWrapper}>
              <CommentTree
                parentId={id}
                openReplies={repliesAreExpanded}
                replyInputIsVisible={replyInputIsVisible}
                userId={user.id}
                dissmissReplyInput={() => showReplyInput(false)}
                expandReplies={() => expandReplies(true)}
                collapseReplies={() => expandReplies(false)}
                setReplies={setReplies}
                replies={savedReplies}
              />
            </Box>

          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}


export default CommentBox
