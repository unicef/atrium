import React from 'react'
import MuiAvatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { mergeClassNames } from '../utils'

const SIZING_FACTOR = 5

const useStyles = makeStyles(() => ({
  sizing: props => ({
    height: SIZING_FACTOR * props.growthTimes,
    width: SIZING_FACTOR * props.growthTimes
  })
}))

const Avatar = ({ growthTimes, size, className, name, src, ...props }) => {
  const classes = useStyles({ growthTimes })
  const imageSource = src !== undefined ? { src } : {}
  
  const getUserInitials = () => {
    const splitedName = typeof name === 'string' && name.split(' ')

    if (Array.isArray(splitedName) && splitedName.length >= 2) {
      return `${splitedName[0].substr(0, 1).toUpperCase()}${splitedName[1].substr(0, 1).toUpperCase()}`
    }
    
    return null
  }
  
  return (
    <MuiAvatar {...imageSource} className={mergeClassNames(classes.sizing, className)} {...props}>
      {getUserInitials()}
    </MuiAvatar>
  )
}

export default Avatar
