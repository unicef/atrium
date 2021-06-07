import React from 'react'
import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
import ChatBubbleShape from'./ChatBubbleShape'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      left: 0,
      right: 0,
      top: 0,
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
        <Typography className={classes.content} variant="caption">{label}</Typography>
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
        <ChatBubbleShape height={125} top={20} left={30}>
            {rules.map((rule, index) => (
              <RuleRow
                key={`password_rule_${index}`}
                className={classes.ruleRow}
                label={rule}
              />
            ))}
        </ChatBubbleShape>
      </div>
    </Grow>
  )
}

export default PasswordInfoBubble
