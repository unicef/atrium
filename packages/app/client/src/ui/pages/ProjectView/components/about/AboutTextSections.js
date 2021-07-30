import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useAboutStyles = makeStyles(() => ({
  subItemTitle: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '24px',
  },
  subItemContent: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '180%',
  }
}))

const AboutSubItem = ({ label, data, id }) => {
  const classes = useAboutStyles()

  return (
    <Box pt="40px" width="100%">
      <Typography className={classes.subItemTitle} id={id} variant="h5">
        {label}
      </Typography>

      <Box my={2}>
        <Typography className={classes.subItemContent} variant="body1" component="p">
          {data}
        </Typography>
      </Box>
    </Box>
  )
}

export const AboutSection = ({ subItems, projectData }) => (
  subItems.map((item) => (
    <AboutSubItem
      id={item.id}
      label={item.label}
      data={projectData[item.dataKey]}
      key={item.id}
    />
  ))
)

export default AboutSection
