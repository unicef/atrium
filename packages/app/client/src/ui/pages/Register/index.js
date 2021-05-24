import React, { useState } from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { refreshToken, verifyEmail } from '../../../actions/authActions'
import { registerUser, sendEmailToSignUp } from '../../../api/users'
import {
  getEmailHash,
  getEmailInvtCode
} from '../../../components/auth/Registration/libs/get-email-hash'
import PollPage from '../../../components/auth/Registration/PollPage'
import {
  email,
  name,
  password,
  surname,
  termsCheckbox
} from '../../../utils/formFields'
import { validateEmail } from '../../../utils/validators'
import { useIsMobileViewPort, useToast } from '../../hooks'
import { SimpleFormWithHeader } from '../../organisms'
import { MainContainer } from '../../templates'
import { Loader } from '../Search/components'
import { CreateAccountFooter, EmailSent } from './components'
import validateCreationForm from './validateCreationForm'

const formProps = [
  {
    title: 'Create Account',
    subtitle:
      'Please provide your UN mail id to get started with creating an account on The Atrium',
    titleProps: {
      alignMobile: 'left'
    },
    validate: ({ email }) => validateEmail(email),
    submitLabel: 'Continue',
    fields: [{ ...email, label: 'Your Email' }],
    buttonLayout: { xs: 6, sm: 12 }
  },
  {
    title: 'Create Account',
    subtitle: '',
    titleProps: {
      alignMobile: 'left'
    },
    validate: validateCreationForm,
    submitLabel: 'Create account',
    fields: [name, surname, password, termsCheckbox],
    initialErrors: {
      termsCheckbox: 'You must accept the Terms and the Privacy Policy'
    },
    buttonLayout: { xs: 6, sm: 12 }
  }
]

function Register({ initialStep = 0, emailFromProps = undefined }) {
  const [step, changeStep] = useState(initialStep)
  const [verifiedEmail, saveEmail] = useState(emailFromProps)
  const isMobileViewPort = useIsMobileViewPort()
  const { showToast } = useToast()

  const verifyEmail = async ({ email }) => {
    try {
      await sendEmailToSignUp(email)
      saveEmail(email)
      changeStep(1)
    } catch (error) {
      showToast({ message: error.message, severity: 'danger' })
    }
  }

  const createAccount = async ({ name, surname, password }) => {
    console.log({
      name,
      surname,
      email: verifiedEmail,
      password
    })
    try {
      await registerUser({
        name,
        surname,
        email: verifiedEmail,
        password
      })
      changeStep(2)
    } catch (error) {
      showToast({ message: error.message, severity: 'danger' })
    }
  }

  const showCreateAccount = step <= 1

  return (
    <MainContainer size="small">
      {showCreateAccount ? (
        <>
          <SimpleFormWithHeader
            onSubmit={step === 0 ? verifyEmail : createAccount}
            {...formProps[step]}
            subtitle={isMobileViewPort ? '' : formProps[step].subtitle}
          />
          {step === 0 && <CreateAccountFooter />}
        </>
      ) : (
        <EmailSent email={verifiedEmail} action={sendEmailToSignUp} />
      )}
    </MainContainer>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  verifyEmail: ({ emailHash }) => dispatch(verifyEmail({ emailHash })),
  refreshToken: () => dispatch(refreshToken())
})

const enhance = compose(connect(mapStateToProps, mapDispatchToProps))

const HandleRegistration = enhance(props => {
  const { location, verifyEmail, refreshToken, history } = props
  const [FinalComponent, setFinalComponent] = useState(<Loader />)
  // const [componentProps, setComponentProps] = useState(props)
  const { showToast } = useToast()
  const emailHash = getEmailHash(location.search)
  const invitationCode = getEmailInvtCode(location.search)

  useEffect(() => {
    const handleVerify = async () => {
      try {
        const {
          data: { registrationCompleted, email }
        } = await verifyEmail({
          emailHash: `${emailHash}/${invitationCode}`
        })
        console.log(
          '🚀 ~ file: index.js ~ line 138 ~ handleVerify ~ registrationCompleted',
          registrationCompleted
        )
        if (registrationCompleted) {
          history.push('/login')
        } else {
          setFinalComponent(
            <Register {...props} initialStep={1} emailFromProps={email} />
          )
        }
      } catch (error) {
        showToast({ message: 'Failed to verify email.', severity: 'danger' })
        setFinalComponent(<Register {...props} />)
      }
    }
    if (emailHash) {
      handleVerify()
    } else {
      setFinalComponent(<Register {...props} />)
    }
  }, [])
  return FinalComponent
})

export default HandleRegistration
