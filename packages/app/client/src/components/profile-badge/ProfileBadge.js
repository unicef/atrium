import React from 'react'
import { withStyles } from '@material-ui/styles'
import { Grid, Typography, Button } from '@material-ui/core'
import { LockOpen } from '@material-ui/icons'
import { BadgeOne, BadgeTwo, BadgeThree } from './assets'
import { BADGE_ENUM } from '../../unin-constants'
import ModalBadgeUnlock from '../modal-badge-unlock/ModalBadgeUnlock'

const styles = theme => ({
  badgeParameters: {
    position: 'relative',
    width: 100,
    height: 100,
    marginRight: 20
  },
  badgeParametersFaded: {
    opacity: '.3'
  },
  imageTrix: {
    position: 'relative'
  },
  badgeSection: {
    marginTop: 20
  },
  unlockButton: {
    display: 'flex',
    height: 22,
    position: 'absolute',
    top: '50%',
    left: 12.5,
    transform: 'translateY(-50%)',
    borderRadius: 3,
    backgroundColor: theme.colors['white'],
    padding: '0px 3px 0px 0px',
    '&:hover': {
      backgroundColor: theme.colors['white']
    }
  },
  unlockIcon: {
    color: theme.colors['black'],
    marginRight: 3,
    height: 22
  },
  unlockText: {
    fontSize: 10,
    alignSelf: 'center',
    letterSpacing: 0.94
  }
})

const badgeInformation = {
  [BADGE_ENUM.MEMBER]: {
    badgeImage: BadgeOne,
    badgeTitle: 'MEMBER',
    badgeDescription: 'Awarded to users for validating their UN mail id',
    unlockText:
      'You have already met the requirements to unlock this badge, it should unlock soon.',
    unlockButton: 'Close',
    path: 'profile'
  },
  [BADGE_ENUM.CONTRIBUTOR]: {
    badgeImage: BadgeTwo,
    badgeTitle: 'CONTRIBUTOR',
    badgeDescription: 'Awarded to users for uploading a project',
    unlockText: 'To unlock this badge, you need to create a project.',
    unlockButton: 'Create a project',
    path: 'view-projects'
  },
  [BADGE_ENUM.INFLUENCER]: {
    badgeImage: BadgeThree,
    badgeTitle: 'INFLUENCER',
    badgeDescription: 'Awarded to users for creating a forum',
    unlockText: 'To unlock this badge, you need to create a forum.',
    unlockButton: 'Participate in a forum',
    path: 'engage'
  }
}

const ProfileBadge = ({ classes, badgeType, unlocked }) => {
  const [unlockModalOpen, setUnlockModalOpen] = React.useState(false)
  const badgeDetails = badgeInformation[badgeType]

  const badgeImage = unlocked ? (
    <div>
      <img
        className={classes.badgeParameters}
        src={badgeDetails.badgeImage}
        alt={`Badge ${badgeType}`}
      />
    </div>
  ) : (
    <div className={classes.imageTrix}>
      <img
        className={`${classes.badgeParameters} ${classes.badgeParametersFaded}`}
        src={badgeDetails.badgeImage}
        alt={`Badge ${badgeType}`}
      />
      <Button
        className={classes.unlockButton}
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          setUnlockModalOpen(true)
        }}
      >
        <LockOpen className={classes.unlockIcon} />
        <Typography className={classes.unlockText}>UNLOCK</Typography>
      </Button>
    </div>
  )

  return (
    <>
      <Grid container className={classes.badgeSection} alignItems={'center'}>
        <Grid item>{badgeImage}</Grid>
        <Grid item>
          <Typography variant="subtitle2">{badgeDetails.badgeTitle}</Typography>
          <Typography variante="subtitle1">
            {badgeDetails.badgeDescription}
          </Typography>
        </Grid>
      </Grid>
      {unlockModalOpen ? (
        <ModalBadgeUnlock
          image={badgeDetails.badgeImage}
          unlockText={badgeDetails.unlockText}
          closeModal={() => setUnlockModalOpen(false)}
          unlockButton={badgeDetails.unlockButton}
          path={badgeDetails.path}
        />
      ) : null}
    </>
  )
}

export default withStyles(styles)(ProfileBadge)
