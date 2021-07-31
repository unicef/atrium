import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { Button } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  bottomIntro: {
    margin: '5% 0'
  },
  introButton: {
    margin: '0 0 0 5%'
  },
}))

const RequiredInfoHeader = ({ editting }) => {
  const classes = useStyles()
  
  return (
    <>
      <Typography color="secondary" variant="h3">
        Required information
      </Typography>

      <Typography
        color="secondary"
        className={classes.bottomIntro}
        variant="body1"
      >
        {editting
          ? 'Your project can now be shared with the world. Add more information to reach more people. You can edit this data at any point'
          : "Don't worry, you can change everything later"}

        {editting ? (
          <Link href="#"> need help?</Link>
        ) : (
          <Button className={classes.introButton} variant="outlined">
            Need help?
          </Button>
        )}
      </Typography>
    </>
  )
}

export default RequiredInfoHeader
