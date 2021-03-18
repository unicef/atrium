import React, {useState} from 'react'
import { Formik } from 'formik'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Radio from '@material-ui/core/Radio'
import Checkbox from '@material-ui/core/Checkbox'
import RadioGroup from '@material-ui/core/RadioGroup'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import { updateProject } from '../../../../api/projects'
import Expansions from './Expansions'
import { RefreshPage } from '../../assets'
import { Button, TextField, CopyIcon, AttachmentUploader } from '../../../../ui'
import MenuItem from '@material-ui/core/MenuItem'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
    fontSize: '21px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold'
  },
  bottomIntro: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 18
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
  },
  bottomButtons: {
    display: 'flex',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 200,
    textTransform: 'none'
  },
  selects: {
    borderRadius: '3px',
    width: '100%',
    fontSize: 12,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium
  },
  dropBoxBorder: {
    padding: '3%',
    width: '100%',
    backgroundImage:
      'repeating-linear-gradient(2deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px),' +
      ' repeating-linear-gradient(92deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px), ' +
      'repeating-linear-gradient(182deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px), ' +
      'repeating-linear-gradient(272deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px)',
    backgroundSize: '1px 100%, 100% 1px, 1px 100% , 100% 1px',
    backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center'
  },
  firstDropBoxText: {
    marginTop: '2%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 350,
    fontSize: 18
  },
  secondDropBoxText: {
    marginTop: '2%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 200,
    fontSize: 13
  },
  top: {
    display: 'flex'
  },
  formElement: {
    borderRadius: '3px',
    color: 'gray'
  },
  introButton: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 450,
    fontSize: 13,
    textTransform: 'none',
    borderColor: 'rgb(1, 206, 75)',
    marginLeft: '5%',
    borderRadius: '3px',
    color: 'rgb(1, 206, 75)'
  },
  cancelButton: {
    borderColor: 'rgb(1, 206, 75)',
    color: 'rgb(1, 206, 75)',
    marginTop: 40,
    borderRadius: '3px',
    textTransform: 'none',
    width: '100px'
  },
  saveButton: {
    width: '180px',
    color: 'white',
    marginTop: 40,
    borderRadius: '3px',
    textTransform: 'none',
    marginRight: 15,
  },
  chooseSelect: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: 15,
    color: 'grey'
  },
  inputLabel: {
    color: 'black',
    marginBottom: 6
  },
  typography: {
    color: 'black',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400
  },
  radioButton: {
    color: 'grey'
  },
  checkBox: {
    color: 'grey'
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

  const [characters, setCharacters] = useState(0)

  console.log('formdata')
  console.log(props.formData)

  return (
    <div className={classes.page}>
      <Typography
        color="secondary"
        className={[classes.introToProject, classes.typography]}
        component="h1"
        variant="h5"
      >
        Create project
      </Typography>

      <Typography
        color="secondary"
        className={classes.bottomIntro}
        component="h1"
        variant="h5"
      >
        Don't worry, you can change everything later
        <Button className={classes.introButton} variant="outlined">
          Need help?
        </Button>
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
                <div className={classes.dropBoxBorder}>
                  <div>
                    <CloudUploadIcon fontSize="large" />
                  </div>
                  <div className={classes.firstDropBoxText}>
                    Select project picture
                  </div>
                  <div className={classes.secondDropBoxText}>
                    Suggested size 1000px x 300px, under 10mb
                  </div>
                  <AttachmentUploader
                    attachment={values.attachment}
                    setAttachment={val => setFieldValue('attachment', val)}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  className={classes.inputLabel}
                  shrink
                  id="project-name-label"
                >
                  Project name
                </InputLabel>
                <TextField
                  className={classes.formElement}
                  id="projectName"
                  variant="outlined"
                  name="projectName"
                  labelId="project-name-label"
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
                <InputLabel
                  className={classes.inputLabel}
                  shrink
                  id="project-description-label"
                >
                  Project description
                </InputLabel>
                <TextField
                  id="projectDescription"
                  name="projectDescription"
                  variant="outlined"
                  labelId="project-description-label"
                  onChange={(e) => {
                    handleChange(e)
                    setCharacters(e.target.value.length)
                  }}
                  onBlur={handleBlur}
                  error={
                    !!(touched.projectDescription && errors.projectDescription)
                  }
                  multiline={true}
                  rows="4"
                  fullWidth
                  required
                  value={values.projectDescription}
                /><div>{characters}/250</div>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  color="secondary"
                  className={[classes.introToProject, classes.typography]}
                  component="h1"
                  variant="h5"
                >
                  Project
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <InputLabel className={classes.inputLabel} shrink>
                  Blockchain type
                </InputLabel>
                <RadioGroup row={true} aria-label="type" name="type">
                  <FormControlLabel
                    value="public"
                    control={<Radio className={classes.radioButton} />}
                    label="Public"
                  />
                  <FormControlLabel
                    value="permissioned"
                    control={<Radio className={classes.radioButton} />}
                    label="Permissioned"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  className={classes.inputLabel}
                  shrink
                  id="blockchain-name-label"
                >
                  Blockchain name
                </InputLabel>
                <Select
                  className={classes.selects}
                  labelId="blockchain-name-label"
                  id="blockchain-name"
                  displayEmpty
                  variant="outlined"
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em className={classes.chooseSelect}>Choose</em>
                  </MenuItem>
                  <MenuItem value="FirstName">FirstName</MenuItem>
                  <MenuItem value="SecondName">SecondName</MenuItem>
                  <MenuItem value="ThirdName">ThirdName</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkBox}
                      name="checkedContactPerson"
                    />
                  }
                  label="This project doesn't contain any sensitive data and can be viewed by non-UN users"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  className={classes.inputLabel}
                  shrink
                  id="stage-of-project-label"
                >
                  Stage of project
                </InputLabel>
                <Select
                  className={classes.selects}
                  labelId="stage-of-project-label"
                  variant="outlined"
                  displayEmpty
                  id="stage-of-project"
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em className={classes.chooseSelect}>Choose</em>
                  </MenuItem>
                  <MenuItem value="FirstStage">FirstStage</MenuItem>
                  <MenuItem value="SecondStage">SecondStage</MenuItem>
                  <MenuItem value="ThirdStage">ThirdStage</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  className={classes.inputLabel}
                  shrink
                  id="innovation-category-label"
                >
                  Innovation category
                </InputLabel>
                <Select
                  className={classes.selects}
                  labelId="innovation-category-label"
                  variant="outlined"
                  displayEmpty
                  id="innovation-category"
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em className={classes.chooseSelect}>Choose</em>
                  </MenuItem>
                  <MenuItem value="FirstCategory">FirstCategory</MenuItem>
                  <MenuItem value="SecondCategory">SecondCategory</MenuItem>
                  <MenuItem value="ThirdCategory">ThirdCategory</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  className={classes.inputLabel}
                  shrink
                  id="thematic-area-label"
                >
                  Thematic area
                </InputLabel>
                <TextField
                  id="thematicArea"
                  name="thematicArea"
                  variant="outlined"
                  labelId="thematic-area-label"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={disableEnterSubmit}
                  // error={!!(touched.projectName && errors.projectName)}
                  fullWidth
                  autoFocus
                  required
                  // value={values.projectName}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  color="secondary"
                  className={[classes.introToProject, classes.typography]}
                  component="h1"
                  variant="h5"
                >
                  Contact person
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkBox}
                      name="checkedContactPerson"
                    />
                  }
                  label="I'm the contact person for this project"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel className={classes.inputLabel} shrink>
                  Contact person's e-mail
                </InputLabel>
                <TextField
                  id="projectOwnerEmail"
                  type="email"
                  variant="outlined"
                  name="projectOwnerEmail"
                  onChange={handleChange}
                  placeholder="example@atrium.com"
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
                <InputLabel className={classes.inputLabel} shrink>
                  Contact person's full name
                </InputLabel>
                <TextField
                  id="projectOwner"
                  name="projectOwner"
                  variant="outlined"
                  placeholder="Ivan Ivanov"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={disableEnterSubmit}
                  helperText={!!touched.projectOwner && errors.projectOwner}
                  error={!!(touched.projectOwner && errors.projectOwner)}
                  fullWidth
                  value={values.projectOwner}
                />
              </Grid>
            </Grid>
            <div className={classes.bottomButtons}>
              <Button
                className={classes.saveButton}
                type="submit"
                color="primary"
                // disabled={!!(Object.keys(errors).length || props.isSubmitting)}
              >
                {values.editting ? 'Update' : 'Save and Continue'}
              </Button>
              <Button
                className={classes.cancelButton}
                variant="outlined"
                type="submit"
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
