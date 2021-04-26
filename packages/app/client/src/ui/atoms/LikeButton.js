import React from 'react'
import { TextButton } from './TextButton'
import { ReactComponent as LikeIcon } from '../../icons/like.svg'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: props => {
    const handleMainColor = () => {
      if (props.disabled) return theme.palette.text.disabled
      if (props.isLiked) return theme.colors['shamrock-green']
      return theme.palette.text.primary
    }
    return {
      display: 'flex',
      alignItems: 'center',
      fontFamily: ['Red Hat Display', 'sans-serif'].join(','),
      fontSize: 12,
      fontWeight: theme.typography.fontWeightMedium,
      letterSpacing: 0.8,
      textDecoration: 'none',
      padding: 5,
      fill: handleMainColor(),
      color: handleMainColor(),
      '& > span > span:last-child': {
        marginTop: 3
      }
    }
  }
}))

const LikeButton = ({ id, liked, onLike, numberOfLikes, ...props }) => {
  const classes = useStyles({ isLiked: liked, ...props })
  return (
    <TextButton
      size="small"
      className={classes.root}
      onClick={() => {
        onLike(id)
      }}
      startIcon={<LikeIcon />}
      variant="text"
      textContent={`${numberOfLikes} likes`}
      {...props}
    />
  )
}

export default LikeButton
