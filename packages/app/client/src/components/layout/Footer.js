import React from 'react'
import { withStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ATRIUM_CONSTANTS } from '../../unin-constants'
import { useNavLinkStyle } from '../../ui/hooks'

const styles = theme => ({
    root: {
    position: 'relative',
    display: 'flex',
    padding: '40px 100px 40px 100px',
    backgroundColor: theme.colors['light-gray-three'],
    [theme.breakpoints.down("sm")]: {
      height: 'max-content',
      flexDirection: 'column',
      padding: 10
    }
  },
  nav: {
    display: 'flex',
    flexGrow: 1,
    marginRight: '5rem',
    height: '100%',
    overflow: 'hidden',
    maxHeight: 233,
    [theme.breakpoints.down("sm")]: {
      maxHeight: 180,
    }
  },
  navList: {
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  navItem: {
    listStyle: 'none',
    height: 40,
    width: '100%',
    '&:not(:last-child)': {
      marginRight: 61
    }
  }
})

const links = [
  { path: '/about', name: 'About', id: 'About' },
  { path: '/view-projects', name: 'Projects', id: 'Projects' },
  {
    path: `mailto:${ATRIUM_CONSTANTS.ATRIUM_EMAIL_CONTACT}`,
    name: 'Contact Us',
    id: 'ContactUs'
  },
  { path: '/learn', name: 'Learn', id: 'Learn' },
  { path: '/engage', name: 'Forum', id: 'Forum' },
  { path: '/whatsnew', name: "What's new", id: 'WhatsNew' },
]

const InfoText = ({ children, classes }) => (
  <Grid item container xs={12} sm={6}>
    <Typography className={classes.text}>
     {children} 
    </Typography>
  </Grid>
)

const StyledInfoText = withStyles((theme) => (
  {
    text: {
      color: theme.colors['dark-gray'],
      fontSize: 14
    }
  }
))(InfoText)

const Footer = ({ classes }) => {
  const navLinkStyle = useNavLinkStyle({ lowerCase: true })

  return (
    <footer className={classes.root}>
      <Grid container xs={12}>
        <Grid item container xs={12} sm={12} md={6}>
          <nav className={classes.nav}>
            <ul className={classes.navList}>
              {links.map((obj) => (
                <li key={`footerNav${obj.id}`} className={classes.navItem}>
                  <a
                    href={obj.path}
                    className={navLinkStyle}
                  >
                    {obj.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Grid>
        <Grid spacing={4} item container justify="space-evenly" xs={12} sm={12} md={6}>
          <StyledInfoText>
            The Atrium has been established as a decentralized collaboration tool by the 
            United Nations Development Programme (UNDP), UNICEF, the World Food Programme (WFP) and the UN Innovation Network (UNIN). 
          </StyledInfoText>
          <StyledInfoText>
            We are looking for other organizations that would be interested in setting up their own node, 
            therefore, participating by increasing the resilience of the system. If interested, please contact blockchain@uninnovation.network. 
          </StyledInfoText>
        </Grid>
        <StyledInfoText>
          The Atrium, 2020
        </StyledInfoText>
      </Grid>
    </footer>
  ) 
}

export default withStyles(styles)(Footer)
