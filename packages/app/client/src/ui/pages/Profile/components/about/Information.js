import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import BadgeRow from '../BadgeRow'
import TabContentTitle from '../TabContentTitle'
import InfoCell from './InfoCell'
import InfoCellTitle from './InfoCellTitle'
import { useSelector } from 'react-redux'
import { getProfileBadges, getProfileUserInfo } from '../../../../../selectors'
import { ShowMoreButton } from '../../../../atoms'
import { useTrimmedText } from '../../../../hooks'

const infoMap = [
  {
    title: 'Occupation',
    dataKey: 'role'
  },
  {
    title: 'location',
    dataKey: 'address'
  },
  {
    title: 'organization',
    dataKey: 'company'
  },
  {
    title: 'phone number',
    dataKey: 'contact'
  }
]

const biography = `
  Have you ever wondered how your entity could apply blockchain? In The Atrium, learn what projects and prototypes are being launched within the UN Have you ever wondered how.
  Have you ever wondered how your entity could apply blockchain? In The Atrium, learn what projects and prototypes are being launched within the UN Have you ever wondered how.
  Have you ever wondered how your entity could apply blockchain? In The Atrium, learn what projects and prototypes are being launched within the UN Have you ever wondered how.
`

const Information = () => {
  const userInfo = useSelector(getProfileUserInfo)
  const badges = useSelector(getProfileBadges)
  const [showBiography, setShowMore] = React.useState(false)
  const trimmedBiography = useTrimmedText({ text: biography, max: 169 })
  const biographyText = showBiography ? biography : trimmedBiography

  return (
    <Grid container item xs={12}>
      <TabContentTitle>Information</TabContentTitle>

      <Grid spacing={2} container>
        {infoMap.map(item => (
          <InfoCell title={item.title} key={item.dataKey} content={''} />
        ))}
      </Grid>

      <Box mt="40px">
        <InfoCell xs={12} title={'Biography'} content={biographyText} />
        <ShowMoreButton isShowingMore={showBiography} handleClick={() => setShowMore(prevVal => !prevVal)} />
      </Box>

      <Grid container item xs={12}>
        <Grid item xs={12}>
          <InfoCellTitle>badges</InfoCellTitle>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {badges.map((applied, index) => (
            applied && (
              <Grid item xs="auto">
                <BadgeRow id={`profile_about_badge${index}`} showContent={false} index={index} />
              </Grid>
            )
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Information
