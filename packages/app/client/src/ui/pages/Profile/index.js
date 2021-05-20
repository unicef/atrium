import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { useParams } from 'react-router'
import { getProfileId } from '../../../selectors'
import { useProfileAsyncActions, useTabsOnUrl } from '../../hooks'
import { MainContainer } from '../../templates'
import { ProfileHeader } from './components'
import { Tabs } from '../../molecules'
import { useSelector } from 'react-redux'
import { ProfileBadges, ProfileProjects, AboutProfile } from './panels'
import { TabPanel } from '../../atoms'

const profileTabs = [
  { label: "About ", hash: 'about' },
  { label: "Posts", hash: 'posts' },
  { label: "Projects", hash: 'projects' },
  { label: "Badges", hash:'badges' },
  { label: "Bounties", hash:'bounties' }
]

const Profile = () => {
  const profileId = useSelector(getProfileId)
  const { getUserInfoById } = useProfileAsyncActions()
  const params = useParams()

  React.useEffect(() => {
    getUserInfoById(params.id)
  }, [])


  const tabs = profileId ? profileTabs : []

  const { handleChange, tabIndex } = useTabsOnUrl({ tabs, baseRoute: `/profile/${params.id}` })

  const onChangeTabIndex = (newIndex) => {
    const nextTab = tabs[newIndex]

    if (nextTab !== undefined) {
      const isPaginatedTab = nextTab.hash === 'projects'

      if (isPaginatedTab) {
        handleChange(newIndex, { search: 'page=1' })
      } else {
        handleChange(newIndex)
      }
    }
  }

  return (
    <MainContainer size="regular" margin="50px auto">
      {profileId &&  <ProfileHeader />}

      {profileId &&
        <Grid container justify="center" item xs={12}>
          <Box position="sticky" width="100%" bgcolor="white" top={50} zIndex={99}>
            <Tabs variant="fullWidth" handleChange={onChangeTabIndex} tabs={tabs} currentIndex={tabIndex} tabsAreaWidth="80%" />
          </Box>

          <TabPanel index={0} value={tabIndex}>
            <AboutProfile />
          </TabPanel>

          <TabPanel index={2} value={tabIndex}>
            <ProfileProjects />
          </TabPanel>

          <TabPanel index={3} value={tabIndex}>
            <ProfileBadges />
          </TabPanel>
          
        </Grid>
      }
    </MainContainer>
  )
}

export default Profile
