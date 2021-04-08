import React, { useState } from 'react'
import { Formik } from 'formik'

import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import Checkbox from '@material-ui/core/Checkbox'
import RadioGroup from '@material-ui/core/RadioGroup'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Button, TextField, AttachmentUploader } from '../../../../ui'
import MenuItem from '@material-ui/core/MenuItem'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '50%',
    height: '100%',
    paddingTop: '5%',
    marginBottom: theme.spacing(5)
  },
  counter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '-20px',
    paddingRight: '10px',
    color: '#636767',
    fontSize: 13
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 18
  },
  line: {
    borderBottom: 'solid 1.2px #E7E7E7',
    margin: '5% 0'
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
  subtitle: {
    marginTop: theme.spacing(5),
    fontSize: '22px'
  },
  bottomIntro: {
    margin: '5% 0'
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
    display: 'flex'
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
    margin: '0 0 0 5%'
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
    marginRight: 15
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
  if (!values.projectDescription) {
    errors.projectDescription = 'Required'
  }
  if (
    values.contactPersonEmail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contactPersonEmail)
  ) {
    errors.contactPersonEmail = 'Invalid email address'
  }
  if (values.contactPersonFullName && !values.contactPersonEmail) {
    errors.contactPersonEmail = 'Please also fill out project owner email'
  }
  if (!values.contactPersonFullName && values.contactPersonEmail) {
    errors.contactPersonFullName = 'Please also fill out project owner name'
  }
  return errors
}

const disableEnterSubmit = e => {
  e.key === 'Enter' && e.preventDefault()
}

