import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import List from '@material-ui/core/List'
import { Typography } from '@material-ui/core'
import { BADGE_ENUM, MAX_UPLOAD_SIZE } from '../../unin-constants'
import { ActivityRow, TitleDivider } from '..'
import { setError } from '../../actions/errorActions'
import { getUserActivity } from '../../actions/authActions'
import UserInfoHeader from '../../components/user-info-header/UserInfoHeader'
import ModalEditUser from '../../components/modal-edit-user/ModalEditUser'
import { uploadAvatar } from '../../api/users'
import ProfileBadge from '../../components/profile-badge/ProfileBadge'
import StandardVerticleTemplate from '../templates/StandardVerticalTemplate'

function ProfilePage({ getUserActivity, setError, auth }) {
  const [isEditingUserDetails, setIsEditingUserDetails] = React.useState(false)

  React.useEffect(() => {
    getUserActivity()
  }, [getUserActivity])

  /**
   * Handle onChange from the avatar input to update user's avatar
   *
   * @param {ChangeEvent<Input>} e
   */
  const onChangeAvatarClick = async e => {
    const nextFile = e.target.files[0]

    if (nextFile) {
      if (nextFile.size > MAX_UPLOAD_SIZE) {
        setError('File exceeds maximum size of 5MB, please use a smaller image')
        return
      }
      const formData = new FormData()

      formData.append('avatar', nextFile)
      try {
        await uploadAvatar(formData)
      } catch (err) {
        setError('Avatar upload failed, please try again!')
      }
    }
  }

  return (
    <StandardVerticleTemplate>
      <UserInfoHeader
        user={auth.user}
        onChangeAvatarClick={onChangeAvatarClick}
        iconButton={
          <IconButton onClick={() => setIsEditingUserDetails(true)}>
            <EditOutlinedIcon />
          </IconButton>
        }
      />
      <TitleDivider title={'YOUR BADGES'} />
      <List disablePadding={true}>
        <Typography component="p" variant="body1">
          Users are awarded badges for their contribution to the platform. The
          badge will be registered on a private blockchain, creating a digital,
          unchangeable record that will last as long as the blockchain does
        </Typography>
        <ProfileBadge
          badgeType={BADGE_ENUM.MEMBER}
          unlocked={auth.user.badges[BADGE_ENUM.MEMBER]}
        />
        <ProfileBadge
          badgeType={BADGE_ENUM.CONTRIBUTOR}
          unlocked={auth.user.badges[BADGE_ENUM.CONTRIBUTOR]}
        />
        <ProfileBadge
          badgeType={BADGE_ENUM.INFLUENCER}
          unlocked={auth.user.badges[BADGE_ENUM.INFLUENCER]}
        />
      </List>
      <TitleDivider title={'YOUR ACTIVITIES'} />
      <List disablePadding={true}>
        {auth.activityList &&
          auth.activityList.map((activity, idx) =>
            (
              <ActivityRow key={`activity-${idx}`} sameUser={true} activity={activity} />
            )
          )}
      </List>
      <ModalEditUser
        open={isEditingUserDetails}
        onClose={() => setIsEditingUserDetails(false)}
      />
    </StandardVerticleTemplate>
  )
}

ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
  getUserActivity: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getUserActivity,
    setError
  })
)(ProfilePage)
