import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Comment from './Comment'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, CollapseWithFade, Avatar } from '../atoms'
import { CommentInput } from '../molecules'

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
  children,
  src,
  content,
  mentions,
  date,
  author,
  user
}) => {
  const [open, setOpen] = React.useState(false)
  const [reply, setReply] = React.useState(false)

  const classes = useStyles()
  const childrenCount = React.Children.count(children)
  const hasChildren = childrenCount > 0
  const hasLine = open && hasChildren

  return (
    <Grid container wrap="nowrap" className={classes.container}>
      <Grid container item xs={12} >
        <Box height="100%" >
          <Box height="100%" display="flex" flex="1" flexDirection="column" alignItems="center" >
            <Avatar growthTimes={7} src={src} name={author} />

            <Box height="100%" paddingY={1}>
              {(hasLine || reply) && <Divider component="div" orientation="vertical" variant="middle" />}
            </Box>
          </Box>
        </Box>
        
        <Box display="flex" flex={1} ml={1.5}>
          <Box display="flex" flexDirection="column" width="100%">
            <Comment
              handleToggleReplies={() => setOpen(prevVal => !prevVal)}
              src={src}
              content={content}
              mentions={mentions}
              date={date}
              user={user}
              hasChildren={hasChildren}
              toggleReply={() => setReply(prevVal => !prevVal)}
              numberOfreplies={childrenCount}
            />
            
            <Box className={classes.collapseWrapper}>
             {hasChildren && 
                <CollapseWithFade in={open}>
                  {children}
                </CollapseWithFade>
              }

              <CollapseWithFade in={reply}>
                <CommentInput avatarGrowth={7} submitLabel="Submit" buttonPlacement="inside" />
              </CollapseWithFade>
            </Box>

          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}


export default CommentBox
