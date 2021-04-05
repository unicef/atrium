import React from 'react'
import { makeStyles } from '@material-ui/styles'

const VARIANTS = {
  footer: {
    nav: {
      overflow: 'hidden',
      marginRight: '5rem',
    },
    navList: {
      flexDirection: 'column',
      flexWrap: 'wrap'
    },
    navItem: {
      height: '30%',
      width: '100%',
      '&:not(:last-child)': {
        marginRight: 61
      }
    }
  },
  header: {
    nav: {
      overflowX: 'scroll',
      overflowY: 'hidden',
      alignItems: 'center'
    },
    navList: {},
    navItem: {
      '&:not(:last-child)': {
        marginRight: 31
      }
    }
  }
}

const useStyles = makeStyles((theme) => ({
  nav: props => ({
    display: 'flex',
    width: '100%',
    height: '100%',
    maxHeight: props.maxHeight,
    [theme.breakpoints.down("sm")]: {
      maxHeight: props.maxHeightMobile,
    },
    ...VARIANTS[props.variant].nav
  }),
  navList: props => ({
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'left',
    ...VARIANTS[props.variant].navList
  }),
  navItem: props => ({
    listStyle: 'none',
    ...VARIANTS[props.variant].navItem
  })
}))

const Nav = ({ links, renderLink, maxHeight, maxHeightMobile, variant }) => {
  const classes = useStyles({ maxHeight, maxHeightMobile, variant })

  if (!Array.isArray(links)) {
    return null
  }

  return (
    <nav className={classes.nav}>
      <ul className={classes.navList}>
        {links.map((obj) => (
          <li key={obj.id} className={classes.navItem}>
            {renderLink(obj)}
          </li>
        ))}
      </ul>
    </nav>
  ) 
}

Nav.defaultProps = {
  variant: 'header',
  maxHeight: 50,
  maxHeightMobile: 50
}

export default Nav
