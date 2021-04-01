import React from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import { useNavLinkStyle } from '../../../ui/hooks'

const styles = theme => ({
  nav: {
    display: 'flex',
    flexGrow: 1,
    marginRight: '5rem',
    justifyContent: 'left'
  },
  navList: {
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'left'
  },
  navItem: {
    listStyle: 'none',
    '&:not(:last-child)': {
      marginRight: 31
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
  { path: '/engage', name: 'Forum' },
  { path: '/whatsnew', name: "What's new" } // which route
]

const NavBar = ({ classes }) => {
  const navLinkStyle = useNavLinkStyle()

  return (
    <nav className={classes.nav}>
      <ul className={classes.navList}>
        {links.map((obj, k) => (
          <li key={k} className={classes.navItem}>
            <NavLink
              to={obj.path}
              className={navLinkStyle}
              activeClassName={classes.activeNavLink}
            >
              {obj.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default withStyles(styles)(NavBar)
