import React from 'react'
import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { TextWithLinks } from '../../molecules'
import { Divider } from '../../atoms'
import { ReactComponent as ButterflySVG } from '../../assets/butterfly.svg'
import { ReactComponent as Chat } from '../../assets/chat.svg'
import { SimpleFormWithHeader } from '../../organisms'
import { email, name, surname, password } from '../../../utils/formFields'
import { useTheme } from '@material-ui/core/styles'
import proptypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

const formProps = [
  {
    title: "Create Account",
    subtitle: "Please provide your UN mail id to get started with creating an account on The Atrium",
    titleAlignMobile: "left",
    validate: () => {},
    submitLabel: 'Continue',
    fields: [email],
    buttonLayout: { xs: 6, sm: 12 }
  },
  {
    title: "Create Account",
    subtitle: "",
    titleAlignMobile: "left",
    validate: () => {},
    submitLabel: 'Create account',
    fields: [name, surname, password]
  }
]

const CreateAccountTemplate = ({ onSubmit, step }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))
  
  if (!formProps[step]) {
    return null
  }

  let subtitle = formProps[step] && formProps[step].subtitle

  if (matches) {
    subtitle = ""
  }

  return (
    <Grid item xs={12}>
      <SimpleFormWithHeader
        onSubmit={onSubmit}
        {...formProps[step]}
        subtitle={subtitle}
      />

      {step === 0 && 
        <Grid container justify="center">
          <Grid
            item
            container
            justify={matches ? "flex-start" :  "center"}
            alignItems="center"
          >
            <TextWithLinks
              links={[
                {
                  to: '/forgot-password',
                  str: 'Forgot password',
                  variant: 'body2'
                }
              ]}
            >
              You already have an account? Forgot password
            </TextWithLinks>
          </Grid>

          <Grid item xs={12}>
            <Divider mt={31} mb={27} />
          </Grid>
          
          <Grid item xs={12} sm={6} style={{ marginBottom: 50 }}>
            <Typography align="center">
              If you work outside of the UN, you can still
            </Typography>
          </Grid>

          <Grid
            item
            container
            xs={12}
            justify="center"
          >
            <Grid item container justify="center" alignItems="center" xs={5} >
              <Grid item container justify="center" alignItems="center" xs={12}>
                <Chat />
              </Grid>

              <Grid item xs={9}>
                <Typography align="center">
                  Find out more about Atrium
                </Typography>
              </Grid>

              <Link
                component={RouterLink}
                variant="body2"
                to={'/'}
              >
                See more
              </Link>
            </Grid>

            <Divider orientation="vertical" flexItem />

            <Grid item container xs={5} justify="center" alignItems="center">
              <Grid item container justify="center" alignItems="center" xs={12}>
                <ButterflySVG />
              </Grid>
              <Grid item xs={9}>
                <Typography align="center">
                  Learn about blockchain
                </Typography>
              </Grid>
              <Link
                component={RouterLink}
                variant="body2"
                to={'/learn'}
              >
                See more
              </Link>
            </Grid>
          </Grid>
        </Grid>
      }
    </Grid>
  )
}

CreateAccountTemplate.propTypes = {
  onSubmit: proptypes.func,
  step: proptypes.number
}

CreateAccountTemplate.defaultProps = {
  onSubmit: () => {},
  step: 1
}

export default CreateAccountTemplate