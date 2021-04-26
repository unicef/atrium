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
    margin: '3% 0'
  }
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
          style={{ fontSize: '18px', marginTop: '2%' }}
          variant="body1"
        >
          {variant === 'posts'
            ? 'Comment on your posts'
            : variant === 'projects'
            ? 'Comment on your projects'
            : 'Replies on your comments'}
        </Typography>
        <Switch checked={firstValue} onChange={firstHandler} />
      </div>
      <div className={classes.item}>
        <Typography
          style={{ fontSize: '18px', marginTop: '2%' }}
          variant="body1"
        >
          {variant === 'posts'
            ? 'Updates on your posts'
            : variant === 'projects'
            ? 'Updates on your projects'
            : 'Updates on your comments'}
        </Typography>
        <Switch checked={secondValue} onChange={secondHandler} />
      </div>
    </>
  )
}

export default NotificationsActivity
