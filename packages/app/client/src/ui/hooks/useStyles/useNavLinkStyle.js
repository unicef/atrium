import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => (
  {
    navLink: (props) => {
      const textTransform = props.lowerCase ? {} : { textTransform: 'uppercase' }
      return {
        fontFamily: theme.typography.fontFamily,
        position: 'relative',
        fontSize: props.fontSize || 12,
        [theme.breakpoints.down("xs")]: {
          fontSize: props.fontSizeMobile || 12,
        },
        letterSpacing: '0.8px',
        color: 'black',
        ...textTransform,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          color: theme.colors['shamrock-green']
        }
      }
    }
  }
))

const useNavLinkStyle = (props) => useStyles(props).navLink

export default useNavLinkStyle
