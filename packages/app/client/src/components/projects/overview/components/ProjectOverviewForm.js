import React from 'react'
import { Formik } from 'formik'
import Typography from '@material-ui/core/Typography'
import { Button, TextField } from '../../../../ui'
import InputLabel from '@material-ui/core/InputLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { MyPost, ProjectPicture } from '../assets'

const useDefaultStyles = makeStyles(() => ({
  header: {
    textAlign: 'left',
    margin: '5% 0'
  },
  input: {
    color: 'black',
    marginTop: '5%'
  },
  myPostButton: {
    width: '46px',
    height: '46px',
    padding: 0,
    margin: '-60% 0 0 -50%',
    minWidth: 0,
    borderRadius: '50%'
  },
  addDocumentButton: {
    margin: '5% 0'
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
              <Typography className={classes.header} variant="subtitle1">
                Project Photo
              </Typography>
              <img
                className={classes.image}
                src={values.attachment || ProjectPicture}
                alt="LoadProjectImage"
              />
              <Button color="primary" className={classes.myPostButton}>
                <img src={MyPost} />
              </Button>
              <Typography className={classes.header} variant="subtitle1">
                Documents
              </Typography>
              <Button className={classes.addDocumentButton} color="primary">+ Add document file</Button>
              <Typography className={classes.header} variant="subtitle1">
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
