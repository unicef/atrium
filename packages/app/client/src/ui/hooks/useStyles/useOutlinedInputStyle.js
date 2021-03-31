import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => (
  {
    inputLabel: {
      color: 'black',
      marginBottom: 6,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '15px',
    },
    input: props => (
      {
        color: props.hasError ? theme.palette.error.main : theme.colors[props.borderColorFocus],
        padding: '17px 23px 19px 18px',

        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '180%',
      }
    ),
    root: props => ({
      overflow: 'hidden',
      border: `1.2px solid ${props.hasError ? theme.palette.error.main : theme.colors[props.borderColor]}`,
      maxHeight: 56,
    }),
    notchedOutline: {
      border: 'none',
    },
    focused: props => ({
      border: `1.6px solid ${props.hasError ? theme.palette.error.main : theme.colors[props.borderColorFocus]}`
    }),
    error: {
      border: `1.2px solid ${theme.palette.error.main}`
    },
    errorMessage: {
      marginLeft: 0,
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '13px',
      lineHeight: '140%',
      color: theme.palette.error.main
    },
  }
))

const useOutlinedInput = (props) => styles(props)

export default useOutlinedInput