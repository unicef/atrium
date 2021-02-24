import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { registerUser } from '../../../actions/authActions'
import { Button, CheckboxField } from '../../../ui'
import { LimitedHeader } from '../../layout/Header'

const styles = theme => ({
  titleOfHeader: {
    fontSize: 16,
    color: theme.colors['black-two'],
    letterSpacing: 1.8,
    textTransform: 'uppercase'
  },
  main: {
    maxWidth: 475,
    marginTop: 50
  },
  title: {
    fontSize: 21,
    fontFamily: 'Roboto',
    color: theme.colors['dark-forest-green'],
    marginBottom: 45
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    flex: 1
  }
})

const interestList = [
  {
    label: 'Learn about blockchain',
    id: 'learn_blockchain'
  },
  {
    label: 'View/upload blockchain projects',
    id: 'use_blockchain_projects'
  },
  {
    label:
      'Participate in ongoing discussions about blockchain and UN projects using blockchain',
    id: 'participation'
  },
  {
    label: 'I am not sure right now',
    id: 'not_determined'
  }
]

const RegisterPage = ({ classes, auth, navigate, ...props }) => {
  const disableSubmitByProps = (errors, values) => {
    const findVals = object => Object.keys(object).filter(Boolean).length
    const hasError = !!findVals(errors)
    return hasError
  }

  return (
    <Formik
      initialValues={{
        selectedOption: ''
      }}
      validateOnMount={true}
      validate={values => {
        const errors = {}

        if (!values.selectedOption) {
          errors.hasNotSelectedOption = 'required'
        }

        return errors
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false)
        switch (values.selectedOption) {
          case 'use_blockchain_projects':
            navigate('/view-projects')
            break
          case 'participation':
            navigate('/engage')
            break
          case 'not_determined':
          case 'learn_blockchain':
          default:
            navigate('/learn')
            break
        }
      }}
      render={({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting
      }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <LimitedHeader
            title="The Atrium"
            titleProps={{
              component: 'h1',
              variant: 'h6',
              className: classes.titleOfHeader
            }}
          />

          <Container component="main" className={classes.main}>
            <Typography component="h1" className={classes.title}>
              {`Hi ${auth.user.name}! We want to customize your experience on the platform.
                How would you like to use The Atrium?`}
            </Typography>
            <Grid container spacing={2}>
              {interestList.map((obj, k) => (
                <Grid item xs={12} key={k}>
                  <CheckboxField
                    label={obj.label}
                    id={`selectedOption_${obj.id}`}
                    name={'selectedOption'}
                    value={obj.id}
                    checked={values.selectedOption === obj.id}
                    onChange={e => handleChange('selectedOption')(obj.id)}
                    inputProps={{
                      onBlur: handleBlur,
                      touched:
                        touched[obj.id] === undefined
                          ? 'false'
                          : String(touched[obj.id])
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '1em' }}>
              <Button
                type="submit"
                color="primary"
                size="small"
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                Next
              </Button>
            </Grid>
          </Container>
        </form>
      )}
    />
  )
}

RegisterPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  withRouter,
  connect(mapStateToProps, { registerUser }),
  withStyles(styles)
)(RegisterPage)
