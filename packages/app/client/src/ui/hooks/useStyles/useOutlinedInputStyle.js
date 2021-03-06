import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => (
  {
    inputLabel: props => ({
      color: theme.colors[props.labelColor],
      marginBottom: 6,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '15px',
      fontFamily: theme.typography.fontFamily,
    }),
    input: props => (
      {
        color: props.hasError ? theme.palette.error.main : theme.colors[props.borderColorFocus],
        padding: props.padding,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '180%',
        fontFamily: theme.typography.fontFamily,
      }
    ),
    root: props => ({
      overflow: 'hidden',
      border: `1.2px solid ${props.hasError ? theme.palette.error.main : theme.colors[props.borderColor]}`
    }),
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

const useOutlinedInput = ({ borderColor, padding, borderColorFocus, hasError, labelColor } = {
  borderColor: 'light-gray-two',
  borderColorFocus: 'black-two',
  padding: '17px 23px 19px 18px',
  hasError: false,
  labelColor: 'black'
}) => styles({ borderColor, padding, borderColorFocus, hasError, labelColor })

export default useOutlinedInput