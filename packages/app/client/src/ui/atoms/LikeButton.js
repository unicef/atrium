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
      fontFamily: ['Red Hat Display', 'sans-serif'].join(','),
      fontSize: 12,
      fontWeight: theme.typography.fontWeightMedium,
      letterSpacing: 0.8,
      textDecoration: 'none',
      padding: 5,
      fill: handleMainColor(),
      color: handleMainColor()
    }
  }
}))

const LikeButton = ({ id, liked, onLike, numberOfLikes, ...props }) => {
  const [isLiked, setLike] = React.useState(liked)
  const [count, setCount] = React.useState(numberOfLikes)
  const classes = useStyles({ isLiked, ...props })

  return (
    <TextButton
      size="small"
      className={classes.root}
      onClick={() => {
        setLike(liked => !liked)
        onLike(id)
        setCount(count => isLiked ? count - 1 : count + 1)
      }}
      startIcon={<LikeIcon />}
      variant="text"
      textContent={`${count} likes`}
      {...props}
    />
  )
}

export default LikeButton
