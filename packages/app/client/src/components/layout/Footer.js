import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/styles'
import { ATRIUM_CONSTANTS } from '../../unin-constants'

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    height: 233,
    padding: 40,
    backgroundColor: theme.colors['light-gray-three'],
    '@media (max-width: 450px)': {
      height: 'max-content',
      flexDirection: 'column',
      padding: 10
    }
  },
  nav: {
    height: '100%',
    display: 'flex',
    flexGrow: 1
  },
  navList: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap'
  },
  navItem: {
    listStyle: 'none',
    '&:not(:last-child)': {
      marginRight: 29
    }
  },
  navLink: {
    position: 'relative',
    fontSize: 12,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    textDecoration: 'none',
    letterSpacing: 0.8,
    outlineColor: 'white',
    marginBottom: 16,
    '&:after': {
      position: 'absolute',
      content: "''",
      display: 'block',
      bottom: 0,
      height: 1,
      width: '100%',
      backgroundColor: 'transparent',
      transition: '0.2s ease'
    },
    '&:hover:after': {
    }
  },
  social: {
    position: 'absolute',
    right: 16,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 450px)': {
      marginTop: 10,
      position: 'static',
      flexDirection: 'column'
    }
  },
  socialLink: {
    outlineColor: 'white'
  },
  socialIcon: {
    display: 'block',
    maxWidth: 31,
    objectFit: 'contain'
  },
  aboutText: {
    color: theme.colors['dark-gray'],
    fontSize: 14
  }
})

const Footer = ({ classes }) => {
  const links = [
    { path: '/about', name: 'About', id: 'About' },
    {
      path: `mailto:${ATRIUM_CONSTANTS.ATRIUM_EMAIL_CONTACT}`,
      name: 'Contact Us',
      id: 'ContactUs'
    },
    { path: '/learn', name: 'Learn', id: 'Learn' },
    { path: '/view-projects', name: 'Projects', id: 'Projects' },
    { path: '/engage', name: 'Forum', id: 'Forum' },
    { path: '/whatsnew', name: "What's new", id: 'WhatsNew' }
  ]

  const viewNav = links.map((obj) => (
    <li key={`footerNav${obj.id}`} className={classes.navItem}>
      <Button href={obj.path} className={classes.navLink}>
        {obj.name}
      </Button>
    </li>
  ))

  return (
    <footer className={classes.root}>
      <Grid item container justify="center" xs={12} sm={6}>
        <Grid item container xs={10}>
          <nav className={classes.nav}>
            <ul className={classes.navList}>{viewNav}</ul>
          </nav>
        </Grid>
      </Grid>
      <Grid item container justify="space-evenly" xs={12} sm={6}>
        <Grid item container xs={4}>
          <Typography className={classes.aboutText}>
            The Atrium has been established as a decentralized collaboration tool by the 
            United Nations Development Programme (UNDP), UNICEF, the World Food Programme (WFP) and the UN Innovation Network (UNIN). 
          </Typography>
        </Grid>
        <Grid item container xs={4}>
          <Typography className={classes.aboutText}>
            We are looking for other organizations that would be interested in setting up their own node, 
            therefore, participating by increasing the resilience of the system. If interested, please contact blockchain@uninnovation.network. 
          </Typography>
        </Grid>
      </Grid>
    </footer>
  )
}

export default withStyles(styles)(Footer)
