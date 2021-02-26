import React from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  nav: {
    display: 'flex',
    flexGrow: 1,
    marginRight: '5rem',
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
      marginRight: 31
    }
  },
  navLink: {
    fontFamily: 'Red Hat Display Medium, sans-serif',
    position: 'relative',
    padding: '17px 0',
    fontSize: 12,
    letterSpacing: '0.8px',
    color: 'black',
    textTransform: 'uppercase',
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
  },
  activeNavLink: {
    color: theme.colors['shamrock-green'],
    fontWeight: 'bold'
  }
})

const links = [
  { path: '/learn', name: 'Learn' },
  { path: '/view-projects', name: 'Projects' },
  { path: process.env.REACT_APP_FORUM_URL, name: 'Forum' }
]

const PathNavLink = ({ obj, classes }) => {
  if(obj.path.startsWith('/')) {
    return (
      <NavLink
        to={obj.path}
        className={classes.navLink}
        activeClassName={classes.activeNavLink}
      >
        {obj.name}
      </NavLink>
    )
  } else {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={classes.navLink}
        activeClassName={classes.activeNavLink}
        href={obj.path}
      >
        {obj.name}
      </a>
    )
  }
}

const NavBar = ({ classes }) => (
  <nav className={classes.nav}>
    <ul className={classes.navList}>
      {links.map((obj, k) => (
        <li key={k} className={classes.navItem}>
          <PathNavLink obj={obj} classes={classes}></PathNavLink>
        </li>
      ))}
    </ul>
  </nav>
)

export default withStyles(styles)(NavBar)
