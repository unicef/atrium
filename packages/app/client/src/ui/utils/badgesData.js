import { BADGE_ENUM } from '../../unin-constants'
import { BadgeOne, BadgeTwo, BadgeThree } from '../assets'

const badgesData = {
  [BADGE_ENUM.MEMBER]: {
    Image: BadgeOne,
    title: 'MEMBER',
    description: '10 Likes  Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ...',
    unlockText:
      'You have already met the requirements to unlock this badge, it should unlock soon.',
  },
  [BADGE_ENUM.CONTRIBUTOR]: {
    Image: BadgeTwo,
    title: 'CONTRIBUTOR',
    description: '10 Likes  Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ...',
    unlockText: 'To unlock this badge, you need to create a project.'
  },
  [BADGE_ENUM.INFLUENCER]: {
    Image: BadgeThree,
    title: 'INFLUENCER',
    description: '10 Likes  Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ...',
    unlockText: 'To unlock this badge, you need to create a forum.'
  }
}

export default badgesData
