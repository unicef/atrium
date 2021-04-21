import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useAboutStyles = makeStyles(() => ({
  subItemTitle: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '24px',
  },
  subItemContent: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '180%',
  }
}))

const AboutSubItem = ({ label, data, id, titleClassName, contentClassName }) => (
  <>
    <Typography className={titleClassName} id={id} variant="h5">
      {label}
    </Typography>

    <Box my={2}>
      <Typography className={contentClassName} variant="body1" component="p">
        {data}
      </Typography>
    </Box>
  </>
)

export const AboutSection = ({ label, subItems, id, projectData }) => {
  const classes = useAboutStyles()

  return (
    <>
      <Box id={id} mb={2}>
        <Typography variant="h3">
          {label}
        </Typography>
      </Box>
      {subItems.map((item) => (
        <AboutSubItem
          titleClassName={classes.subItemTitle}
          contentClassName={classes.subItemContent}
          id={item.id}
          label={item.label}
          data={projectData[item.dataKey]}
          key={item.id}
        />
      ))}
    </>
  )
}

export default AboutSection
