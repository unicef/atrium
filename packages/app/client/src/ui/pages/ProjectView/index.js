import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { getAllProjects as getAllProjectsActions } from '../../../actions/projectActions'
import { compose } from 'recompose'
import ProjectHeader from "./components/ProjectHeader";
import { useContainerStyle, useProjectsAsyncActions } from '../../hooks'
import { Tabs } from '../../molecules'
import { AboutProject } from './panels'
import { getCurrentProject } from '../../../selectors'

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

const tabs = [
  { label: "About the Project", hash: 'guideSection', public: true },
  { label: "Comments", hash:'quizSection', public: true },
  { label: "Updates", hash: 'directLearning', public: true },
  { label: "Team", hash: 'smartContracts', public: false },
]

function ProjectViewPage(props) {
  const classes = useStyles()
  const containerStyle = useContainerStyle({ size: 'regular' })
  const projectData = useSelector(getCurrentProject)
  const { getProjectById } = useProjectsAsyncActions()
  const params = useParams()

  useEffect(() => {
    if (projectData === undefined) {
      getProjectById(params.id)
    }
  }, [])

  const [tabIndex, setTabIndex] = useState(0)
  const handleChange = (e, newVal) => {
    setTabIndex(newVal)
  }

  return (
    <main style={{ margin: '50px auto', paddingLeft: 20, paddingRight: 20 }} className={containerStyle}>
      <Grid item container xs={12} className={classes.header}>
        {projectData && <ProjectHeader projectData={projectData} {...projectData} />}
      </Grid>
      {projectData &&
      <Grid container justify="center" item xs={12}>
        <Box position="sticky" width="100%" bgcolor="white" top={50} zIndex={99}>
          <Tabs handleChange={() => {}} tabs={tabs} />
        </Box>

        <AboutProject projectData={projectData} />
      </Grid>}
    </main>
  )
}

export default compose(
  connect(null, { getAllProjects: getAllProjectsActions })
)(ProjectViewPage)
