import React from 'react'
import { compose } from 'recompose'
import {
  withStyles,
  Button,
  Popper,
  Fade,
  Typography,
  Paper,
  Divider,
  ClickAwayListener
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import AddBoxIcon from '@material-ui/icons/AddBox'
import HowToVoteIcon from '@material-ui/icons/HowToVote'
import classnames from 'classnames'
import { withModals } from '../projects/modals'

const styles = theme => ({
  button: {
    padding: 0
  },
  chevron: {
    transition: 'transform ease-in-out 0.2s'
  },
  chevronOpen: {
    transform: 'rotate(180deg)'
  },
  paper: {}
})

const navigateButtonStyles = theme => ({
  navigateButton: {
    height: 64,
    padding: '0px 32px'
  },
  text: {
    marginLeft: 8
  }
})

const NavigateButton = withStyles(navigateButtonStyles)(
  ({ icon, text, onClick, classes }) => {
    return (
      <Button onClick={onClick} className={classes.navigateButton} fullWidth>
        {icon}
        <Typography className={classes.text} variant="subtitle2">
          {text}
        </Typography>
      </Button>
    )
  }
)

const AddCreateButton = ({ classes, history, buttonClassName, modals }) => {
  const [open, setIsOpen] = React.useState(false)

  const buttonClassNames = classnames(classes.button, {
    [buttonClassName]: !!buttonClassName
  })

  const arrowClassNames = classnames(classes.chevron, {
    [classes.chevronOpen]: open
  })

  const toggleMenu = e => {
    setIsOpen(!open)
  }

  const navigateToCreatePoll = () => {
    setIsOpen(false)
    history.push('/create-polls')
  }

  const navigateToCreateProject = () => {
    setIsOpen(false)
    modals.openPreCreate()
  }

  return (
    <>
      <Button
        id={'add-create-button'}
        onClick={toggleMenu}
        className={buttonClassNames}
      >
        <Typography variant="subtitle2">Add/Create</Typography>
        <KeyboardArrowDownIcon className={arrowClassNames} />
      </Button>
      <Popper
        open={open}
        anchorEl={() => document.getElementById('add-create-button')}
        transition
        disablePortal
        placement="bottom-end"
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={toggleMenu}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.paper}>
                <NavigateButton
                  icon={<AddBoxIcon />}
                  text={'Add Project'}
                  onClick={navigateToCreateProject}
                />
                <Divider />
                <NavigateButton
                  icon={<HowToVoteIcon />}
                  text={'Create Poll'}
                  onClick={navigateToCreatePoll}
                />
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  )
}

export default compose(
  withModals,
  withStyles(styles),
  withRouter
)(AddCreateButton)
