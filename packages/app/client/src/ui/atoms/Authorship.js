import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  author: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '19.6px',
    marginRight: 5
  },
  prefix: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '18.2px',
  }
}))

const Authorship = ({ author, prefix }) => {
  const classes = useStyles()

  return (
    <>
      {prefix && 
        <Typography component="span" className={classes.prefix}>
          Uploaded by
        </Typography>
      }
      <Typography component="span" className={classes.author}>
        {author}
      </Typography>
    </>
  )
}

export default Authorship