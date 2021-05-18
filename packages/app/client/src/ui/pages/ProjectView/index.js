import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ProjectHeader from "./components/ProjectHeader";
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useProjectsAsyncActions, useTabsOnUrl } from '../../hooks'
import { Tabs } from '../../molecules'
import { AboutProject, ProjectUpdates, ProjectComments, ProjectTeam } from './panels'
import { getCurrentProject } from '../../../selectors'
import { TabPanel } from '../../atoms'
import { MainContainer } from '../../templates'

const useStyles = makeStyles(() => ({
  header: {
    marginBottom: '5%'
  },
  image: {
    width: '969px',
    height: '386px'
  },
  tab: {
    textTransform: 'none'
  },
  tabs: {
    borderBottom: '1.2px solid'
  }
}))

const handleTabs = (projectData) => ([
  { label: "About the Project", hash: 'about' },
  { label: `Team (${projectData.team.length})`, hash: 'team' },
  { label: `Updates (${projectData.updates.length})`, hash: 'updates' },
  { label: `Comments (${projectData.comments.length})`, hash:'comments' }
])

const Panel = ({ index, tabIndex, children }) => {
  const slideSide = tabIndex > index ? 'right' : 'left'
  return (
    <TabPanel index={index} value={tabIndex} slideSide={slideSide}>
      {children}
    </TabPanel>
  )
}

const ProjectViewPage = () => {
  const classes = useStyles()
  const projectData = useSelector(getCurrentProject)
  const { getProjectById } = useProjectsAsyncActions()
  const params = useParams()

  React.useEffect(() => {
    if (projectData === undefined) {
      getProjectById(params.id)
    }
  }, [])

  const tabs = projectData ? handleTabs(projectData) : []

  const { handleChange, tabIndex } = useTabsOnUrl({ tabs, baseRoute: `/projects/view/${params.id}` })

  const onChangeTabIndex = (newIndex) => {
    const nextTab = tabs[newIndex]

    if (nextTab !== undefined) {
      const isComments = nextTab.hash === 'comments'

      if (isComments) {
        handleChange(newIndex, { search: 'page=1&sort=asc' })
      } else {
        handleChange(newIndex)
      }
    }
  }

  return (
    <MainContainer size="regular" margin="50px auto">
      <Grid item container xs={12} className={classes.header}>
        {projectData && <ProjectHeader projectData={projectData} {...projectData} />}
      </Grid>

      {projectData &&
        <Grid container justify="center" item xs={12}>
          <Box position="sticky" width="100%" bgcolor="white" top={50} zIndex={99}>
            <Tabs handleChange={onChangeTabIndex} tabs={tabs} currentIndex={tabIndex} />
          </Box>
          
            <Panel index={0} tabIndex={tabIndex}>
              <AboutProject projectData={projectData} />
            </Panel>

            <Panel index={1} tabIndex={tabIndex}>
              <ProjectTeam />
            </Panel>

            <Panel index={2} tabIndex={tabIndex}>
              <ProjectUpdates updates={projectData.updates} projectId={projectData.id} />
            </Panel>

            <Panel index={3} tabIndex={tabIndex}>
              <ProjectComments  />
            </Panel>
        </Grid>
      }
    </MainContainer>
  )
}

export default ProjectViewPage
