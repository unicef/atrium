import React, {useEffect} from 'react'
import {
  InfoSection,
  Dashboard,
  Settings,
  Bookmarks,
  Profile,
  MyComments,
  MyProjects,
  Badges,
  MyPost,
  Notifications
} from './components'
import VerticalTabs from '../../molecules/VerticalTabs'
import Grid from '@material-ui/core/Grid'
import { useSelector } from 'react-redux'
import { MainContainer } from '../../templates'
import { getUser } from '../../../selectors'
import { useTabsOnUrl } from '../../hooks'
import { getUserInformation } from '../../../actions/authActions'

const tabs = [
  { label: 'Dashboard', hash: 'dashboard' },
  { label: 'Profile', hash: 'profile' },
  { label: 'Security', hash: 'security' },
  { label: 'My Post', hash: 'myPost' },
  { label: 'My Projects', hash: 'myProjects' },
  { label: 'My Comments', hash: 'myComments' },
  { label: 'Badges', hash: 'badges' },
  { label: 'Bookmarks', hash: 'bookmarks' },
  { label: 'Notifications', hash: 'notifications' }
]

const Account = () => {
  const user = useSelector(getUser)
  const { handleChange, tabIndex } = useTabsOnUrl({
    tabs,
    baseRoute: '/profile'
  })

  useEffect(() => {
    const fetchUser = async () => {
      await getUserInformation()
    }
    fetchUser()
  }, [])

  const onHandleTabChange = (e, newIndex) => {
    e.preventDefault()
    handleChange(newIndex)
  }
  return (
    <MainContainer>
      <Grid container xs={12}>
        <VerticalTabs
          tabsList={tabs.map(tab => tab.label)}
          handleChange={onHandleTabChange}
          tabIndex={tabIndex}
        />
        <InfoSection>
          {tabIndex === 0 ? (
            <Dashboard {...user} handleChange={onHandleTabChange} />
          ) : null}
          {tabIndex === 1 ? <Profile {...user} /> : null}
          {tabIndex === 2 ? (
            <Settings {...user} handleChange={onHandleTabChange} />
          ) : null}
          {tabIndex === 3 ? <MyPost {...user} /> : null}
          {tabIndex === 4 ? <MyProjects {...user} /> : null}
          {tabIndex === 5 ? <MyComments {...user} /> : null}
          {tabIndex === 6 ? <Badges {...user} /> : null}
          {tabIndex === 7 ? <Bookmarks {...user} /> : null}
          {tabIndex === 8 ? <Notifications {...user} /> : null}
        </InfoSection>
      </Grid>
    </MainContainer>
  )
}

export default Account
