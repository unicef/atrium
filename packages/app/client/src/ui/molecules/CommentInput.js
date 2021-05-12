import React from 'react'
import Box from '@material-ui/core/Box'
import { Avatar, TextField, Button, TextButton } from '../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: 5,
    marginTop: 9
  },
  textInput: props => ({
    padding: props.inputInnerPadding,
    backgroundColor: theme.colors.white
  })
}))

const CommentInput = ({ content, showAvatar, src, rows, inputInnerPadding, submitLabel, handleSubmit, avatarGrowth, buttonPlacement, buttonPositioning }) => {
  const classes = useStyles({ inputInnerPadding })
  const [value, setValue] = React.useState(content)
  const isInnerButton = buttonPlacement === 'inside'

  const renderButton = (config) => {
    const onSubmit = () => {
      handleSubmit(value)
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
      {showAvatar && <Avatar growthTimes={avatarGrowth} className={classes.avatar} src={src} />}
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
        
        {buttons.map(renderButton)}
      </Box>
    </Box>
  )
}

CommentInput.defaultProps = {
  inputInnerPadding: 5,
  avatarGrowth: 7,
  showAvatar: true
}

export default CommentInput
