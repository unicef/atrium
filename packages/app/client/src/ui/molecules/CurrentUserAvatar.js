import React from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../selectors'
import UserInfos from './UserInfos'

const CurrentUserAvatar = ({ showInfos, avatarGrowth, className }) => {
  const userInfos = useSelector(getUser)

  return <UserInfos showInfos={showInfos} avatarGrowth={avatarGrowth} {...userInfos} className={className} />
}

CurrentUserAvatar.defaultProps = {
  avatarGrowth: 8
}

export default CurrentUserAvatar
