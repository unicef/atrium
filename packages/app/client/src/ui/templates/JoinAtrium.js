import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import SectionContainer from './SectionContainer'
import Form from '../organisms/Form'
import { Title, TextField, Button, TextButton } from '../atoms'
import { makeStyles } from '@material-ui/core/styles'
import { joinFormFields } from '../utils'

const useStyles = makeStyles(theme => ({
  text: {
    color: theme.palette.primary.contrastText
  },
  line: {
    display: 'flex',
    flex: 1,
    height: 1,
    borderBottom: 'solid 1.2px rgba(255, 255, 255, 0.28)'
  },
  smallHorizontalMargin: {
    marginRight: 20,
    marginLeft: 20
  },
  marginVertical: {
    marginTop: 30,
    marginBottom: 30
  },
  description: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '180%',
    marginTop: 30,
    marginBottom: 30
  },
  submit: {
    padding: 3,
    '&:disabled': {
      backgroundColor: 'transparent'
    }
  }
}))

const SideColumn = ({ children }) => (
  <Hidden smDown>
    <Grid alignItems="center" container item sm={1} md={2}>
      {children}
    </Grid>
  </Hidden>
)

const JoinAtrium = ({
  LeftImageComponent,
  RightImageComponent,
  isAuthenticated
}) => {
  const classes = useStyles()
  const [email, setEmail] = useState(undefined)
  const [openForm, setOpenForm] = useState(false)

  const submitHandler = ({ subject, message, fullName, setSubmitting }) => {
    window.open(
      'mailto:blockchain@uninnovation.network?subject=' +
        subject +
        '&body=' +
        message +
        '%0d' +
        'Yours Sincerely,' +
        '%0d' +
        fullName
    )
    setOpenForm(false)
    setSubmitting(false)
  }

  return (
    <SectionContainer
      justify="center"
      padding="80px 0 80px 0"
      sm={12}
      lg={12}
      bgColor="blue-info"
    >
      <SideColumn>{LeftImageComponent}</SideColumn>

      <Grid
        className={classes.text}
        justify="center"
        item
        container
        xs={12}
        sm={10}
        md={8}
      >
        <Grid justify="center" item container xs={12} sm={8} md={6}>
          <Title contrast mb={30}>
            {isAuthenticated ? 'Invite to Atrium' : ' Join Atrium now'}
          </Title>

          <TextField
            borderColor="white"
            borderColorFocus="white"
            placeholder="For example—janedoe@wfp.org"
            onChange={e => setEmail(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <TextButton
                  textContent="Submit"
                  disabled={!email}
                  size="full"
                  labelColor="white"
                  className={classes.submit}
                  onClick={() => (document.location.href = `mailto:${email}`)}
                />
              </InputAdornment>
            }
          />

          <Grid
            container
            item
            xs={12}
            alignItems="center"
            className={classes.marginVertical}
          >
            <div className={classes.line} />
            <Typography
              className={classes.smallHorizontalMargin}
              variant="body2"
            >
              OR
            </Typography>
            <div className={classes.line} />
          </Grid>

          {openForm ? (
            <Form
              fields={joinFormFields}
              submit={submitHandler}
              submitLabel="Send"
              buttonProps={{ color: 'secondary', labelColor: 'blue-info', size: 'full' }}
            />
          ) : (
            <Button
              component="a"
              color="secondary"
              labelColor="blue-info"
              size="full"
              fullWidth
              onClick={() => setOpenForm(true)}
            >
              Contact us
            </Button>
          )}

          <Typography
            align="center"
            variant="body1"
            className={classes.description}
          >
            We are looking for other organizations that would be interested in
            setting up their own node, therefore, participating by increasing
            the resilience of the system. If interested, please contact
            blockchain@uninnovation.network.
          </Typography>
        </Grid>
      </Grid>

      <SideColumn>{RightImageComponent}</SideColumn>
    </SectionContainer>
  )
}

export default JoinAtrium
