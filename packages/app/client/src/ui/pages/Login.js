import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { MobileReverseGrid } from '../templates'
import { SimpleFormWithHeader } from '../organisms'
import { TextWithLinks } from '../molecules'
import { CheckboxField } from '../atoms'
import { password, email } from '../../utils/formFields'
import { LoginIllustrationSVG } from '../assets'
import { loginUser } from '../../api/users'

const keepMLoggedCheckbox = {
  name: 'keepMLoggedCheckbox',
  id:'keepMLoggedCheckbox',
  initialValue: false,
  contentPlacemet: 'flex-start',
  label: 'Keep me logged in',
  htmlFor: 'keepMLoggedCheckbox',
  type: 'checkbox'
}

const formProps = {
  title: "Welcome to The Atrium",
  titleProps: {
    alignMobile: "left",
    align: "left"
  },
  validate: () => {},
  submitLabel: 'Log In',
  fields: [email, { ...password, showCriteria: false }],
  buttonLayout: { xs: 4, sm: 6 }
}

const Login = () => {
  const sendLoginRequest = async ({ email, password }) => {
    try {
      await loginUser({ email, password })
    } catch(e) {
      // TODO: add handler
      console.log(e)
    }
  }

  return (
    <Container component="main" style={{ maxWidth: 1024 }}>
      <MobileReverseGrid
        secondColumnProps={{
          justify: "center",
          alignItems: "center"
        }}
      >
        <>
          <SimpleFormWithHeader
            onSubmit={sendLoginRequest}
            {...formProps}
            renderBellowForm={
              <Grid container item xs={12} direction="row" alignItems="center" justify="space-between">
                <CheckboxField
                  {...keepMLoggedCheckbox}
                  onChange={() => {}}
                />
                <TextWithLinks
                  links={[
                    {
                      to: '/forgot-password',
                      str: 'Forgot password',
                      variant: 'body2'
                    }
                  ]}
                >
                  Forgot password
                </TextWithLinks>
              </Grid>
            }
          />
          
          <TextWithLinks
            links={[
              {
                to: '/register',
                str: 'Join us',
                variant: 'body2'
              }
            ]}
            mt={36}
          >
            Don’t have an account? Join us
          </TextWithLinks>
        </>
        <LoginIllustrationSVG />
      </MobileReverseGrid>
    </Container>
  )
}

export default Login
