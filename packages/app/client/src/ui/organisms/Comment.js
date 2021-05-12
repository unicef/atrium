import React from 'react'
import Box from '@material-ui/core/Box'
import SubdirectoryArrowRightOutlinedIcon from '@material-ui/icons/SubdirectoryArrowRightOutlined'
import HorizontalCardWithMenu from './HorizontalCardWithMenu'
import DeleteActionDialog from './DeleteActionDialog'
import MentionsForm from './MentionsForm'
import { TextButton, Authorship } from '../atoms'
import { TextWithMentions, CardInfoRow, UserInfoTooltip } from '../molecules'
import { useSelector } from 'react-redux'
import { getUserId } from '../../selectors'

const Comment = ({ 
  handleToggleReplies,
  src,
  content,
  mentions,
  date,
  user,
  hasChildren,
  toggleReply,
  numberOfreplies
}) => {
  const [showDeletionModal, setDeletionModalVisibility] = React.useState(false)
  const [showEdit, setEdit] = React.useState(false)
  const currentUserId = useSelector(getUserId)

  const userIsTheOwner = currentUserId === user._id

  const menuItems = [
    {
      label: 'Edit',
      handleClick: () => setEdit(true)
    },
    {
      label: 'Delete',
      handleClick: () => setDeletionModalVisibility(true)
    }
  ]
  return (
    <>
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
            {showEdit ? 
             <MentionsForm content={content} mentions={mentions} minHeight={50} showAvatar={false} buttonPlacement="inside" submitLabel="Confirm" handleSubmit={(props) => {
               console.log(props, 'lasjkdjskdj')
             }} /> : 
              <TextWithMentions
                mentions={mentions}
              >
                {content}
              </TextWithMentions>}
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
                  onClick: toggleReply
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
                textContent={`${numberOfreplies} Replies`}
                startIcon={<SubdirectoryArrowRightOutlinedIcon />}
                onClick={handleToggleReplies}
              />
            }
          </Box>

        </Box>
      </HorizontalCardWithMenu>
      <DeleteActionDialog
        open={showDeletionModal}
        handleClose={() => setDeletionModalVisibility(false)}
        onConfirm={() => {}}
      />
    </>
  )
}


export default Comment
