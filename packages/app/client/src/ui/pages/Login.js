import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { MobileReverseGrid, MainContainer } from '../templates'
import { SimpleFormWithHeader } from '../organisms'
import { TextWithLinks } from '../molecules'
import { CheckboxField } from '../atoms'
import { password, email } from '../../utils/formFields'
import { LoginIllustrationSVG } from '../assets'
import { useAuthAsyncActions } from '../hooks'

const keepMLoggedCheckbox = {
  name: 'keepMLoggedCheckbox',
  id:'keepMLoggedCheckbox',
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

const Login = ({ history }) => {
  const [keepLogged, setKeepLogged] = useState(false)
  const { login } = useAuthAsyncActions()

  return (
    <MainContainer mt={100} size="regular">
      <MobileReverseGrid
        secondColumnProps={{
          justify: "center",
          alignItems: "center"
        }}
      >
        <>
          <SimpleFormWithHeader
            onSubmit={login}
            {...formProps}
            renderBellowForm={
              <Grid container item xs={12} direction="row" alignItems="center" justify="space-between">
                <CheckboxField
                  {...keepMLoggedCheckbox}
                  value={keepLogged}
                  onChange={() => setKeepLogged(keep => !keep)}
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
    </MainContainer>
  )
}

export default Login
