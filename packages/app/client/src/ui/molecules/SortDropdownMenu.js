import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { Popper, Typography, Divider, MenuItem } from '@material-ui/core'
import { Button } from '../'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import classnames from 'classnames'

const useStyles = makeStyles(theme => ({
  button: {
    padding: 0,
    width: '100%',
    height: 40
  },
  thisIsNotHowYouMakeButtons: {
    fontFamily: 'Red Hat Display Medium, sans-serif',
    fontSize: 12
  },
  chevron: {
    transition: 'transform ease-in-out 0.2s'
  },
  chevronOpen: {
    transform: 'rotate(180deg)'
  },
  option: {
    height: 44,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 12,
    fontFamily: 'Red Hat Display',
    fontWeight: 500,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: theme.colors['light-green']
    }
  }
}))

const directions = ['desc', 'asc']

export const SortDropdownMenu = React.memo(
  ({ label, options, buttonClassName, value, onChange }) => {
    const [open, setOpen] = React.useState(false)
    const classes = useStyles({ open })

    const arrowClassNames = classnames(classes.chevron, {
      [classes.chevronOpen]: open
    })

    const toggleMenu = e => {
      setOpen(!open)
    }

    /**
     * Get the new option.
     * If same option is selected twice, toggle between ascending and descending
     * @param {Event} e
     * @param {{value: string, label: string}} option
     */
    const onOptionClick = (e, option) => {
      toggleMenu(e)

      let directionIndex = 0
      if (option.value === value.value) {
        directionIndex = +!directions.findIndex(dir => dir === value.direction)
      }

      const updatedOption = {
        ...option,
        direction: directions[directionIndex]
      }
      onChange(updatedOption)
    }

    let text = label
    if (value) {
      text = value.label
    }

    return (
      <>
        <Button
          id={'sort-dropdown'}
          size={'large'}
          onClick={toggleMenu}
          className={classes.button}
          color="secondary"
        >
          <Typography
            variant="subtitle2"
            className={classes.thisIsNotHowYouMakeButtons}
            noWrap
          >
            {text}
          </Typography>
          <KeyboardArrowDownIcon className={arrowClassNames} />
        </Button>
        <Popper
          open={open}
          anchorEl={() => document.getElementById('sort-dropdown')}
          transition
          disablePortal
          placement="bottom-end"
        >
          {({ TransitionProps }) => (
            <ClickAwayListener
              onClickAway={() => {
                setOpen(false)
              }}
            >
              <Fade {...TransitionProps} timeout={350}>
                <Paper className={classes.paper}>
                  {options.map((opt, i) => (
                    <>
                      {i > 0 ? <Divider key={`divider-${i}`} /> : null}
                      <MenuItem
                        key={i}
                        className={classes.option}
                        value={opt.value}
                        onClick={e => onOptionClick(e, opt)}
                      >
                        {opt.label}
                      </MenuItem>
                    </>
                  ))}
                </Paper>
              </Fade>
            </ClickAwayListener>
          )}
        </Popper>
      </>
    )
  }
)

SortDropdownMenu.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  buttonClassName: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired
}
