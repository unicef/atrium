import React from 'react'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import MoreVert from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'

import { makeStyles } from '@material-ui/core/styles'
import Dividers from '../atoms/Divider'

const useStyles = makeStyles(() => ({
  button: {
    fontFamily: 'Red Hat Display Medium, sans-serif',
    fontSize: 10,
    lineHeight: '35px',
    textTransform: 'uppercase',
    minWidth: 91,
    minHeight: 35,
    padding: 0,
    paddingLeft: '2em',
    textAlign: 'left',
    justifyContent: 'left'
  }
}))

const ThreeDotsPopover = ({ menuItems }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <IconButton
        aria-describedby={id}
        variant="contained"
        color="black-three"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {menuItems.map((item, index) => {
          const isTheLastItem = (index + 1) === menuItems.length

          return (
            <>
              <Button
                key={item.id}
                className={classes.button}
                onClick={item.handleClick}
              >
                {item.label}
              </Button>
              {!isTheLastItem && <Dividers />}
            </>
          )
        })}
      </Popover>
    </div>
  )
}

export default ThreeDotsPopover
