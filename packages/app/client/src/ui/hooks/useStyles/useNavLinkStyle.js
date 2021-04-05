import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => (
  {
    navLink: (props) => {
      const textTransform = props.lowerCase ? {} : { textTransform: 'uppercase' }
      return {
        fontFamily: 'Red Hat Display Medium, sans-serif',
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
        '&::after': {
          position: 'absolute',
          content: "''",
          display: 'block',
          bottom: 2,
          height: 2,
          width: '100%',
          backgroundColor: 'transparent',
          transition: '0.2s ease'
        },
        '&:hover': {
          color: theme.colors['shamrock-green'],
          fontWeight: 'bold'
        }
      }
    }
  }
))

const useNavLinkStyle = (props) => useStyles(props).navLink

export default useNavLinkStyle
