import React from 'react'
import { Formik } from 'formik'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

import { LimitedHeader } from '../../layout/Header'
import { createPoll } from '../../../actions/pollActions'
import { CancelIcon, TextField, Button } from '../../../ui'

const QUESTION_MAX_LENGTH = 140

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  cancelButton: {
    position: 'absolute',
    right: 0,
    marginRight: 13,
    '&:focus': {
      outline: '-webkit-focus-ring-color auto 1px'
    }
  },
  cancelIcon: {
    display: 'flex',
    height: 35,
    width: 35
  },
  main: {
    maxWidth: 564,
    marginTop: 35
  },
  box: {
    width: '100%',
    '& [class~="MuiFormControl-root"]:not(:last-child)': {
      marginBottom: 20
    }
  },
  titleOfForm: {
    marginBottom: 10,
    fontFamily: 'Roboto',
    color: theme.colors['dark-forest-green']
  },
  subLabel: {
    marginBottom: 20,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: 2,
    letterSpacing: 1
  }
})

class CreatePoll extends React.Component {

  render() {
    const { classes } = this.props

    return (
      <Container className={classes.main} component="main">
        <LimitedHeader
          title="Create a poll"
          action={
            <ButtonBase
              aria-label="Cancel poll creation"
              className={classes.cancelButton}
              onClick={this.onCancel}
            >
              <CancelIcon className={classes.cancelIcon} />
            </ButtonBase>
          }
        />

        <Formik
          initialValues={{
            question: '',
            option_1: '',
            option_2: '',
            option_3: ''
          }}
          validate={values => {
            const errors = {}
            if (!values.question) {
              errors.question = 'Please provide a topic to vote on'
            }
            if (!values.option_1) {
              errors.option_1 = 'Please provide choices to vote with'
            }
            return errors
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const choices = Object.entries(values) // get array from from objects
              .map(item => (item[0] !== 'question' ? item : undefined)) // get only options
              .reduce((acc, obj, i) => {
                const isValidOrNotFirst = !!obj || i !== 0
                const isValidValue = obj && !!obj[1]

                if (isValidOrNotFirst && isValidValue) {
                  acc.push({ value: obj[1] })
                }
                return acc
              }, [])

            const formData = { choices, topic: values.question }

            try {
              await this.props.onCreatePoll(formData)
              this.onCancel()
            } catch (error) {
              console.warn('error :', error)
              setSubmitting(false)
              setErrors({ common: error.data.error })
            }
          }}
          render={({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            ...props
          }) => (
              <form onSubmit={props.handleSubmit}>
                <Grid container spacing={5}>
                  <Grid container item>
                    <Typography variant="h5" className={classes.titleOfForm}>
                      Please type your question and the options in the below
                      fields.
                  </Typography>
                  </Grid>
                  <Fade in={!!errors.common}>
                    <Grid container item>
                      <Typography
                        component="span"
                        color="error"
                        variant="subtitle1"
                      >
                        {errors.common}
                      </Typography>
                    </Grid>
                  </Fade>
                  <Grid container item>
                    <Box className={classes.box}>
                      <Typography
                        component="p"
                        variant="body1"
                        className={classes.subLabel}
                      >
                        Define your question (max. {QUESTION_MAX_LENGTH}{' '}
                        characters)
                    </Typography>
                      <TextField
                        id="question"
                        placeholder="Please type your question here"
                        value={values.question}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.question && touched.question)}
                        fullWidth
                        multiline
                        inputProps={{
                          maxLength: QUESTION_MAX_LENGTH
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid container item>
                    <Box className={classes.box}>
                      <Typography
                        component="p"
                        variant="body1"
                        className={classes.subLabel}
                      >
                        Define your options (max. 3 options)
                    </Typography>
                      <TextField
                        id="option_1"
                        placeholder="Enter option 1"
                        value={values.option_1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.option_1 && touched.option_1)}
                        fullWidth
                      />
                      <TextField
                        id="option_2"
                        placeholder="Enter option 2"
                        value={values.option_2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.option_2 && touched.option_2)}
                        fullWidth
                      />
                      <TextField
                        id="option_3"
                        placeholder="Enter option 3"
                        value={values.option_3}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(errors.option_3 && touched.option_3)}
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid container item style={{ marginTop: 10 }}>
                    <Button
                      type="submit"
                      color="primary"
                      fullWidth
                      disabled={props.isSubmitting}
                    >
                      Create poll
                  </Button>
                  </Grid>
                </Grid>
              </form>
            )}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  onCreatePoll: data => dispatch(createPoll(data))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CreatePoll)