export const FirstProjectForm = props => {
  const classes = useStyles()

  const history = useHistory()
  const cancelHandler = () => {
    history.push('/view-projects')
  }

  const onFormSubmit = (values, { setSubmitting }) => {
    const projectTags =
      !values.projectTags || values.projectTags.length === 0
        ? []
        : values.projectTags.split(',').map(s => s.trim())
    const data = { ...values, projectTags }
    props.handleCreateProject(data, props.editting)
    setSubmitting(false)
  }
  const [characters, setCharacters] = useState(0)
  const [contactPerson, setContactPerson] = useState(false)
  return (
    <div className={classes.wrapper}>
      <Typography
        color="secondary"
        variant="h3"
      >
        {props.editting ? 'Edit Required information' : 'Create project'}
      </Typography>

      <Typography
        color="secondary"
        className={classes.bottomIntro}
        variant="body1"
      >
        {props.editting
          ? 'Your project can now be shared with the world. Add more information to reach more people. You can edit this data at any point'
          : "Don't worry, you can change everything later"}

        {props.editting ? (
          <Link href="#"> need help?</Link>
        ) : (
          <Button className={classes.introButton} variant="outlined">
            Need help?
          </Button>
        )}
      </Typography>
      <Formik
        initialValues={{ ...props.formData, editting: props.editting }}
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
          <form
            className={classes.form}
            onSubmit={props.handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {values.editting ? null : (
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
                )}
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  className={classes.inputLabel}
                  shrink
                  htmlFor="projectName"
                >
                  Project name
                </InputLabel>
                <TextField
                  className={classes.formElement}
                  id="projectName"
                  variant="outlined"
                  name="projectName"
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
                  htmlFor="projectDescription"
                >
                  Project description
                </InputLabel>
                <TextField
                  id="projectDescription"
                  name="projectDescription"
                  variant="outlined"
                  onChange={e => {
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
                />
                <Typography variant="body1" className={classes.counter}>
                  {characters}/250
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.line} />
                <Typography
                  color="secondary"
                  className={classes.subtitle}
                  variant="subtitle1"
                >
                  Project
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  className={classes.inputLabel}
                  shrink
                  htmlFor="blockchainType"
                >
                  Blockchain type
                </InputLabel>
                <RadioGroup
                  row={true}
                  aria-label="type"
                  name="blockchainType"
                  id="blockchainType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.blockchainType}
                >
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
                  htmlFor="blockchainName"
                >
                  Blockchain name
                </InputLabel>
                <Select
                  className={classes.selects}
                  id="blockchainName"
                  name="blockchainName"
                  displayEmpty
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.blockchainName}
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em className={classes.chooseSelect}>Choose</em>
                  </MenuItem>
                  <MenuItem value="bitcoin">Bitcoin</MenuItem>
                  <MenuItem value="ethereum">Ethereum</MenuItem>
                  <MenuItem value="hyperledger">Hyperledger</MenuItem>
                  <MenuItem value="corda">Corda</MenuItem>
                  <MenuItem value="quorum">Quorum</MenuItem>
                  <MenuItem value="iota">IOTA</MenuItem>
                  <MenuItem value="stellar">Stellar</MenuItem>
                  <MenuItem value="other">Other - please specify</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkBox}
                      name="freeForAll"
                      id="freeForAll"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultChecked={values.freeForAll}
                    />
                  }
                  label="This project doesn't contain any sensitive data and can be viewed by non-UN users"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  className={classes.inputLabel}
                  shrink
                  htmlFor="stageOfProject"
                >
                  Stage of project
                </InputLabel>
                <Select
                  className={classes.selects}
                  variant="outlined"
                  displayEmpty
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.stageOfProject}
                  id="stageOfProject"
                  name="stageOfProject"
                >
                  <MenuItem value="">
                    <em className={classes.chooseSelect}>Choose</em>
                  </MenuItem>
                  <MenuItem value="research">Research</MenuItem>
                  <MenuItem value="ideation">Ideation</MenuItem>
                  <MenuItem value="prototype">Prototype</MenuItem>
                  <MenuItem value="implementation">Implementation</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  className={classes.inputLabel}
                  shrink
                  id="innovationCategory"
                >
                  Innovation category
                </InputLabel>
                <Select
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.innovationCategory}
                  className={classes.selects}
                  variant="outlined"
                  displayEmpty
                  id="innovationCategory"
                  name="innovationCategory"
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
                  id="thematicArea"
                >
                  Thematic area
                </InputLabel>
                <TextField
                  id="thematicArea"
                  name="thematicArea"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.thematicArea}
                  onKeyPress={disableEnterSubmit}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.line} />
                <Typography
                  color="secondary"
                  className={classes.subtitle}
                  variant="subtitle1"
                >
                  Contact person
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkBox}
                      onChange={() => setContactPerson(!contactPerson)}
                      name="checkedContactPerson"
                      id="checkedContactPerson"
                    />
                  }
                  label="I'm the contact person for this project"
                />
              </Grid>
              {contactPerson ? null : (
                <>
                  <Grid item xs={12}>
                    <InputLabel
                      className={classes.inputLabel}
                      shrink
                      htmlFor="projectOwnerEmail"
                    >
                      Contact person's e-mail
                    </InputLabel>
                    <TextField
                      id="contactPersonEmail"
                      type="email"
                      variant="outlined"
                      name="contactPersonEmail"
                      onChange={handleChange}
                      placeholder="example@atrium.com"
                      onBlur={handleBlur}
                      onKeyPress={disableEnterSubmit}
                      errorMessage={
                        !!values.contactPersonFullName &&
                        errors.contactPersonEmail
                      }
                      error={
                        !!(
                          touched.contactPersonEmail &&
                          errors.contactPersonEmail
                        )
                      }
                      fullWidth
                      value={values.contactPersonEmail}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel
                      className={classes.inputLabel}
                      shrink
                      htmlFor="contactPersonFullName"
                    >
                      Contact person's full name
                    </InputLabel>
                    <TextField
                      id="contactPersonFullName"
                      name="contactPersonFullName"
                      variant="outlined"
                      placeholder="Ivan Ivanov"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyPress={disableEnterSubmit}
                      errorMessage={
                        !!touched.contactPersonFullName &&
                        errors.contactPersonFullName
                      }
                      error={
                        !!(
                          touched.contactPersonFullName &&
                          errors.contactPersonFullName
                        )
                      }
                      fullWidth
                      value={values.contactPersonFullName}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <div className={classes.bottomButtons}>
              <Button color="primary" type="submit">
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
