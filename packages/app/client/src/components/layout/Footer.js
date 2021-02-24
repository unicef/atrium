import React from 'react'
import { withStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import { ATRIUM_CONSTANTS } from '../../unin-constants'

import { TwitterIcon } from './assets'

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    height: 40,
    backgroundColor: theme.colors['shamrock-green'],
    '@media (max-width: 450px)': {
      height: 'max-content',
      flexDirection: 'column',
      padding: 10
    }
  },
  nav: {
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  },
  navList: {
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center'
  },
  navItem: {
    listStyle: 'none',
    '&:not(:last-child)': {
      marginRight: 29
    }
  },
  navLink: {
    position: 'relative',
    padding: '5px 3px',
    fontSize: 12,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.colors['white'],
    textTransform: 'uppercase',
    textDecoration: 'none',
    letterSpacing: 0.8,
    outlineColor: 'white',
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
      // backgroundColor: theme.colors['white'],
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
  }
})

const Footer = ({ classes }) => {
  const links = [
    { path: '/about', name: 'About' },
    {
      path: `mailto:${ATRIUM_CONSTANTS.ATRIUM_EMAIL_CONTACT}`,
      name: 'Contact Us'
    }
  ]

  const viewNav = links.map((obj, k) => (
    <li key={k} className={classes.navItem}>
      <Button href={obj.path} className={classes.navLink}>
        {obj.name}
      </Button>
    </li>
  ))

  return (
    <footer className={classes.root}>
      <nav className={classes.nav}>
        <ul className={classes.navList}>{viewNav}</ul>
      </nav>
      <div className={classes.social}>
        <a
          href="https://twitter.com/un_innovation"
          aria-label="Twitter social link"
          className={classes.socialLink}
        >
          <img
            src={TwitterIcon}
            alt="Twitter social icon"
            className={classes.socialIcon}
          />
        </a>
      </div>
    </footer>
  )
}

export default withStyles(styles)(Footer)
