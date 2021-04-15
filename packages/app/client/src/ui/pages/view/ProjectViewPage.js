import React, { useEffect, useState } from 'react'
import { StandardVerticalTemplate } from '../../templates'
import { connect, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
//import Panel from '../overview/components/Panel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { getAllProjects as getAllProjectsActions } from '../../../actions/projectActions'
import { compose } from 'recompose'
import ProjectHeader from "./components/ProjectHeader";
import { useContainerStyle } from '../../hooks'
import { Tabs } from '../../molecules'
import TreeMenu from './components/TreeMenu'
import { Box, Typography } from '@material-ui/core'

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

        <Grid style={{ marginTop: 35}} container item xs={12}>
          <Grid item xs={2}>
            <TreeMenu />
          </Grid>
          <Grid style={{ marginTop: -10}} item xs={10}>
            {projectData &&
            
              <Grid  item xs={12}>
                <Box px={6}>
                  <Box mb={2}>
                    <Typography variant="h3">
                      About
                    </Typography>
                  </Box>

                  <Typography variant="h5">
                    Story
                  </Typography>

                  <Box my={2}>
                    <Typography variant="body1" component="p">
                      {projectData.story}
                    </Typography>
                  </Box>

                  <Typography variant="h5">
                    Challenges
                  </Typography>

                  <Box my={2}>
                    <Typography variant="body1" component="p">
                      {projectData.challenges}
                    </Typography>
                  </Box>

                  <Typography variant="h5">
                    Benefits
                  </Typography>

                  <Box my={2}>
                    <Typography variant="body1" component="p">
                      {projectData.benefits}
                    </Typography>
                  </Box>

                  <Typography variant="h5">
                    Needs
                  </Typography>

                  <Box my={2}>
                    <Typography variant="body1" component="p">
                      {projectData.needs}
                    </Typography>
                  </Box>

                  <Typography variant="h5">
                    Section
                  </Typography>

                  <Box my={2}>
                    <Typography variant="body1" component="p">
                      {projectData.section}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="h3">
                      Aditional Info
                    </Typography>
                  </Box>

                  <Grid container>
                    <Grid spacing={2} container item xs={6}>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          {"Innovation category".toUpperCase()}
                        </Typography>
                        <Typography>
                          {projectData.innovationCategory}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="body2">
                          {"Thematic area".toUpperCase()}
                        </Typography>
                        <Typography>
                          {projectData.thematicArea}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="body2">
                          {"Target launch date".toUpperCase()}
                        </Typography>
                        <Typography>
                          {projectData.launchDateMonth}, {projectData.launchDateYear}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="body2">
                          {"License".toUpperCase()}
                        </Typography>
                        <Typography>
                          {projectData.license}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid spacing={2} container item xs={6}>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                          {"Country".toUpperCase()}
                        </Typography>
                        <Typography>
                          {projectData.country}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="body2">
                          {"organization".toUpperCase()}
                        </Typography>
                        <Typography>
                          {projectData.organization}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="body2">
                          {"Number of nodes".toUpperCase()}
                        </Typography>
                        <Typography>
                          {projectData.numberOfnodes} Nodes
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                </Box>
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </main>
  )
}

export default compose(
  connect(null, { getAllProjects: getAllProjectsActions })
)(ProjectViewPage)
