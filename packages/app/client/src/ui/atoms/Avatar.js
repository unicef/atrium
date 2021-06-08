import React from 'react'
import MuiAvatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { mergeClassNames } from '../utils'
import { profilePlaceholder } from '../assets'

const SIZING_FACTOR = 5

const useStyles = makeStyles(() => ({
  sizing: props => ({
    height: SIZING_FACTOR * props.growthTimes,
    width: SIZING_FACTOR * props.growthTimes
  })
}))

const Avatar = ({ growthTimes, className, name, src, ...props }) => {
  const classes = useStyles({ growthTimes })
  const imageSourceExists = src !== undefined

  if (imageSourceExists) {
    return  <MuiAvatar src={src} className={mergeClassNames(classes.sizing, className)} {...props} />
  }

  return (
    <img src={profilePlaceholder}  className={mergeClassNames(classes.sizing, className)} {...props} />
  )
}

Avatar.defaultProps = {
  growthTimes: 8
}

export default Avatar
