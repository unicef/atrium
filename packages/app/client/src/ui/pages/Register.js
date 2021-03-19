import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { CreateAccountTemplate } from '../templates'
import { sendEmailToSignUp } from '../../api/users'
import { ERRORS } from '../../actions/authActions'
import { makeStyles } from '@material-ui/styles'
import { email, name, surname, password } from '../../utils/formFields'
import { validateEmail } from '../../utils/validators'

const formProps = [
  {
    title: "Create Account",
    subtitle: "Please provide your UN mail id to get started with creating an account on The Atrium",
    titleAlignMobile: "left",
    validate: validateEmail,
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

const useStyles = makeStyles(theme => ({
  main: {
    maxWidth: 475,
    marginTop: 50
  }
}))

function CreateAccount () {
  const [step, changeStep] = useState(0)
  const [verifiedEmail, saveEmail] = useState(undefined)
  const classes = useStyles()

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
  
  }

  return (
    <Container component="main" className={classes.main}>
      <CreateAccountTemplate
        createAccount={createAccount}
        step={step}
        onSubmit={step === 0 ? verifyEmail : createAccount}
        formProps={formProps[step]}
      />
    </Container>
  )
}

export default CreateAccount