import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Switch } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  line: {
    borderBottom: '1px solid #E7E7E7',
    width: '100%'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '3% 0',
    alignItems: 'center'
  },
  root: {
    width: 54,
    height: 24,
    padding: 0
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(30px)',
      color: 'white',
      '& + $track': {
        backgroundColor: '#15B54A',
        opacity: 1,
        border: 'none'
      }
    },
    '&$focusVisible $thumb': {
      color: '#15B54A',
      border: '6px solid #fff'
    }
  },
  thumb: {
    width: 22,
    height: 22
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid #BCBEBE`,
    backgroundColor: '#BCBEBE',
    opacity: 1
  },
  checked: {},
  focusVisible: {}
}))

function NotificationsActivity({
  variant,
  firstValue,
  firstHandler,
  secondValue,
  secondHandler
}) {
  const classes = useStyles()

  return (
    <>
      <div className={classes.line} />
      <Typography style={{ fontSize: '18px', margin: '3% 0' }} variant="h3">
        {variant === 'posts'
          ? 'Forum activity'
          : variant === 'projects'
          ? 'Projects activity'
          : 'Comments'}
      </Typography>
      <div className={classes.item}>
        <Typography
          style={{ fontSize: '18px'}}
          variant="body1"
        >
          {variant === 'posts'
            ? 'Comment on your posts'
            : variant === 'projects'
            ? 'Comment on your projects'
            : 'Replies on your comments'}
        </Typography>
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked
          }}
          checked={firstValue}
          onChange={() => firstHandler(!firstValue)}
        />
      </div>
      <div className={classes.item}>
        <Typography
          style={{ fontSize: '18px' }}
          variant="body1"
        >
          {variant === 'posts'
            ? 'Updates on your posts'
            : variant === 'projects'
            ? 'Updates on your projects'
            : 'Updates on your comments'}
        </Typography>
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked
          }}
          checked={secondValue}
          onChange={() => secondHandler(!secondValue)}
        />
      </div>
    </>
  )
}

export default NotificationsActivity
