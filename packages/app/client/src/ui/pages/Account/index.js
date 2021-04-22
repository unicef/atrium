import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useContainerStyle } from '../../hooks'
import {
  InfoSection,
  VerticalTabs,
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
import Grid from '@material-ui/core/Grid'
import Panel from '../../../components/projects/overview/components/Panel'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({}))

const Account = () => {
  const classes = useStyles()
  const containerStyle = useContainerStyle({ size: 'full' })
  const [tabIndex, setTabIndex] = useState(0)

  const handleChange = (e, newVal) => {
    setTabIndex(newVal)
  }
  return (
    <Container className={containerStyle}>
      <Grid container xs={12}>
        <VerticalTabs handleChange={handleChange} tabIndex={tabIndex} />
        <InfoSection>
          {tabIndex === 0 ? <Dashboard /> : null}
          {tabIndex === 1 ? <Profile /> : null}
          {tabIndex === 2 ? <Settings /> : null}
          {tabIndex === 3 ? <MyPost /> : null}
          {tabIndex === 4 ? <MyProjects /> : null}
          {tabIndex === 5 ? <MyComments /> : null}
          {tabIndex === 6 ? <Badges /> : null}
          {tabIndex === 7 ? <Bookmarks /> : null}
          {tabIndex === 8 ? <Notifications /> : null}
        </InfoSection>
      </Grid>
    </Container>
  )
}

export default Account
