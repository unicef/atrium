import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { sendEmailToSignUp } from '../../../api/users'
import { ERRORS } from '../../../actions/authActions'
import { email, name, surname, password, termsCheckbox } from '../../../utils/formFields'
import { validateEmail } from '../../../utils/validators'
import { CreateAccountForm, CreateAccountFooter} from './components'
import { useContainerStyle } from '../../hooks'
import validateCreationForm from './validateCreationForm'

const createAccountFields = [name, surname, password, termsCheckbox]
const createAccountFieldsLabel = createAccountFields.reduce((namesObj, field) => ({ ...namesObj, [field.name]: field.label }), {})

const formProps = [
  {
    title: "Create Account",
    subtitle: "Please provide your UN mail id to get started with creating an account on The Atrium",
    titleAlignMobile: "left",
    validate: ({ email }) => validateEmail(email),
    submitLabel: 'Continue',
    fields: [email],
    buttonLayout: { xs: 6, sm: 12 }
  },
  {
    title: "Create Account",
    subtitle: "",
    titleAlignMobile: "left",
    validate: (values) => validateCreationForm({ values, labels: createAccountFieldsLabel }),
    submitLabel: 'Create account',
    fields: createAccountFields,
    initialErrors: { termsCheckbox: 'You must accept the Terms and the Privacy Policy' }
  }
]

function CreateAccount () {
  const [step, changeStep] = useState(1)
  const [verifiedEmail, saveEmail] = useState(undefined)
  const containerStyle = useContainerStyle({ size: 'small' })

  const verifyEmail = async (values, formActions) => {
    try {
      await sendEmailToSignUp(values)
      saveEmail(values.email)
      changeStep(1)
    } catch (error) {
      formActions.setErrors({ email: error.response?.data.err || ERRORS.GENERIC })
    } finally {
      formActions.setSubmitting(false)
    }
  }

  const createAccount = async (values, formActions) => {
    console.log(values)
  }

  return (
    <Container component="main" className={containerStyle}>
      <CreateAccountForm
        createAccount={createAccount}
        onSubmit={step === 0 ? verifyEmail : createAccount}
        formProps={formProps[step]}
      />
      {step === 0 && <CreateAccountFooter />}
    </Container>
  )
}

export default CreateAccount