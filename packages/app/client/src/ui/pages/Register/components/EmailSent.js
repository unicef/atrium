import React from 'react'
import Grid from '@material-ui/core/Grid'
import { EmailSentSVG } from '../../../assets/'
import { TitleAndSubtitle } from '../../../molecules'
import { Button } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'
import { useIsMobileViewPort } from '../../../hooks'

const useStyles = makeStyles(theme => ({
  email: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
}))

const EmailSent = ({ email, action }) => {
  const classes = useStyles()
  const isMobileViewPort = useIsMobileViewPort()

  return (
    <Grid item container xs={12} spacing={4}>
      <Grid item container justify="center" alignItems="center" xs={12}>
        <EmailSentSVG />
      </Grid>

      <Grid item xs={12}>
        <TitleAndSubtitle
          title="Verification link sent!"
          subtitleProps={{ mb: 0, alignMobile: 'left' }}
          titleProps={{ alignMobile: 'left' }}
          subtitle={
            <>
              An Email has been sent to your email address
              <a className={classes.email} href={`mailto:${email}`}>
                {' '}
                {email}{' '}
              </a>
              Please click on thet link to verify your email address
            </>
          }
        />
      </Grid>

      <Grid
        item
        container
        justify={isMobileViewPort ? 'flex-start' : 'center'}
        alignItems="center"
        xs={12}
      >
        <Button onClick={() => action(email)} color="primary">
          Resend Email
        </Button>
      </Grid>
    </Grid>
  )
}

export default EmailSent
