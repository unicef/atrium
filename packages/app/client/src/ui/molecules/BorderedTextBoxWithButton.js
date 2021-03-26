import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Button } from '../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: props => ({
    textAlign: 'left',
    fontSize: '18px',
    lineHeight: '180%',
    border: props.hideBorder ? 'none' : 'solid 1.2px',
    borderRadius: 5,
    backgroundColor: 'white',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'transparent',
      border: 'none',
      marginBottom: 30
    }
  }),
  text: {
    fontSize: 15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
      marginBottom: 30
    },
  },
  buttonWrapper: props => ({
    position: 'absolute',
    bottom: props.hideBorder ? -30 : -20,
    left: props.hideBorder ? 0 : 34,
    [theme.breakpoints.down('sm')]: {
      left: 0,
    }
  }),
  button: {
    margin: 0,
    maxHeight: 54
  },
  textWrapper: props => ({
    padding: props.hideBorder ? '0 0 37px 0' : '30px 36px 37px 34px',

    [theme.breakpoints.down('sm')]: {
      padding: '20px 26px 30px 0px',
    }
  })
}))

const BorderedTextBoxWithButton = ({ children, buttonLabel, onClick, gridProps, hideBorder }) => {
  const classes = useStyles({ hideBorder })

  return (
    <Grid
      container
      item
      className={classes.container}
      {...gridProps}
    >
      <Grid item xs={12} className={classes.textWrapper}>
        <Typography variant="body1" className={classes.text}>
          {children}
        </Typography>
      </Grid>
      <div className={classes.buttonWrapper}>
        <Button
          color="primary"
          className={classes.button}
          onClick={onClick}
        >
          {buttonLabel}
        </Button>
      </div>
    </Grid>
  )
}

BorderedTextBoxWithButton.defaultProps = {
  onClick: () => {},
  gridProps: { xs: 12 }
}

export default BorderedTextBoxWithButton
