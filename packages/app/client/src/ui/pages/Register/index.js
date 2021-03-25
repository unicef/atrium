import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { sendEmailToSignUp, registerUser } from '../../../api/users'
import { ERRORS } from '../../../actions/authActions'
import { email, name, surname, password, termsCheckbox } from '../../../utils/formFields'
import { validateEmail } from '../../../utils/validators'
import { CreateAccountFooter, EmailSent } from './components'
import { useContainerStyle, useToast } from '../../hooks'
import validateCreationForm from './validateCreationForm'
import { useIsMobileViewPort } from '../../hooks'
import { SimpleFormWithHeader } from '../../organisms'

const formProps = [
  {
    title: "Create Account",
    subtitle: "Please provide your UN mail id to get started with creating an account on The Atrium",
    titleProps: {
      alignMobile: "left"
    },
    validate: ({ email }) => validateEmail(email),
    submitLabel: 'Continue',
    fields: [{...email, label: 'Your Email'}],
    buttonLayout: { xs: 6, sm: 12 }
  },
  {
    title: "Create Account",
    subtitle: "",
    titleProps: {
      alignMobile: "left"
    },
    validate: validateCreationForm,
    submitLabel: 'Create account',
    fields: [name, surname, password, termsCheckbox],
    initialErrors: { termsCheckbox: 'You must accept the Terms and the Privacy Policy' },
    buttonLayout: { xs: 6, sm: 12 }
  }
]

function Register () {
  const [step, changeStep] = useState(0)
  const [verifiedEmail, saveEmail] = useState(undefined)
  const containerStyle = useContainerStyle({ size: 'small' })
  const isMobileViewPort = useIsMobileViewPort()
  const { showToast } = useToast()

  const verifyEmail = async (values) => {
    try {
      await sendEmailToSignUp(values)
      saveEmail(values.email)
      changeStep(1)
    } catch (error) {
      // TODO: Improve messages to be shorter
      showToast({ message: error.response?.data.err || ERRORS.GENERIC, severity: 'danger' }) 
    }
  }

  const createAccount = async ({ name, surname }) => {
    try {
      await registerUser({ name, surname, email: verifiedEmail })
      changeStep(2)
    } catch(e) {
      console.log(e)
    }
  }

  const showCreateAccount = step <= 1

  return (
    <Container component="main" className={containerStyle}>
      {showCreateAccount ? 
        <>
          <SimpleFormWithHeader
            onSubmit={step === 0 ? verifyEmail : createAccount}
            {...formProps[step]}
            subtitle={isMobileViewPort ? "" : formProps[step].subtitle}
          />
          {step === 0 && <CreateAccountFooter />}
        </> :
        <EmailSent email={verifiedEmail} />
      }
    </Container>
  )
}

export default Register