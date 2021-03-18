import React from 'react'
import { Formik } from 'formik'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import { updateProject } from '../../../../api/projects'
import Expansions from './Expansions'
import { RefreshPage } from '../../assets'
import { Button, TextField, CopyIcon, AttachmentUploader } from '../../../../ui'

const useStyles = makeStyles(theme => ({
  page: {
    marginBottom: theme.spacing(5)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 18
  },
  submitBtn: {
    marginTop: theme.spacing(6)
  },
  inviteContainer: {
    margin: '78px auto 90px auto',
    maxWidth: 344,
    justifyContent: 'center',
    '& > *:not(last-child)': {
      marginBottom: 20
    }
  },
  introToProject: {
    marginTop: theme.spacing(5),
    fontSize: '21px'
  },
  inviteImg: {
    display: 'block',
    maxHeight: 205,
    maxWidth: 343,
    width: '100%'
  },
  formControl: {
    '@global': {
      '.MuiInput-underline:before': {
        border: 'none !important'
      },
      '.MuiInput-underline:after': {
        borderColor: theme.colors['dark-forest-green']
      },
      '.MuiInputLabel-formControl': {
        position: 'static',
        color: theme.colors['dark-forest-green']
      },
      'label + .MuiInput-formControl': {
        marginTop: 0
      },
      '.MuiInputBase-input': {
        padding: '6px 0 0',
        color: theme.colors['black'],
        fontSize: 16,
        fontFamily: 'Roboto,sans-serif'
      }
    },
    width: '100%',
    marginTop: 48,
    padding: '12px 0',
    borderTop: '1px solid #aeaeae',
    borderBottom: '1px solid #aeaeae'
  },
  copyButton: {
    marginTop: -15,
    fontSize: 12,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.colors['black'],
    letterSpacing: 0.8,
    textTransform: 'uppercase'
  },
  copyButtonIcon: {
    marginRight: 3,
    height: 25,
    objectFit: 'contain'
  },
  snackContentMessage: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

const validateProjectForm = values => {
  const errors = {}

  if (!values.projectName) {
    errors.projectName = 'Required'
  }
  if (values.projectUrl && !values.projectUrl.includes('https://github.com/')) {
    errors.projectUrl =
      'Please ensure that the format of the repo url is: https://github.com/{USER}/{REPO_NAME}'
  }
  if (
    values.projectOwnerEmail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.projectOwnerEmail)
  ) {
    errors.projectOwnerEmail = 'Invalid email address'
  }
  if (values.projectOwner && !values.projectOwnerEmail) {
    errors.projectOwnerEmail = 'Please also fill out project owner email'
  }
  if (!values.projectOwner && values.projectOwnerEmail) {
    errors.projectOwner = 'Please also fill out project owner name'
  }
  if (!values.projectDescription) {
    errors.projectDescription = 'Required'
  }

  return errors
}

const disableEnterSubmit = e => {
  e.key === 'Enter' && e.preventDefault()
}

export const FirstProjectForm = props => {
  const classes = useStyles()

  const getName = () => {
    const { userName } = props
    return (userName && userName.split(' ')[0]) || ''
  }

  const onFormUpdate = async (values, { setSubmitting }) => {
    const projectTags =
      !values.projectTags || values.projectTags.length === 0
        ? []
        : values.projectTags.split(',').map(s => s.trim())
    const data = { ...values, projectTags }

    props.handleNextStep(data, true)
    setSubmitting(false)
  }

  const onFormSubmit = (values, { setSubmitting }) => {
    const projectTags =
      !values.projectTags || values.projectTags.length === 0
        ? []
        : values.projectTags.split(',').map(s => s.trim())
    const data = { ...values, projectTags }
    props.handleNextStep(data)
    setSubmitting(false)
  }

  console.log('formdata')
  console.log(props.formData)

  return (
    <div className={classes.page}>
      <Typography
        color="secondary"
        className={classes.introToProject}
        component="h1"
        variant="h5"
      >
        Hey {getName()}, please provide the following details to{' '}
        {props.editting ? 'update the project' : 'complete project upload'}
      </Typography>
      <Formik
        initialValues={{ ...props.formData, editting: props.editting }}
        enableReinitialize={true}
        validate={validateProjectForm}
        onSubmit={props.editting ? onFormUpdate : onFormSubmit}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          ...props
        }) => (
          <form
            className={classes.form}
            onSubmit={props.handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="projectName"
                  name="projectName"
                  label="Project Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={disableEnterSubmit}
                  error={!!(touched.projectName && errors.projectName)}
                  fullWidth
                  autoFocus
                  required
                  value={values.projectName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="projectDescription"
                  name="projectDescription"
                  label="Project Description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    !!(touched.projectDescription && errors.projectDescription)
                  }
                  multiline={true}
                  rows="4"
                  fullWidth
                  required
                  value={values.projectDescription}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="projectOwner"
                  name="projectOwner"
                  label="Project Owner"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={disableEnterSubmit}
                  helperText={!!touched.projectOwner && errors.projectOwner}
                  error={!!(touched.projectOwner && errors.projectOwner)}
                  fullWidth
                  value={values.projectOwner}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="projectOwnerEmail"
                  type="email"
                  name="projectOwnerEmail"
                  label="Project Owner Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={disableEnterSubmit}
                  helperText={!!values.projectOwner && errors.projectOwnerEmail}
                  error={
                    !!(touched.projectOwnerEmail && errors.projectOwnerEmail)
                  }
                  fullWidth
                  value={values.projectOwnerEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="projectUrl"
                  name="projectUrl"
                  label="Github URL for project"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={disableEnterSubmit}
                  error={!!(touched.projectUrl && errors.projectUrl)}
                  placeholder="Paste the URL of your Github project repository"
                  fullWidth
                  value={values.projectUrl}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="projectTags"
                  name="projectTags"
                  label="Project tags"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={disableEnterSubmit}
                  error={!!(touched.projectTags && errors.projectTags)}
                  fullWidth
                  value={values.projectTags}
                />
                <Typography variant="subtitle1">
                  Tags are used to sort similar projects. When listing multiple
                  tags, please separate with a comma and a space: for example
                  'credentials, incentivisation, finance, cryptocurrency'
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="websiteLink"
                  name="websiteLink"
                  label="Project website URL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={disableEnterSubmit}
                  error={!!(touched.websiteLink && errors.websiteLink)}
                  fullWidth
                  value={values.websiteLink}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AttachmentUploader
                attachment={values.attachment}
                setAttachment={val => setFieldValue('attachment', val)}
              />
            </Grid>
            <Button
              style={{ marginTop: 48 }}
              fullWidth
              type="submit"
              color="primary"
              disabled={!!(Object.keys(errors).length || props.isSubmitting)}
            >
              {values.editting ? 'Update' : 'Upload'} Project
            </Button>
          </form>
        )}
      />
    </div>
  )
}

export const SecondProjectForm = props => {
  const classes = useStyles()
  // const [isLoading, setLoading] = React.useState(false);
  const [isShowSnack, toggleSnack] = React.useState(false)

  const toogleSnackMessage = () => {
    toggleSnack(prev => !prev)
  }

  const handleSubmit = async cb => {
    // setLoading(true)
    props.onCreateProject()
    // props.onCreateProject(cb => {
    //   setLoading(false)
    // })
  }

  return (
    <div className={classes.page}>
      <Typography
        color="secondary"
        className={classes.introToProject}
        component="h1"
        variant="h5"
      >
        To complete the project upload, please invite the following profile to
        your Github project:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl className={classes.formControl} disabled>
            <InputLabel htmlFor="githubProfileName">
              Github profile name
            </InputLabel>
            <Input
              id="githubProfileName"
              defaultValue={props.githubProfileName}
              endAdornment={
                <InputAdornment position="end">
                  <CopyToClipboard
                    onCopy={toogleSnackMessage}
                    text={props.githubProfileName}
                  >
                    <ButtonBase
                      className={classes.copyButton}
                      variant="contained"
                      size="small"
                    >
                      <CopyIcon className={classes.copyButtonIcon} /> copy
                    </ButtonBase>
                  </CopyToClipboard>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container className={classes.inviteContainer}>
        <Grid item>
          <img
            src={RefreshPage}
            className={classes.inviteImg}
            alt="Refresh page"
          />
        </Grid>
        <Grid item>
          <Typography component="p" variant="subtitle1">
            Once you have invited <b>The Atrium</b> to your project on Github,
            please refresh this page to complete project upload.
          </Typography>
        </Grid>
      </Grid>

      <Expansions />

      <Button
        fullWidth
        type="button"
        color="primary"
        // disabled={isLoading}
        onClick={handleSubmit}
      >
        Complete
      </Button>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        open={isShowSnack}
        onClose={toogleSnackMessage}
        ContentProps={{ className: classes.snackContentMessage }}
        message={<span>Copied to clipboard</span>}
      />
    </div>
  )
}
