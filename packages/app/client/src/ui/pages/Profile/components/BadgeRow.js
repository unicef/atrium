import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles} from '@material-ui/core/styles'
import { BADGE_ENUM } from '../../../../unin-constants'
import { BadgeOne, BadgeTwo, BadgeThree } from '../../../assets'
import { Divider } from '../../../atoms'

const badgeInformation = {
  [BADGE_ENUM.MEMBER]: {
    BadgeImage: BadgeOne,
    badgeTitle: 'MEMBER',
    badgeDescription: '10 Likes  Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ...',
    unlockText:
      'You have already met the requirements to unlock this badge, it should unlock soon.',
    unlockButton: 'Close',
    path: 'profile'
  },
  [BADGE_ENUM.CONTRIBUTOR]: {
    BadgeImage: BadgeTwo,
    badgeTitle: 'CONTRIBUTOR',
    badgeDescription: '10 Likes  Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ...',
    unlockText: 'To unlock this badge, you need to create a project.',
    unlockButton: 'Create a project',
    path: 'view-projects'
  },
  [BADGE_ENUM.INFLUENCER]: {
    BadgeImage: BadgeThree,
    badgeTitle: 'INFLUENCER',
    badgeDescription: '10 Likes  Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ...',
    unlockText: 'To unlock this badge, you need to create a forum.',
    unlockButton: 'Participate in a forum',
    path: 'engage'
  }
}

const useStyles = makeStyles(() => ({
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '15px',
    lineHeight: '18px',
  },
  description: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '170%',
  },
  divider: {
    height: 1,
    width: '100%'
  }
}))

const BadgeRow = ({ index, showContent }) => {
  const classes = useStyles()
  const dataKey = index + 1
  const { BadgeImage, badgeDescription, badgeTitle } = badgeInformation[dataKey]

  return (
    <Grid container item spacing={4}>
      <Grid item xs="auto">
        <BadgeImage />
      </Grid>

      {showContent &&
        <>
          <Grid item xs="auto">
            <Typography className={classes.title}>{badgeTitle}</Typography>
            <Typography className={classes.description}>{badgeDescription}</Typography>
          </Grid>

          <Divider className={classes.divider} />
        </>
      }
    </Grid>
  )
}

BadgeRow.defaultProps = {
  showContent: true
}

export default BadgeRow
