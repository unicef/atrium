import React from 'react'
import TextField from './TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  counter: {
    position: 'absolute',
    right: 25,
    bottom: 0,
    transform: 'translate(0, -50%)',
    color: '#636767',
    fontSize: 13
  }
}))

const TextArea = ({ rows = 4, characterLimit, ...props }) => {
  const classes = useStyles()
  const characters = props.value ? props.value.length : 0

  return (
    <Box position="relative" width="100%">
      <TextField
        multiline={true}
        rows={rows}
        fullWidth
        {...props}
      />
      {Boolean(characterLimit) &&
        <Box className={classes.counter}>
          <Typography variant="body2">
            {characters} / {characterLimit}
          </Typography>
        </Box>
      }
    </Box>
  )
}

export default TextArea
