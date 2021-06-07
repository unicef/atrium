import React from 'react'
import Box from '@material-ui/core/Box'
import SubdirectoryArrowRightOutlinedIcon from '@material-ui/icons/SubdirectoryArrowRightOutlined'
import HorizontalCardWithMenu from './HorizontalCardWithMenu'
import ActionDialog from './ActionDialog'
import { TextButton, Authorship } from '../atoms'
import { TextWithMentions, CardInfoRow, UserInfoTooltip, CommentInput } from '../molecules'
import { useSelector } from 'react-redux'
import { getUserId } from '../../selectors'
import { editComment } from '../../api/projects'
import { useHandledRequest } from '../hooks'
import { Link } from 'react-router-dom'

const Comment = ({
  handleToggleReplies,
  src,
  content,
  mentions,
  date,
  user,
  hasChildren,
  toggleReply,
  numberOfReplies,
  id,
  likes,
  removeComment
}) => {
  // TODO: IMPROVE TO USE MENTIONS
  const [showDeletionModal, setDeletionModalVisibility] = React.useState(false)
  const [showEdit, setEdit] = React.useState(false)
  const [textContent, setContent] = React.useState(content)
  const currentUserId = useSelector(getUserId)
  const [savedLikes, setLikes] = React.useState(likes)
  const userIsTheOwner = currentUserId === user._id

  const handleLike = () => {
    setLikes(prevLikes => {
      const index = prevLikes.findIndex(lk => lk._id === user._id)
      if (index >= 0) {
        return prevLikes.filter(lk => lk._id !== user._id)
      }

      return [...prevLikes, { ...user }]
    })
  }

  const menuItems = [
    {
      label: 'Edit',
      handleClick: () => setEdit(true)
    },
    {
      label: 'Delete',
      handleClick: () => setDeletionModalVisibility(true)
    },
    {
      label: 'Report',
      handleClick: () => {}
    }
  ]

  const handledRequest = useHandledRequest()

  const updateComment = async ({ commentId, content }) => {
    const request = handledRequest(
      {
        request: editComment,
        onSuccess: () => {
          setContent(content)
          setEdit(false)
        },
        successMessage: 'Comment successfully updated',
        showFullPageLoading: true
      }
    )

    await request({ commentId, content })
  }

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
              <span>
                <Link to={`/profile/${user.id}/about`}>
                  <Authorship author={user.name} />
                </Link>
              </span>
            </UserInfoTooltip>
            {showEdit ?
             <CommentInput
              onCancel={() => setEdit(false)}
              cancelButton
              buttonPositioning="flex-end"
              rows={2}
              content={textContent}
              showAvatar={false}
              buttonPlacement="outside"
              submitLabel="Confirm"
              handleSubmit={(content) => updateComment({ content, commentId: id })}
            /> :
              <TextWithMentions
                mentions={mentions}
              >
                {textContent}
              </TextWithMentions>}
            </Box>
        </Box>

        <Box display="flex" flex={1} flexDirection="column">
          {!showEdit &&
            <Box display="flex" flex={1} alignItems="center">
              <CardInfoRow
                components={[
                  {
                    type: 'textbutton',
                    textContent: "Like",
                    onClick: handleLike
                  },
                  {
                    type: 'textbutton',
                    textContent: "Reply",
                    onClick: toggleReply
                  },
                  {
                    type: 'text',
                    children: `${savedLikes.length} Likes`
                  },
                  {
                    type: 'date',
                    variant: 'relative',
                    date: new Date(date)
                  }
                ]}
              />
            </Box>
          }

          <Box>
            {hasChildren &&
              <TextButton
                textContent={`${numberOfReplies} Replies`}
                startIcon={<SubdirectoryArrowRightOutlinedIcon />}
                onClick={handleToggleReplies}
              />
            }
          </Box>

        </Box>
      </HorizontalCardWithMenu>
      <ActionDialog
        open={showDeletionModal}
        handleClose={() => setDeletionModalVisibility(false)}
        onConfirm={() => {
          removeComment(id)
          setDeletionModalVisibility(false)
        }}
      />
    </>
  )
}


export default Comment
