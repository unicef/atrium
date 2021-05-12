import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import UserInfoTooltip from './UserInfoTooltip'
import SubdirectoryArrowRightOutlinedIcon from '@material-ui/icons/SubdirectoryArrowRightOutlined'
import HorizontalCardWithMenu from './HorizontalCardWithMenu'
import { makeStyles } from '@material-ui/core/styles'
import { TextButton, Divider, CollapseWithFade, Avatar, Authorship } from '../atoms'
import { InputWithAvatar, TextWithMentions, CardInfoRow } from '../molecules'
import DeleteActionDialog from './DeleteActionDialog'

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

const Comment = ({ 
  children, 
  userIsTheOwner, 
  src,
  content,
  mentions,
  date,
  author,
  user,
}) => {
  const [open, setOpen] = React.useState(false)
  const [reply, setReply] = React.useState(false)
  const [showDeletionModal, setDeletionModalVisibility] = React.useState(false)

  const classes = useStyles()
  const childrenCount = React.Children.count(children)
  const hasChildren = childrenCount > 0
  const hasLine = open && hasChildren

  const menuItems = [
    {
      label: 'Edit',
      handleClick: () => {}
    },
    {
      label: 'Delete',
      handleClick: () => setDeletionModalVisibility(true)
    }
  ]

  return (
    <Grid container wrap="nowrap" className={classes.container}>
      <Grid container item xs={12} >
        <Box height="100%" >
          <Box height="100%" display="flex" flex="1" flexDirection="column" alignItems="center" >
            <Avatar growthTimes={5} src={src} name={author} />

            <Box height="100%" paddingY={1}>
              {(hasLine || reply) && <Divider component="div" orientation="vertical" variant="middle" />}
            </Box>
          </Box>
        </Box>
        
        <Box display="flex" flex={1} ml={1.5}>
          <Box display="flex" flexDirection="column" width="100%">
            <HorizontalCardWithMenu
              padding={userIsTheOwner ? "5px 30px 10px 10px" : "0 30px 10px 10px"}
              menuItems={menuItems}
              userIsTheOwner={userIsTheOwner}
            >
              <Box width="100%" display="flex">
                <Box width="95%" mb={0.5}>
                  <UserInfoTooltip user={{ ...user, src }}>
                    <Authorship author={user.name} />
                  </UserInfoTooltip>
                  <TextWithMentions
                      mentions={mentions}
                    >
                      {content}
                    </TextWithMentions>
                  </Box>
              </Box>

              <Box display="flex" flex={1} flexDirection="column">
                <Box display="flex" flex={1} alignItems="center">
                  <CardInfoRow
                    components={[
                      {
                        type: 'textbutton',
                        textContent: "Like"
                      },
                      {
                        type: 'textbutton',
                        textContent: "Reply",
                        onClick: () => setReply(op => !op)
                      },
                      {
                        type: 'text',
                        children: '330 Likes'
                      },
                      {
                        type: 'date',
                        variant: 'relative',
                        date: new Date(date)
                      }
                    ]}
                  />
                </Box>

                <Box>
                  {hasChildren && 
                      <TextButton
                        textContent={`${childrenCount} Replies`}
                        startIcon={<SubdirectoryArrowRightOutlinedIcon />}
                        onClick={() => {
                          setOpen(op => !op)
                        }}
                      />
                    }
                </Box>

              </Box>
             
            </HorizontalCardWithMenu>
            
            <Box className={classes.collapseWrapper}>
             {hasChildren && 
                <CollapseWithFade in={open}>
                  {children}
                </CollapseWithFade>
              }

              <CollapseWithFade in={reply}>
                <InputWithAvatar />
              </CollapseWithFade>
            </Box>

            <DeleteActionDialog
              open={showDeletionModal}
              handleClose={() => setDeletionModalVisibility(false)}
              onConfirm={() => {}}
            />

          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}


export default Comment
