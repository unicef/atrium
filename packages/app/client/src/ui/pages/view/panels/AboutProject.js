import React from 'react'
import Grid from '@material-ui/core/Grid'
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined'
import { TreeMenu } from '../../../molecules'
import { Box, Typography } from '@material-ui/core'
import { AboutSection } from '../components'
import { ABOUT_PROJECT_SECTIONS } from '../../../../unin-constants'
import { makeStyles } from '@material-ui/core/styles'
import { smoothVerticalScrolling } from '../../../utils'
import { TextButton } from '../../../atoms'
import Dividers from '../../../atoms/Divider'
import Card from '../components/FilesCard'

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
})

const AboutProject = ({ projectData }) => {
  const classes = useStyles()

  const handleSelect = (_, nodeIds) => {
    const target = document.getElementById(nodeIds)

    smoothVerticalScrolling({ element: target, time: 300 })
  }

  return (
    <Grid style={{ marginTop: 35}} container item xs={12}>
      <Grid item xs={2}>
        <TreeMenu onNodeSelect={handleSelect} menuItems={ABOUT_PROJECT_SECTIONS} allExpanded />
      </Grid>
      <Grid style={{ marginTop: -10}} item xs={10}>
        {projectData &&
        
          <Grid  item xs={12}>
            <Box px={6}>
              <AboutSection {...ABOUT_PROJECT_SECTIONS[0]} projectData={projectData} />

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

              <Box mt={2}>
                <Grid container item xs={10}>
                  <Box mb={2}>
                    <Typography id="projectFiles" variant="h3">
                      Files
                    </Typography>
                  </Box>

                  <Grid container item xs={12}>
                    <Grid container justify="space-between" item xs={12}>
                      <Typography variant="h5">
                        Videos
                      </Typography>

                      <TextButton
                        textContent="Download all"
                        startIcon={<SystemUpdateAltOutlinedIcon />}
                        color="primary"
                      />
                    </Grid>

                    <Grid container spacing={3} item xs={12}>
                      <Grid item xs={6} lg={4}>
                        <Card mediaType="video" src="https://i.stack.imgur.com/y9DpT.jpg" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Dividers />
                </Grid>
              </Box>

            </Box>
          </Grid>
        }
      </Grid>
    </Grid>
  )
}

export default AboutProject
