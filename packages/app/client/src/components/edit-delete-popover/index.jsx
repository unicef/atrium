import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Divider from '@material-ui/core/Divider'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'
import ConfirmDeleteModal from './ConfirmDeleteModal'

const useStyles = makeStyles(theme => ({
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

export default function SimplePopover(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [openModal, setOpenModal] = React.useState(false)

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
      <ConfirmDeleteModal
        open={openModal}
        setOpen={setOpenModal}
        type={props.type}
        onDeleteClick={() => {
          if (props.onDeleteClick) {
            props.onDeleteClick()
            window.location.href = props.deleteRedirectUrl || '/'
          }
        }}
      />
      <IconButton
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <MoreHorizIcon />
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
        <Button
          className={classes.button}
          onClick={() => {
            if (props.onEditClick) {
              props.onEditClick(true)
              handleClose()
            }
          }}
        >
          Edit
        </Button>
        <Divider />
        <Button
          className={classes.button}
          onClick={() => {
            setOpenModal(true)
            handleClose()
          }}
        >
          Delete
        </Button>
      </Popover>
    </div>
  )
}
