import React from 'react'
import { TextButton } from './TextButton'
import { ReactComponent as CommentIcon } from '../../icons/comment.svg'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: props => ({
    fontFamily: ['Red Hat Display', 'sans-serif'].join(','),
    fontSize: 12,
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: 0.8,
    textDecoration: 'none',
    padding: 5,
    fill: props.disabled ? theme.palette.text.disabled : theme.palette.text.primary
  })
}))

const CommentsButton = ({ onClick, numberOfComments, ...props }) => {
  const classes = useStyles(props)

  return (
    <TextButton
      variant="text"
      className={classes.root}
      startIcon={<CommentIcon />}
      size="mini"
      onClick={onClick}
      textContent={numberOfComments}
      {...props}
    />
  )
}

export default CommentsButton
