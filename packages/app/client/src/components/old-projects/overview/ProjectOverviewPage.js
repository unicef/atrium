import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Panel from './components/Panel'
import Container from '@material-ui/core/Container'
import ProjectOverview from './components/ProjectOverview'
import AdditionalInformation from './components/AdditionalInformation'
import RequiredInformation from './components/RequiredInformation'
import Story from './components/Story'
import Teams from './components/Teams'
import Updates from './components/Updates'

const useDefaultStyles = makeStyles(() => ({
  main: {
    height: '100%',
    minHeight: '100vh',
    width: '100%',
    marginTop: '51px'
  },
  tab: {
    textTransform: 'none'
  },
  tabs: {
    borderBottom: '1.2px solid'
  },

  publishButton: {},
  saveButton: {}
}))

function ProjectOverviewPage(props) {
  const classes = useDefaultStyles()

  const handleRedirectToSave = () => {
    //
  }

  const handleRedirectToPublish = () => {
    //
  }

  const [value, setValue] = useState(0)

  const handleChange = (e, newVal) => {
    setValue(newVal)
  }

  return (
    <Container className={classes.main}>
      <div className={classes.tabs}>
        <Tabs value={value} variant="fullWidth" onChange={handleChange}>
          <Tab className={classes.tab} label="Project overview" />
          <Tab className={classes.tab} label="Required information" />
          <Tab className={classes.tab} label="Additional information" />
          <Tab className={classes.tab} label="Story" />
          <Tab className={classes.tab} label="Teams" />
          <Tab className={classes.tab} label="Updates" />
        </Tabs>
      </div>

      <Panel value={value} index={0}>
        <ProjectOverview />
      </Panel>
      <Panel value={value} index={1}>
        <RequiredInformation />
      </Panel>
      <Panel value={value} index={2}>
        <AdditionalInformation />
      </Panel>
      <Panel value={value} index={3}>
        <Story />
      </Panel>
      <Panel value={value} index={4}>
        <Teams />
      </Panel>
      <Panel value={value} index={5}>
        <Updates />
      </Panel>
    </Container>
  )
}

export default ProjectOverviewPage
