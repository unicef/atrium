import React from 'react'
import PropTypes from 'prop-types'
import { List, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import get from 'lodash/get'

import { CommonModal, ModalContainer, ActivityRow, Button } from '../'
import { getUserInformation } from '../../api/users'
import UserInfoHeader from '../../components/user-info-header/UserInfoHeader'
import { TitleDivider } from '../atoms'
import { BADGE_ENUM } from '../../unin-constants'
import ProfileBadge from '../../components/profile-badge/ProfileBadge'

const styles = theme => ({
  signOutButton: {
    alignSelf: 'start',
    fontWeight: 500,
    fontFamily: 'Red Hat Display, sans-serif',
    fontSize: 11,
    color: theme.colors['dark-forest-green'],
    letterSpacing: 0.85
  }
})

const UserInfoModal = ({ userId, authUserId, onClose, classes, ...props }) => {
  const [userInfo, setUserInfo] = React.useState()
  const [error, setError] = React.useState(null)

  let membershipBadge = false
  let contributorBadge = false
  let influencerBadge = false
  if (userInfo) {
    ;[membershipBadge, contributorBadge, influencerBadge] = userInfo.userBadges
  }

  React.useEffect(() => {
    getUserInformation(userId)
      .then(({ data }) => {
        setUserInfo(data)
      })
      .catch(err => {
        setError('Error loading user information')
      })
  }, [setUserInfo, userId])

  return (
    <CommonModal open={true} onClose={onClose}>
      <ModalContainer>
        {error || userInfo ? (
          <>
            <UserInfoHeader
              user={userInfo.user}
              actionButton={
                <Button
                  className={classes.signOutButton}
                  href={`mailto:${userInfo.user.email}`}
                  variant="outlined"
                >
                  Contact User
                </Button>
              }
            />
            <TitleDivider title={'USER ACTIVITY'} />
            {membershipBadge ? (
              <ProfileBadge badgeType={BADGE_ENUM.MEMBER} unlocked />
            ) : null}
            {contributorBadge ? (
              <ProfileBadge badgeType={BADGE_ENUM.CONTRIBUTOR} unlocked />
            ) : null}
            {influencerBadge ? (
              <ProfileBadge badgeType={BADGE_ENUM.INFLUENCER} unlocked />
            ) : null}
            <TitleDivider title={'USER ACTIVITY'} />
            <List disablePadding={true}>
              {
                userInfo.activityList &&
                userInfo.activityList.map((activity, idx) =>
                  (
                    <ActivityRow
                      key={`activity-${idx}`}
                      sameUser={authUserId === userId}
                      activity={activity}
                    />
                  )
                )
              }
            </List>
          </>
        ) : null}
      </ModalContainer>
    </CommonModal>
  )
}

UserInfoModal.propTypes = {
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object
}

const mapStateToProps = state => ({
  authUserId: get(state, 'auth.user.id', null)
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(UserInfoModal)
