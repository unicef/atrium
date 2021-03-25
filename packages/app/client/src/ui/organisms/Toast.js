import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { useToast } from '../hooks'
import { getToast } from '../../selectors'

const SlideTransition = (props) => <Slide {...props} direction="down" />

const SEVERITIES = {
  danger: 'error',
  success: 'shamrock-green',
  info: 'blue-info',
  other: 'black'
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw'
  },
  snackbar: {
    width: '100%',
    top: 0,
    [theme.breakpoints.down('xs')]: {
      right: 0,
      left: 0
    }
  },
  content: props => ({
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: theme.colors[props.bgColor]
  }),
  closeButton: {
    marginRight: 15,
    color: theme.colors.white,
    [theme.breakpoints.down('xs')]: {
      marginRight: 5,
    }
  },
  message: {
    color: theme.colors.white
  }
}))

const Toast = () => {
  const { dismissToast } = useToast()
  const { open, message, severity } = useSelector(getToast)
  const classes = useStyles({ bgColor: SEVERITIES[severity] })

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }

    dismissToast()
  }

  return (
    <div className={classes.root}>
      <Snackbar
        TransitionComponent={SlideTransition}
        className={classes.snackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Grid
          className={classes.content}
          direction="row"
          item
          container
          xs={12}
          justify="center"
          alignItems="center"
        >
          <Grid item container xs={4} />
           
          <Grid item container justify="center" xs={4}>
            <Typography className={classes.message} variant="body2">{message}</Typography>
          </Grid>

          <Grid item container justify="flex-end" xs={4}>
            <IconButton className={classes.closeButton} size="small" onClick={handleClose} aria-label="upload picture" component="span">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Snackbar>
    </div>
  )
}

export default Toast
