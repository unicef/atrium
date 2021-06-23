import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { TextField } from '../../../../ui'
import { Button } from '../../../../ui'
import { Formik } from 'formik'

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
  bottomButtons: {
    margin: '5% 0'
  },
  saveButton: {
    marginRight: '2%'
  }
}))

const validateProjectForm = values => {
  const errors = {}
  if (values.title && !values.text) {
    errors.text = 'Please also fill out text of an update'
  }
  if (values.text && !values.title) {
    errors.title = 'Please also fill out title of an update'
  }
  return errors
}

function UpdatesForm(props) {
  const classes = useDefaultStyles()

  const onFormSubmit = (values, { setSubmitting }) => {
    props.handleCreateProject(values)
    setSubmitting(false)
  }

  const cancelHandler = () => {
    window.location.reload()
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
          isSubmitting,
          isValid,
          dirty,
          ...props
        }) => (
          <form onSubmit={props.handleSubmit}>
            <div>
              <Typography
                className={classes.header}
                variant="h3"
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
              <TextField
                variant="outlined"
                placeholder="Example"
                htmlFor="title"
                label="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={!!(touched.title && errors.title)}
                errorMessage={touched.title && errors.title}
                id="title"
                name="title"
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                multiline={true}
                rows="15"
                fullWidth
                htmlFor="text"
                label="Text"
                onChange={handleChange}
                onBlur={handleBlur}
                id="text"
                name="text"
                error={!!(touched.text && errors.text)}
                errorMessage={touched.text && errors.text}
              />
            </div>
            <div className={classes.bottomButtons}>
              <Button
                className={classes.saveButton}
                disabled={!isValid || !(values.title && values.text)}
                color="primary"
                type="submit"
              >
                Save
              </Button>
              <Button
                onClick={cancelHandler}
                color="secondary"
                variant="outlined"
              >
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
