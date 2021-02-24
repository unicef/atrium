import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import { ReactComponent as PostIcon } from '../../icons/post.svg'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000'
    }
  }
})

export default Comment = props => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        id="outlined-start-adornment"
        value={props.commentContent}
        multiline
        rows={props.rows}
        onChange={props.onChange}
        value={props.commentText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={props.onClick}
              >
                <PostIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        variant="outlined"
        style={{
          width: '100%',
          overflowX: 'hidden',
          overflowY: 'hidden'
        }}
      />
    </ThemeProvider>
  )
}
