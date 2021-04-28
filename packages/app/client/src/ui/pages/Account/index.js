import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { useContainerStyle } from '../../hooks'
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

const Account = () => {
  const containerStyle = useContainerStyle({ size: 'full' })
  const [tabIndex, setTabIndex] = useState(0)
  const user = useSelector(state => state.auth.user)

  const handleChange = (e, newVal) => {
    setTabIndex(newVal)
  }
  return (
    <Container className={containerStyle}>
      <Grid container xs={12}>
        <VerticalTabs handleChange={handleChange} tabIndex={tabIndex} />
        <InfoSection>
          {tabIndex === 0 ? <Dashboard {...user} handleChange={handleChange} /> : null}
          {tabIndex === 1 ? <Profile {...user} /> : null}
          {tabIndex === 2 ? <Settings {...user} /> : null}
          {tabIndex === 3 ? <MyPost {...user} /> : null}
          {tabIndex === 4 ? <MyProjects {...user} /> : null}
          {tabIndex === 5 ? <MyComments {...user} /> : null}
          {tabIndex === 6 ? <Badges {...user} /> : null}
          {tabIndex === 7 ? <Bookmarks {...user} /> : null}
          {tabIndex === 8 ? <Notifications {...user} /> : null}
        </InfoSection>
      </Grid>
    </Container>
  )
}

export default Account