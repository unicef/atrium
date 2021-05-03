import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Collapse from '@material-ui/core/Collapse'
import SubdirectoryArrowRightOutlinedIcon from '@material-ui/icons/SubdirectoryArrowRightOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { useSpring, animated } from 'react-spring/web.cjs' // web.cjs is required for IE 11 support
import { HorizontalCardWithMenu } from '../organisms'
import { TextButton, Divider } from '../atoms'

const TransitionComponent = (props) => {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 10
  },
  avatar: {
    height: 35,
    width: 35
  },
  collapseWrapper: {
    marginLeft: 7,
    paddingLeft: 18,
  }
}))

const Comment = ({ content, children, userIsTheOwner = true, src }) => {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  const childrenCount = React.Children.count(children)
  const hasChildren = childrenCount > 0
  const hasLine = open && hasChildren

  return (
    <Grid container wrap="nowrap" className={classes.container}>
      <Grid container item xs={12} >
        <Box height="100%" >
          <Box height="100%" display="flex" flex="1" flexDirection="column" alignItems="center" >
            <Avatar className={classes.avatar} src={src} />

            <Box height="100%" paddingY={1}>
              {hasLine && <Divider component="div" orientation="vertical" variant="middle" />}
            </Box>
          </Box>
        </Box>
        
        <Box display="flex" flex={1} ml={1.5}>
          <Box display="flex" flexDirection="column" width="100%">
            <HorizontalCardWithMenu padding="10px 30px 10px 10px" menuItems={[]} userIsTheOwner={userIsTheOwner}>
              {content}
             {hasChildren && 
                <TextButton
                  textContent={!open ? `Show ${childrenCount} Replies` : 'Hide Replies'}
                  startIcon={<SubdirectoryArrowRightOutlinedIcon />}
                  onClick={() => setOpen(op => !op)}
                />
              }
             
            </HorizontalCardWithMenu>
            <Box className={classes.collapseWrapper}>
              <TransitionComponent in={open}>
                {children}
              </TransitionComponent>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}


export default Comment
