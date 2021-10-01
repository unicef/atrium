import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import SECTIONS_NAME, { SECTIONS_ID } from './sectionsName'

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '130%',
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.black,
    marginBottom: '23px'
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '130%',
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.black,
    marginBottom: '22px'
  },
  text: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '130%',
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.black
  },
  marginInBetween: {
    marginBottom: '51px'
  }
}))

const ExtraInformationHeader = () => {
  const classes = useStyles()
  
  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>  
        <Typography id={SECTIONS_ID[SECTIONS_NAME.STORY]} className={classes.mainTitle} color="secondary" variant="h3">
          {SECTIONS_NAME.EXTRA_INFORMATION}
        </Typography>
        <Typography
          color="secondary"
          className={`${classes.text} ${classes.marginInBetween}`}
          variant="body1"
        >
          Information that you will provide in this section will help other users to get an in-depth understanding of your project
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography className={classes.title} color="secondary" variant="h3">
          Story
        </Typography>
        <Typography
          color="secondary"
          className={classes.text}
          variant="body1"
        >
         Tell people why they shloud be excited about your project Get specific but be clear and be brief.
        </Typography>
      </Grid>
    </Grid>
  )
}

export default ExtraInformationHeader
