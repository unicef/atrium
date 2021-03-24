import React from 'react'
import Container from '@material-ui/core/Container'
import { MobileReverseGrid } from '../templates'
import { SimpleFormWithHeader } from '../organisms'
import { TextWithLinks } from '../molecules'
import { password, email } from '../../utils/formFields'
import { EmailSentSVG } from '../assets'

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
  fields: [email, password, keepMLoggedCheckbox],
  buttonLayout: { xs: 4, sm: 6 }
}

const Login = () => {
  return (
    <Container component="main" style={{ maxWidth: 650 }}>
      <MobileReverseGrid
        secondColumnProps={{
          justify: "center",
          alignItems: "center"
        }}
      >
        <>
          <SimpleFormWithHeader
            onSubmit={() => {}}
            {...formProps}
          />
          <TextWithLinks
            links={[
              {
                to: '/forgot-password',
                str: 'Forgot password',
                variant: 'body2'
              }
            ]}
            mt={36}
          >
            Forgot password
          </TextWithLinks>
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
        <EmailSentSVG />
      </MobileReverseGrid>
    </Container>
  )
}

export default Login
