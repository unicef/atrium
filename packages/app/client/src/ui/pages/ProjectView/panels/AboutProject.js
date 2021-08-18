import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { AboutTextSections, FilesSection } from '../components'
import {
  ABOUT_PROJECT_SECTIONS,
  PROJECT_ADITIONAL_INFO
} from '../../../../unin-constants'
import { Button, TextField } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'
import { useProjectsAsyncActions } from '../../../hooks'

const useStyles = makeStyles(() => ({
  reportSection: {
    textAlign: 'center',
    marginTop: '5%'
  },
  reportButton: {
    backgroundColor: 'white',
    color: 'red',
    '&:hover': {
      backgroundColor: 'white'
    }
  }
}))

const AdditionalInfoPiece = ({ title, data }) => (
  <Grid item xs={12}>
    <Typography variant="body2">{title}</Typography>
    {Boolean(data) && <Typography>{data}</Typography>}
  </Grid>
)

const AboutProject = ({ projectData }) => {
  const classes = useStyles()

  const [showReport, setReport] = useState(false)
  const [reportText, setText] = useState('')
  const { reportProject } = useProjectsAsyncActions()


  const handleAditionalInfoParties = (parties, item, index) => {
    let data = projectData[item.id]

    if (item.id === 'numberOfNodes') {
      data = data && `${data} Nodes`
    }

    if (item.id === 'launchDateMonth') {
      data = data && `${data}, ${projectData.launchDateYear}`
    }
    const piece = (
      <AdditionalInfoPiece key={item.id} title={item.name} data={data} />
    )

    if (index > 3) {
      return { ...parties, secondPart: [...parties.secondPart, piece] }
    }

    return { ...parties, firstPart: [...parties.firstPart, piece] }
  }

  const additionalInfoPieces = PROJECT_ADITIONAL_INFO.reduce(
    handleAditionalInfoParties,
    { firstPart: [], secondPart: [] }
  )

  return (
    <Box pt={4}>
      <Grid container item xs={12}>

        <Grid style={{ marginTop: -10 }} item xs={12} sm={10}>
          {projectData && (
            <Grid item xs={12}>
              <Box>
                <AboutTextSections
                  {...ABOUT_PROJECT_SECTIONS[0]}
                  projectData={projectData}
                />

                <Box mb={2}>
                  <Typography id="projectAdditionalInfo" variant="h3">
                    Additional Info
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
                <Box className={classes.reportSection}>
                  {showReport ? (
                    <>
                      <Grid item xs={12}>
                        <Box display="flex" bgcolor="white">
                          <TextField
                            multiline
                            value={reportText}
                            onChange={event => {
                              setText(event.target.value)
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid container item justify="flex-end" xs={12}>
                        <Box mt={2}>
                          <Button
                            onClick={() => {
                              setReport(false)
                              setText('')
                            }}
                            variant="outlined"
                          >
                            Cancel
                          </Button>
                          <Button
                            ml={15}
                            color="primary"
                            onClick={() => {
                              reportProject({
                                id: projectData.id,
                                reported: true,
                                reportMessage: reportText
                              })
                              setReport(false)
                              setText('')
                            }}
                          >
                            Report
                          </Button>
                        </Box>
                      </Grid>
                    </>
                  ) : (
                    <Button
                      className={classes.reportButton}
                      onClick={() => setReport(true)}
                    >
                      <Typography variant="subtitle1">
                        Report an issue
                      </Typography>
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default AboutProject
