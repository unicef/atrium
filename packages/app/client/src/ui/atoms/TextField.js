import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
//import debounce from '../../utils/debounce'

const useStyles = makeStyles(theme => (
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
    input: props => (
      {
        color: props.error ? '#E63232' : '#202625',
        padding: '17px 23px 19px 18px',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '180%',
      }
    ),
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
))

function UiTextField({
  htmlFor,
  helperText,
  error,
  label,
  ...props
}) {
  const classes = useStyles({ error })

  return (
    <>
      <InputLabel
        className={classes.inputLabel}
        shrink
        htmlFor={htmlFor}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        variant="outlined"
        error={error}
        classes={{
          root: classes.inputRoot,
          notchedOutline: classes.notchedOutline,
          focused: classes.focused,
          input: classes.input
        }}
        helperText={error || helperText}
        labelWidth={0}
        {...props}
      />
    </>
  )

}

UiTextField.defaultProps = {
  fullWidth: true
}

export default React.memo(UiTextField)
