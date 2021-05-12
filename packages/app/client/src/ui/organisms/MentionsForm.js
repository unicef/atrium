import React from 'react'
import Box from '@material-ui/core/Box'
import MentionsTextArea from './MentionsTextArea'
import { CurrentUserAvatar } from '../molecules'
import { Button, TextButton } from '../atoms'

const MentionsForm = ({ minHeight, buttonPlacement, submitLabel, showAvatar, handleSubmit, avatarGrowth, content, mentions }) => {
  const isInnerButton = buttonPlacement === 'inside'

  const renderButton = ({ onExtractData, onExtractMentions }) => {
    const onSubmit = () => {
      handleSubmit({ mentions: onExtractMentions(), text: onExtractData() })
    }

    if (isInnerButton) {
      return (
        <Box>
          <TextButton
            onClick={onSubmit}
            textContent={submitLabel}
          />
        </Box>
      )
    }

    return (
      <Box>
        <Button
          onClick={onSubmit}
          color="primary"
        >
          {submitLabel}
        </Button>
      </Box>
    )
  }

  const handleButtonRenderer = () => {
    if (isInnerButton) return { renderInnerButton: renderButton }

    return { renderOuterButton: renderButton }
  }

  return (
    <Box display="flex" flex={1} mt={2}>
      {showAvatar && 
        <Box display="flex">
          <CurrentUserAvatar avatarGrowth={avatarGrowth} showInfos={false} />
        </Box>
      }
      <Box display="flex" width="100%" flexDirection={isInnerButton ? "row" : "column"} pl={1}>
        <MentionsTextArea content={content} mentions={mentions}  minHeight={minHeight} {...handleButtonRenderer()} />
      </Box>
    </Box>
  )
}

MentionsForm.defaultProps = {
  buttonPlacement: 'outside',
  showAvatar: true
}

export default MentionsForm
