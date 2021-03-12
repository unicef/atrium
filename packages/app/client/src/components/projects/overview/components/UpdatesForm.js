import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { TextField } from '../../../../ui'
import { Button } from '../../../../ui'
import { Formik } from 'formik'
import InputLabel from '@material-ui/core/InputLabel'

const useDefaultStyles = makeStyles(theme => ({
  wrapper: {
    width: '50%',
    height: '100%',
    paddingTop: '5%'
  },
  header: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  descriptionText: {
    margin: '5% 0',
    paddingRight: '30%',
    fontSize: 18
  },
  inputLabel: {
    color: 'black',
    margin: '3% 0 1% 0'
  }
}))

const validateProjectForm = values => {
  const errors = {}

  return errors
}

function UpdatesForm(props) {
  const classes = useDefaultStyles()

  const onFormSubmit = (values, { setSubmitting }) => {
    props.handleCreateProject(values)
    setSubmitting(false)
  }

  return (
    <div className={classes.wrapper}>
      <Formik
        initialValues={{ ...props.formData }}
        enableReinitialize={true}
        validate={validateProjectForm}
        onSubmit={onFormSubmit}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          ...props
        }) => (
          <form noValidate onSubmit={props.handleSubmit}>
            <div>
              <Typography
                className={classes.header}
                component="h1"
                variant="h2"
                color="secondary"
              >
                Add Update
              </Typography>
              <Typography component="h5" className={classes.descriptionText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum
                <Link href="#"> need help?</Link>
              </Typography>
            </div>
            <div>
              <InputLabel
                className={classes.inputLabel}
                shrink
                htmlFor="updateTitle"
              >
                Title
              </InputLabel>
              <TextField
                variant="outlined"
                placeholder="Example"
                fullWidth
                className={classes.formElement}
                id="updateTitle"
              />
            </div>
            <div>
              <InputLabel
                className={classes.inputLabel}
                shrink
                htmlFor="updateText"
              >
                Text
              </InputLabel>
              <TextField
                variant="outlined"
                multiline={true}
                rows="15"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                // defaultValue={values.updateText}
                className={classes.formElement}
                id="updateText"
              />
            </div>
            <div>
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button color="secondary" variant="outlined">
                Cancel
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default UpdatesForm
