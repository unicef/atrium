import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'

const useStyles = makeStyles(
  {
    inputLabel: {
      color: 'black',
      marginBottom: 6,
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '15px',
    },
    input: {
      padding: '17px 23px 19px 18px',
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      lineHeight: '180%',
    },
    inputRoot: {
      overflow: 'hidden',
      '&$focused $notchedOutline': {
        border: '2px solid #636767'
      },
    },
    notchedOutline: {},
    focused: {},
    helperText: {
      marginLeft: 0,
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '13px',
      lineHeight: '140%',
    },
    root: {
      borderRadius: 3,
      color: 'gray',

      'label + &': {
        marginTop: 0,
      }
    } 
  }
)

function UiTextField({
  errorMessage,
  htmlFor,
  helperText,
  error,
  label,
  ...props
}) {
  const classes = useStyles()
  console.log('value')
  return (
    <>
      <InputLabel
        className={classes.inputLabel}
        shrink
        htmlFor={htmlFor}
      >
        {label}
      </InputLabel>
      <TextField
        variant="outlined"
        error={error}
        InputProps={{ 
          classes: {
            root: classes.inputRoot,
            notchedOutline: classes.notchedOutline,
            focused: classes.focused,
            input: classes.input
          },
          disableUnderline: true
        }}
        FormHelperTextProps={{
          classes: {
            root: classes.helperText
          }
        }}
        classes={{
          root: classes.root,
        
        }}
        helperText={error ? errorMessage : helperText}
        {...props}
      />
    </>
  )

}

export default React.memo(UiTextField)
