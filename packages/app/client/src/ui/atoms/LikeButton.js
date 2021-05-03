import React from 'react'
import { TextButton } from './TextButton'
import { ReactComponent as LikeIcon } from '../../icons/like.svg'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: props => {
    const handleMainColor = () => {
      if (props.isLiked) return theme.colors['shamrock-green']
      if (props.disabled && !props.onlyIcon) return theme.palette.text.disabled
      return theme.palette.text.primary
    }
    const handleBackgroundColor = () => {
      if (props.disabled && !props.onlyIcon) return theme.colors['warm-grey']
      return theme.colors['white']
    }
    const handleWidth = () => {
      if (props.onlyIcon) return '30px'
      return '80px'
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
      width: handleWidth(),
      backgroundColor: `${handleBackgroundColor()} !important`,
      minWidth: '20px',
      '& > span > span:last-child': {
        marginTop: 3
      }
    }
  }
}))

const LikeButton = ({ id, liked, onLike, numberOfLikes, onlyIcon, ...props }) => {
  const classes = useStyles({ isLiked: liked, onlyIcon, ...props })
  return (
    <TextButton
      size="small"
      className={classes.root}
      onClick={() => {
        onLike(id)
      }}
      startIcon={<LikeIcon />}
      variant="text"
      textContent={onlyIcon ? null : `${numberOfLikes} likes`}
      {...props}
    />
  )
}

export default LikeButton
