import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { TreeMenu } from '../../../molecules'
import { AboutTextSections, FilesSection } from '../components'
import { ABOUT_PROJECT_SECTIONS, PROJECT_ADITIONAL_INFO } from '../../../../unin-constants'
import { smoothVerticalScrolling } from '../../../utils'

const AdditionalInfoPiece = ({ title, data }) => (
  <Grid item xs={12}>
    <Typography variant="body2">
      {title}
    </Typography>
    <Typography>
      {data}
    </Typography>
  </Grid>
)

const AboutProject = ({ projectData }) => {
  const handleSelect = (_, nodeIds) => {
    const target = document.getElementById(nodeIds)

    smoothVerticalScrolling({ element: target, time: 300, otherFixedElementsHeight: 50 })
  }

  const handleAditionalInfoParties = (parties, item, index) => {
    let data = projectData[item.id]
    
    if (item.id === 'numberOfNodes') {
      data = `${data} Nodes`
    }

    if (item.id === 'launchDateMonth') {
      data = `${data}, ${projectData.launchDateYear}`
    }
    const piece =  <AdditionalInfoPiece key={item.id} title={item.name} data={data} />

    if (index > 3) {
      return { ...parties, secondPart: [...parties.secondPart, piece] }
    }

    return { ...parties, firstPart: [...parties.firstPart, piece] }
  }

  const additionalInfoPieces = PROJECT_ADITIONAL_INFO.reduce(handleAditionalInfoParties, { firstPart: [], secondPart: [] })

  // TODO: IMPROVE THE TREE VIEW MENU TO LOOK LIKE A SELECTED ITEM WHEN SCROLL TO SPECIFIC TOPICS POSITION
  return (
    <Box pt={4}>
      <Grid container item xs={12}>
        <Grid item xs={2}>
          <Box position="sticky" width="100%" bgcolor="white" top={120}>
            <TreeMenu onNodeSelect={handleSelect} menuItems={ABOUT_PROJECT_SECTIONS} allExpanded />
          </Box>
        </Grid>
        <Grid style={{ marginTop: -10}} item xs={10}>
          {projectData &&
            <Grid item xs={12}>
              <Box px={6}>
                <AboutTextSections {...ABOUT_PROJECT_SECTIONS[0]} projectData={projectData} />

                <Box mb={2}>
                  <Typography id="projectAdditionalInfo" variant="h3">
                    Aditional Info
                  </Typography>
                </Box>

                <Grid container>
                  <Grid spacing={2} container item xs={6}>    
                    {additionalInfoPieces.firstPart}
                  </Grid>

                  <Grid spacing={2} container item xs={6}>
                    {additionalInfoPieces.secondPart}
                  </Grid>
                </Grid>

                <Box mt={3}>
                  <FilesSection {...projectData} />
                </Box>
              </Box>
            </Grid>
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default AboutProject
