import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { MobileReverseGrid } from '../templates'
import { SimpleFormWithHeader } from '../organisms'
import { TextWithLinks } from '../molecules'
import { CheckboxField } from '../atoms'
import { password, email } from '../../utils/formFields'
import { LoginIllustrationSVG } from '../assets'
import { loginUser } from '../../api/users'
import { SET_CURRENT_USER } from '../../actions/types'
import { useToast } from '../hooks'

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
  const { showToast } = useToast()
  const [keepLogged, setKeepLogged] = useState(false)
  const dispatch = useDispatch()

  const sendLoginRequest = async ({ email, password }) => {
    try {
      const response = await loginUser({ email, password })
      showToast({ message: 'User authenticated', severity: 'success' })
      dispatch({ type: SET_CURRENT_USER, payload: response })

      history.push('/')
    } catch(error) {
      showToast({ message: error.message, severity: 'danger' }) 
    }
  }

  // TODO: remove inline styles and use shared style
  return (
    <Container component="main" style={{ maxWidth: 1024, marginTop: 100 }}>
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
    </Container>
  )
}

export default Login
