import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { IosSwitch } from '../../../molecules'

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
  header: {
    fontSize: '18px',
    margin: '3% 0'
  },
  title: {
    fontSize: '18px'
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
      <Typography className={classes.header} variant="h3">
        {variant === 'posts'
          ? 'Forum activity'
          : variant === 'projects'
          ? 'Projects activity'
          : 'Comments'}
      </Typography>
      <div className={classes.item}>
        <Typography className={classes.title} variant="body1">
          {variant === 'posts'
            ? 'Comment on your posts'
            : variant === 'projects'
            ? 'Comment on your projects'
            : 'Replies on your comments'}
        </Typography>
        <IosSwitch
          checked={firstValue}
          onChange={() => firstHandler(!firstValue)}
        />
      </div>
      <div className={classes.item}>
        <Typography className={classes.title} variant="body1">
          {variant === 'posts'
            ? 'Updates on your posts'
            : variant === 'projects'
            ? 'Updates on your projects'
            : 'Updates on your comments'}
        </Typography>
        <IosSwitch
          checked={secondValue}
          onChange={() => secondHandler(!secondValue)}
        />
      </div>
    </>
  )
}

export default NotificationsActivity
