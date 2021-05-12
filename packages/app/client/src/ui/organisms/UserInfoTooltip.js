import React from 'react'
import { UserInfos } from '../molecules'
import Zoom from '@material-ui/core/Zoom'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.colors.white,
  },
  tooltip: {
    backgroundColor: theme.colors.white,
    boxShadow: '1px 2px 10px rgba(40, 35, 34, 0.27)',
    maxWidth: 'none',
    padding: 12
  },
}))

const UserInfoTooltip = ({ children, user, ...textProps }) => {
  const classes = useStyles()
  const { name, email, src, role } = user

  return (
    <Tooltip
      classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
      arrow
      TransitionComponent={Zoom}
      title={<UserInfos src={src} name={name} role={role} email={email} />}
      interactive
    >
      {children}
    </Tooltip>
  )

}

export default UserInfoTooltip
