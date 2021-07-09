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
import {BadgesList} from "../../../../molecules";

const infoMap = [
  {
    title: 'Occupation',
    dataKey: 'role'
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

const BIO_MAX_LENGTH = 169

const Information = () => {
  const userInfo = useSelector(getProfileUserInfo)
  const badges = useSelector(getProfileBadges)
  const [showBiography, setShowMore] = React.useState(false)
  const trimmedBiography = useTrimmedText({
    text: userInfo.bio,
    max: BIO_MAX_LENGTH
  })
  const biographyText = showBiography ? userInfo.bio : trimmedBiography
  const isShowMoreButtonVisible =
    Boolean(biographyText) && biographyText.length > BIO_MAX_LENGTH

  return (
    <Grid container item xs={12}>
      <TabContentTitle>Information</TabContentTitle>

      <Grid spacing={2} container>
        {infoMap.map(item => (
          <InfoCell
            title={item.title}
            key={item.dataKey}
            content={userInfo[item.dataKey]}
          />
        ))}
      </Grid>

      <Box mt="40px">
        <InfoCell xs={12} title={'Biography'} content={biographyText} />
        {isShowMoreButtonVisible && (
          <ShowMoreButton
            isShowingMore={showBiography}
            handleClick={() => setShowMore(prevVal => !prevVal)}
          />
        )}
      </Box>

      <Grid container item xs={12}>
        <Grid item xs={12}>
          <InfoCellTitle>badges</InfoCellTitle>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item container spacing={5}>
            <BadgesList start={0} end={userInfo.badges} earned profilePage />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Information
