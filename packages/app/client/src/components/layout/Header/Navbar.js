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
  { path: '/engage', name: 'Forum' }
]

const NavBar = ({ classes }) => (
  <nav className={classes.nav}>
    <ul className={classes.navList}>
      {links.map((obj, k) => (
        <li key={k} className={classes.navItem}>
          <NavLink
            to={obj.path}
            className={classes.navLink}
            activeClassName={classes.activeNavLink}
          >
            {obj.name}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
)

export default withStyles(styles)(NavBar)
