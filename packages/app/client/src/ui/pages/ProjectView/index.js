import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ProjectHeader from "./components/ProjectHeader";
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useContainerStyle, useProjectsAsyncActions } from '../../hooks'
import { Tabs } from '../../molecules'
import { AboutProject, ProjectUpdates } from './panels'
import { getCurrentProject } from '../../../selectors'
import { TabPanel } from '../../atoms'

const useStyles = makeStyles(theme => ({
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
  { label: "About the Project", hash: 'guideSection', public: true },
  { label: `Comments (${projectData.comments.length})`, hash:'quizSection', public: true },
  { label: `Updates (${projectData.updates.length})`, hash: 'directLearning', public: true },
  { label: `Team (${projectData.team.length})`, hash: 'smartContracts', public: false },
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
  const containerStyle = useContainerStyle({ size: 'regular' })
  const projectData = useSelector(getCurrentProject)
  const { getProjectById } = useProjectsAsyncActions()
  const params = useParams()

  React.useEffect(() => {
    if (projectData === undefined) {
      getProjectById(params.id)
    }
  }, [])

  const [tabIndex, setTabIndex] = React.useState(2)

  const handleChange = (newVal) => {
    setTabIndex(newVal)
  }

  return (
    <main style={{ margin: '50px auto'}} className={containerStyle}>
      <Grid item container xs={12} className={classes.header}>
        {projectData && <ProjectHeader projectData={projectData} {...projectData} />}
      </Grid>

      {projectData &&
        <Grid container justify="center" item xs={12}>
          <Box position="sticky" width="100%" bgcolor="white" top={50} zIndex={99}>
            <Tabs handleChange={handleChange} tabs={handleTabs(projectData)} currentIndex={tabIndex} />
          </Box>
          
            <Panel index={0} tabIndex={tabIndex}>
              <AboutProject projectData={projectData} />
            </Panel>

            <Panel index={2} tabIndex={tabIndex}>
              <ProjectUpdates updates={projectData.updates} projectId={projectData.id} />
            </Panel>
        </Grid>
      }
    </main>
  )
}

export default ProjectViewPage
