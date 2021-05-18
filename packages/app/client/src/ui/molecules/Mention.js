import React from 'react'
import UserInfoTooltip from './UserInfoTooltip'
import { mergeClassNames } from '../utils'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  mention: {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main
    }
  }
}))

const Mention = ({ mention, children, className }) => {
  const classes = useStyles()

  return (
    <UserInfoTooltip user={mention}>
      <span className={mergeClassNames(className, classes.mention)}>
        {children}
      </span>
    </UserInfoTooltip>
  )
}

export default Mention
