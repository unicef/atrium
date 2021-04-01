import React from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import { useNavLinkStyle } from '../../../ui/hooks'
import { Nav } from '../../../ui'

const styles = theme => ({
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
  const navLinkStyle = useNavLinkStyle({ fontSizeMobile: 10 })

  return (
    <Nav
      links={links}
      renderLink={
        (obj) => (
          <NavLink
            to={obj.path}
            className={navLinkStyle}
            activeClassName={classes.activeNavLink}
          >
            {obj.name}
          </NavLink>
        )
      }
    />
  )
}

export default withStyles(styles)(NavBar)
