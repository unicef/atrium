import React from 'react'
import Box from '@material-ui/core/Box'
import { Avatar } from '../atoms'
import { TextField } from '../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  avatar: {
    marginRight: 5,
    marginTop: 9
  },
  textInput: props => ({
    padding: props.inputInnerPadding
  })
}))

const InputWithAvatar = ({ src, rows, inputInnerPadding, children,  }) => {
  const classes = useStyles({ inputInnerPadding })
  const [value, setValue] = React.useState('')

  return (
    <Box display="flex" flex={1} mt={2}>
      <Avatar growthTimes={7} className={classes.avatar} src={src} />
      <Box display="flex" width="100%" flexDirection="column" pl={1}>
        {/* TODO: IMPROVE TEXT FIELD STYLING FLEXIBILITY */}
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
        {typeof children === 'function' ? children(value) : children}
      </Box>
    </Box>
  )
}

InputWithAvatar.defaultProps = {
  inputInnerPadding: 5
}

export default InputWithAvatar
