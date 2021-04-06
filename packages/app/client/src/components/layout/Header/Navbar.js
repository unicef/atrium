import React from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import { useIsAuthenticated, useNavLinkStyle } from '../../../ui/hooks'
import { Nav } from '../../../ui'

const styles = theme => ({
  activeNavLink: {
    color: theme.colors['shamrock-green'],
    fontWeight: 'bold'
  }
})

const links = [
  { path: '/learn', name: 'Learn', public: true },
  { path: '/view-projects', name: 'Projects', public: false },
  { path: '/engage', name: 'Forum', public: false },
  { path: '/whatsnew', name: "What's new", public: true } // which route
]

const NavBar = ({ classes }) => {
  const navLinkStyle = useNavLinkStyle({ fontSizeMobile: 10 })
  const userIsAuthenticated = useIsAuthenticated()
  
  const filteredRoutes = links.filter(link => {
    if (!link.public) return userIsAuthenticated
    return link.public
  })

  return (
    <Nav
      links={filteredRoutes}
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
