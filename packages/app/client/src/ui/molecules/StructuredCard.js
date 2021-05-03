import React from 'react'
import { useElapsedTime, useTrimmedText } from '../hooks'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  author: {
    fontSize: '11px',
    color: '#636767'
  },
  title: {
    marginTop: '1%',
    lineHeight: 1.8
  },
  content: {
    margin: '2% 0',
    fontSize: '13px',
    lineHeight: 1.8
  }
}))

function StructuredCard({ author, date, title = '', content = '' }) {
  const classes = useStyles()
  const trimmedContent = useTrimmedText({ text: content, max: 80 })
  const trimmedTitle = useTrimmedText({ text: title, max: 150 })
  const elapsedTime = useElapsedTime({ createdAt: date })
  return (
    <div style={{ margin: '3% 3% 3% 5%' }}>
      <Typography className={classes.author} variant="body1">
        By {author} {elapsedTime} days ago
      </Typography>
      <Typography className={classes.title} variant="subtitle1">
        {trimmedTitle}
      </Typography>
      <Typography className={classes.content} variant="body1">
        {trimmedContent}
      </Typography>
    </div>
  )
}

export default StructuredCard
