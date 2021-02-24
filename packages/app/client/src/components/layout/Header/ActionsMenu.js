import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import ButtonBase from '@material-ui/core/ButtonBase'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { ProjectIcon, VoteIcon } from '../assets'

const useDropDownStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1
  },
  dropdown: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    position: 'relative',
    padding: '13px 0',
    marginLeft: 13,
    ...theme.typography.button,
    fontSize: 12,
    letterSpacing: '0.8px',
    fontWeight: theme.typography.fontWeightMedium,
    color: 'black',
    transition: 'all 0.2s ease',
    '&:focus': {
      outline: '-webkit-focus-ring-color auto 1px'
    },
    '&::after': {
      position: 'absolute',
      content: "''",
      display: 'block',
      bottom: 0,
      height: 2,
      width: '100%',
      backgroundColor: 'transparent',
      transition: '0.2s ease'
    },
    '&:hover': {
      color: theme.colors['shamrock-green'],
      '&::after': {
        backgroundColor: theme.colors['shamrock-green']
      }
    }
  },
  rotateIcon: {
    transform: 'rotateX(180deg)',
    transition: 'transform 0.2s ease'
  },
  paper: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: 50,
    height: 'auto',
    width: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.5)'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 23px',
    ...theme.typography.button,
    fontSize: 12,
    letterSpacing: '0.8px',
    fontWeight: theme.typography.fontWeightMedium,
    color: 'black',
    textDecoration: 'none',
    transition: 'backgroundColor 0.2s ease',
    '&:hover': {
      backgroundColor: '#eee'
    },
    '&:not(:last-child)': {
      borderBottom: '1px solid #ececec'
    }
  },
  linkIcon: {
    display: 'block',
    height: 35,
    marginRight: 8
  }
}))

const MenuDropdown = () => {
  const classes = useDropDownStyles()
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(prev => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  return (
    <div className={classes.dropdown}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <ButtonBase className={classes.button} onClick={handleClick}>
            Add/Create
            <KeyboardArrowDown
              className={`${open ? classes.rotateIcon : ''}`}
            />
          </ButtonBase>
          <Fade in={open}>
            <Paper className={classes.paper} onClick={handleClick}>
              <Link to="/create-projects" className={classes.link}>
                <img
                  className={classes.linkIcon}
                  src={ProjectIcon}
                  alt="Create project icon"
                />
                Add Project
              </Link>
              <Link to="/create-polls" className={classes.link}>
                <img
                  className={classes.linkIcon}
                  src={VoteIcon}
                  alt="Create poll icon"
                />
                Create Poll
              </Link>
            </Paper>
          </Fade>
        </div>
      </ClickAwayListener>
    </div>
  )
}

const ActionsMenu = ({ onLogoutClick }) => {
  const classes = useDropDownStyles()

  return (
    <div className={classes.root}>
      <MenuDropdown />
      <ButtonBase className={classes.button} onClick={onLogoutClick}>
        <AccountCircle />
        <KeyboardArrowDown />
      </ButtonBase>
    </div>
  )
}

export default ActionsMenu
