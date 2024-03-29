import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import SECTIONS_NAME from './sectionsName'
import { Button } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  bottomIntro: {
    margin: '5% 0'
  },
  introButton: {
    margin: '0',
    height: '42px'
  }
}))

const RequiredInfoHeader = ({ editting }) => {
  const classes = useStyles()
  
  return (
    <Grid container item xs={12}>
      <Grid item xs="auto">  
        <Typography color="secondary" variant="h3">
          {SECTIONS_NAME.REQUIRED_INFORMATIONS}
        </Typography>
      </Grid>

      <Grid item xs={12} container justify="space-between" alignItems="center">
        <Typography
          color="secondary"
          className={classes.bottomIntro}
          variant="body1"
        >
          {editting
            ? 'Your project can now be shared with the world. Add more information to reach more people. You can edit this data at any point'
            : "Don't worry, you can change everything later"}
        </Typography>
        {editting ? (
            <Link href="#"> need help?</Link>
          ) : (
            <Button className={classes.introButton} variant="outlined">
              Need help?
            </Button>
          )}
      </Grid>
    </Grid>
  )
}

export default RequiredInfoHeader
