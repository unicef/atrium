import React from 'react'
import { Formik } from 'formik'
import Typography from '@material-ui/core/Typography'
import { Button, TextField } from '../../../../ui'
import InputLabel from '@material-ui/core/InputLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useDefaultStyles = makeStyles(() => ({
  header: {
    textAlign: 'left',
    fontSize: '18px'
  },
  image: {
    width: '400px',
    height: '220px',
    margin: '5% 0'
  },
  input: {
    color: 'black',
    marginTop: '5%'
  }
}))

const validateProjectForm = values => {
  const errors = {}

  return errors
}

function ProjectOverviewForm(props) {
  const classes = useDefaultStyles()

  const onFormSubmit = (values, { setSubmitting }) => {
    props.handleCreateProject(values)
    setSubmitting(false)
  }

  return (
    <div>
      {props.formData.projectId ? (
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
              <Typography
                className={classes.header}
                variant="subtitle1"
              >
                Project Photo
              </Typography>
              <div className={classes.image}>
                <img src={values.attachment} alt="LoadProjectImage" />
              </div>
              <Typography
                className={classes.header}
                variant="subtitle1"
              >
                Documents
              </Typography>
              <Button color="primary">+ Add document file</Button>
              <Typography
                className={classes.header}
                variant="subtitle1"
              >
                Links
              </Typography>
              <InputLabel
                className={classes.input}
                htmlFor="linkToRepository"
                shrink
              >
                Repository link
              </InputLabel>
              <TextField
                id="linkToRepository"
                name="linkToRepository"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.linkToRepository}
                fullWidth
                placeholder="Http://atrium.com/project1234567"
              />
              <InputLabel
                className={classes.input}
                htmlFor="websiteLink"
                shrink
              >
                Project website link
              </InputLabel>
              <TextField
                id="websiteLink"
                name="websiteLink"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.websiteLink}
                variant="outlined"
                placeholder="Http:// ...."
              />
              <div>
                <Button color="primary" type="submit">
                  Save
                </Button>
              </div>
            </form>
          )}
        />
      ) : null}
    </div>
  )
}

export default ProjectOverviewForm
