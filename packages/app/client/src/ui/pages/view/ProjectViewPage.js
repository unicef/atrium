import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { getAllProjects as getAllProjectsActions } from '../../../actions/projectActions'
import { compose } from 'recompose'
import ProjectHeader from "./components/ProjectHeader";
import { useContainerStyle } from '../../hooks'
import { Tabs } from '../../molecules'
import { AboutProject } from './panels'

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
  useEffect(() => {
    props.getAllProjects()
  }, [props.getAllProjects])

  const [tabIndex, setTabIndex] = useState(0)
  const handleChange = (e, newVal) => {
    setTabIndex(newVal)
  }

  const params = useParams()
  const projectData = useSelector(state =>
      state.projects.allProjects.filter(el => el._id === params.id)[0]
  )

  return (
    <main style={{ margin: '50px auto', paddingLeft: 20, paddingRight: 20 }} className={containerStyle}>
      <Grid item container xs={12} className={classes.header}>
        {projectData && <ProjectHeader {...projectData} />}
      </Grid>
      <Grid container justify="center" item xs={12}>
        <Tabs handleChange={() => {}} tabs={tabs} />

        <AboutProject projectData={projectData} />

        
      </Grid>
    </main>
  )
}

export default compose(
  connect(null, { getAllProjects: getAllProjectsActions })
)(ProjectViewPage)
