import React from 'react'
import Box from '@material-ui/core/Box'
import { TextField, Button, TextButton } from '../atoms'
import CurrentUserAvatar from './CurrentUserAvatar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  textInput: props => ({
    padding: props.inputInnerPadding,
    backgroundColor: theme.colors.white
  })
}))

const CommentInput = ({
  content,
  showAvatar,
  src,
  rows,
  inputInnerPadding,
  submitLabel,
  handleSubmit,
  avatarGrowth,
  buttonPlacement,
  buttonPositioning,
  cancelButton,
  onCancel
}) => {
  const classes = useStyles({ inputInnerPadding })
  const [value, setValue] = React.useState(content)
  const isInnerButton = buttonPlacement === 'inside'

  const renderButton = () => {
    const onSubmit = () => {
      if (value) {
        handleSubmit(value)
        setValue('')
      }
    }

    if (isInnerButton) {
      return (
        <Box position="absolute" right={15} top={15}>
          <TextButton
            onClick={onSubmit}
            textContent={submitLabel}
          />
        </Box>
      )
    }

    return (
      <Box display="flex" justifyContent={buttonPositioning}>
        {cancelButton && 
          <Box mr={1} mt={2}>
            <Button
              onClick={onCancel}
              variant="outlined"
            >
              Cancel
            </Button>
          </Box>
        }

        <Box mt={2}>
          <Button
            onClick={onSubmit}
            color="primary"
          >
            {submitLabel}
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box display="flex" flex={1} mt={2}>
      <Box mt={1} ml={1}>
        {showAvatar && <CurrentUserAvatar avatarGrowth={avatarGrowth} showInfos={false} src={src} />}
      </Box>
      <Box position="relative" display="flex" width="100%" flexDirection="column" pl={1}>
        <TextField
          padding="5px"
          className={classes.textInput}
          multiline
          rows={rows}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        
        {renderButton()}
      </Box>
    </Box>
  )
}

CommentInput.defaultProps = {
  inputInnerPadding: 5,
  avatarGrowth: 8,
  showAvatar: true,
  cancelButton: false,
  onCancel: () => {}
}

export default CommentInput
