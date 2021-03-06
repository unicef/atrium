import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Panel from './components/Panel'
import Container from '@material-ui/core/Container'
import ProjectOverview from './components/ProjectOverview'
import AdditionalInformation from './components/AdditionalInformation'
import Story from './components/Story'
import Team from './components/Team'
import Updates from './components/Updates'
import { connect, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllProjects as getAllProjectsActions } from '../../../actions/projectActions'
import CreateProject from '../create/CreateProject'
import { compose } from 'recompose'
import { getCurrentProject } from '../../../selectors'
import { useProjectsAsyncActions } from '../../../ui/hooks'

const useDefaultStyles = makeStyles(() => ({
  main: {
    height: '100%',
    minHeight: '100vh',
    width: '80%',
    marginTop: '51px',
    margin: 'auto'
  },
  tab: {
    textTransform: 'none'
  },
  tabs: {
    borderBottom: '1.2px solid'
  }
}))

function ProjectOverviewPage(props) {
  const classes = useDefaultStyles()

  const [tabIndex, setTabIndex] = useState(0)

  const handleChange = (e, newVal) => {
    setTabIndex(newVal)
  }

  const projectData = useSelector(getCurrentProject)
  const { getProjectById } = useProjectsAsyncActions()
  const params = useParams()

  useEffect(() => {
    if (projectData === undefined) {
      getProjectById(params.id)
    }
  }, [])

  return (
    <Container className={classes.main}>
      <div className={classes.tabs}>
        <Tabs
          value={tabIndex}
          variant="fullWidth"
          onChange={handleChange}
          centered
        >
          <Tab className={classes.tab} label="Project overview" />
          <Tab className={classes.tab} label="Required information" />
          <Tab className={classes.tab} label="Additional information" />
          <Tab className={classes.tab} label="Story" />
          <Tab className={classes.tab} label="Team" />
          <Tab className={classes.tab} label="Updates" />
        </Tabs>
      </div>

      <Panel value={tabIndex} index={0}>
        {projectData && (
          <ProjectOverview handleChange={handleChange} {...projectData} />
        )}
      </Panel>
      <Panel value={tabIndex} index={1}>
        {projectData && <CreateProject goToOverview={() => setTabIndex(0)} {...projectData} editting={true} />}
      </Panel>
      <Panel value={tabIndex} index={2}>
        {projectData && <AdditionalInformation {...projectData} />}
      </Panel>
      <Panel value={tabIndex} index={3}>
        {projectData && <Story {...projectData} />}
      </Panel>
      <Panel value={tabIndex} index={4}>
        {projectData && <Team {...projectData} />}
      </Panel>
      <Panel value={tabIndex} index={5}>
        {projectData && <Updates {...projectData} />}
      </Panel>
    </Container>
  )
}
export default compose(
  connect(null, { getAllProjects: getAllProjectsActions })
)(ProjectOverviewPage)
