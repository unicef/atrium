import React from 'react'
import { LearnQuizSVG, LearnGuideSVG, LearnRemixSVG, LearnIntroductionSVG } from '../../../assets'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    '& svg': {
      width: '100%',
      height: '100%',
      maxHeight: 430,
      maxWidth: 430,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        maxHeight: 280,
        maxWidth: 280,
      },
      [theme.breakpoints.only('md')]: {
        justifyContent: 'center',
        maxHeight: 300,
        maxWidth: 300,
      }
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginBottom: 30
    }
  }
}))

const SectionIcon = ({ iconName }) => {
  const classes = useStyles()

  let Icon;
  
  switch(iconName) {
    case 'quiz':
      Icon = LearnQuizSVG
      break
    case 'guide':
      Icon = LearnGuideSVG
      break
    case 'remix':
      Icon = LearnRemixSVG
      break
    case 'introduction':
      Icon = LearnIntroductionSVG
      break
    default:
      break
  }

  return (
    <Grid className={classes.container} item container xs={12}>
      {Icon && <Icon />}
    </Grid>
  )
}

export default SectionIcon
