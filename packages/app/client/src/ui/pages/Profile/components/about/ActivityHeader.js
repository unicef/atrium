import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'underline',
    fontWeight: 'bold',
    marginLeft: 3,
    fontSize: '15px'
  },
  normal: {
    marginLeft: 3,
    fontSize: '15px'
  }
}))

const ActivityHeader = ({ data, path }) => {
  const classes = useStyles()

  if (!data) return null

  if (Boolean(path)) {
    return (
      <Link to={path}>
        <Typography className={classes.link} component="span">{data}</Typography>
      </Link>
    )
  }

  return <Typography className={classes.normal} component="span">{data}</Typography>
  
}

export default ActivityHeader
