import React from 'react'
import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  talkbubble: {
    width: 273,
    height: 125,
    padding: '15px 25px 15px 25px',
    background: theme.colors['blue-info'],
    position: 'relative',
    borderRadius: '5px',
    '@media (max-width: 1024px)': {
      right: 0,
      left: 0
    }
  },
  triangle: {
    position: 'absolute',
    left: -15,
    top: 0,
    width: 0,
    height: 0,
    borderTop: `30px solid ${theme.colors['blue-info']}`,
    borderLeft: '30px solid transparent',
    borderRight: '30px solid transparent',
    '@media (max-width: 1024px)': {
      left: '45%',
      right: 0,
      top: -15,
      borderTop: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderBottom: `20px solid ${theme.colors['blue-info']}`
    }
  },
  container: {
    position: 'absolute',
    right: -290,
    top: 20,
    '@media (max-width: 1024px)': {
      display: 'flex',
      left: 0,
      right: 0,
      top: 100,
      justifyContent: 'center'
    }
  }
}))

const useRowStyle = makeStyles(theme => ({
  container: {
    margin: '0 auto'
  },
  content: {
    color: theme.palette.primary.contrastText
  }
}))

const RuleRow = ({ label }) => {
  const classes = useRowStyle()

  return (
    <Grid alignItems="center" className={classes.container} item container xs={12} spacing={1}>
      <Grid item>
        <CheckIcon fontSize="small" className={classes.content} />
      </Grid>
      <Grid item>
        <Typography className={classes.content} variant="subtitle2">{label}</Typography>
      </Grid>
    </Grid>
  )
}

const rules = [
  'Use at least eight characters',
  'Use at least one uppercase',
  'Use at least one number digit'
]

const PasswordInfoBubble = ({ isFocused }) => {
  const classes = useStyles()

  return (
    <Grow in={isFocused} timeout={{ enter: 500 }}>
      <div className={classes.container}>
        <div className={classes.talkbubble}>
          <div className={classes.triangle} />
          {rules.map((rule, index) => (
            <RuleRow
              key={`password_rule_${index}`}
              className={classes.ruleRow}
              label={rule}
            />
          ))}
        </div>
      </div>
    </Grow>
  )
}

export default PasswordInfoBubble
