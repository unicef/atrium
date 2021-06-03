import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Caret } from '../assets'
import { ATRIUM_CONSTANTS } from '../../../unin-constants'

const styles = theme => ({
  caretClosed: {
    width: 20,
    height: 20,
    transform: 'rotate(-180deg)',
    marginRight: 15,
    cursor: 'pointer'
  },
  caretOpen: {
    width: 20,
    height: 20,
    marginRight: 15,
    cursor: 'pointer'
  },
  menuOffset: {
    top: '40px !important',
    left: '-20px !important',
    '& > *:nth-child(3) > *:first-child': {
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
      borderRadius: 5
    },
    '& .MuiList-padding': {
      padding: 0
    }
  },
  menuItemCustom: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 3.2,
    paddingLeft: 25,
    width: 160,
    letterSpacing: 1
  },
  borderBottom: {
    borderBottom: `1px solid ${theme.colors['light-gray']}`
  }
})

const DropdownHeaderMenu = withStyles(styles)(({ logoutUser, classes }) => {
  const [menuAnchor, setMenuAnchor] = React.useState(null)

  const onLogoutClick = useCallback(
    e => {
      e.preventDefault()
      logoutUser()
    },
    [logoutUser]
  )
  const handleOpenDropdownMenu = event => {
    setMenuAnchor(event.currentTarget)
  }

  const handleCloseDropdownMenu = () => {
    setMenuAnchor(null)
  }

  return (
    <div style={{ cursor: 'pointer' }}>
      <Caret
        className={
          Boolean(menuAnchor) ? classes.caretOpen : classes.caretClosed
        }
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpenDropdownMenu}
      />
      <Menu
        id="simple-menu"
        className={classes.menuOffset}
        open={Boolean(menuAnchor)}
        onClose={handleCloseDropdownMenu}
        anchorEl={menuAnchor}
      >
        <MenuItem
          className={`${classes.menuItemCustom} ${classes.borderBottom}`}
          onClick={() =>
            (document.location.href = `mailto:${ATRIUM_CONSTANTS.ATRIUM_EMAIL_CONTACT}`)
          }
        >
          CONTACT US
        </MenuItem>
        <MenuItem className={classes.menuItemCustom} onClick={onLogoutClick}>
          SIGN OUT
        </MenuItem>
      </Menu>
    </div>
  )
})

DropdownHeaderMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default DropdownHeaderMenu
