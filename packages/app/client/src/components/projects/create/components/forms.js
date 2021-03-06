import React, { useState } from 'react'
import { Formik } from 'formik'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Radio from '@material-ui/core/Radio'
import Checkbox from '@material-ui/core/Checkbox'
import RadioGroup from '@material-ui/core/RadioGroup'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {
  Button,
  TextField,
  AttachmentUploader,
  Select,
  Image
} from '../../../../ui'
import MenuItem from '@material-ui/core/MenuItem'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { MyPost, ProjectPicture } from '../../overview/assets'
import DocumentUpload from './DocumentUpload'

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '50%',
    height: '100%',
    paddingTop: '5%',
    marginBottom: theme.spacing(5)
  },
  counter: {
    position: 'absolute',
    right: 25,
    bottom: 0,
    transform: 'translate(0, -50%)',
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
        fontFamily: theme.typography.fontFamily,
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
    marginTop: '5%'
  },
  selects: {
    borderRadius: '3px',
    width: '100%',
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
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 350,
    fontSize: 18
  },
  secondDropBoxText: {
    marginTop: '2%',
    fontFamily: theme.typography.fontFamily,
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
  saveButton: {
    marginRight: '2%'
  },
  chooseSelect: {
    color: 'grey'
  },
  inputLabel: {
    color: 'black',
    marginBottom: 6,
    fontWeight: 500
  },
  radioButton: {
    color: 'grey'
  },
  checkBox: {
    color: 'grey'
  },
  header: {
    textAlign: 'left',
    margin: '5% 0'
  },
  myPostButton: {
    width: '46px',
    height: '46px',
    padding: 0,
    minWidth: 0,
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 3
  },
  addFileButton: {
    margin: '5% 0'
  },
  document: {
    padding: '2% 4%',
    border: '1.6px solid #636767',
    borderRadius: '3px',
    margin: '2% 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteButton: {
    width: '13px',
    height: '13px',
    minWidth: 0,
    margin: 0
  },
  documentName: {
    fontSize: '13px'
  },
  fileInput: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  },
  fileInputLabel: {
    cursor: 'pointer'
  },
  chosenFile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  eraseButton: {
    margin: 0,
    backgroundColor: 'white',
    minWidth: 0,
    width: '5px',
    height: '5px'
  },
  errorMessage: {
    marginLeft: 0,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '140%',
    color: theme.palette.error.main
  },
  imageWrapper: {
    marginBottom: '4% '
  },
  editAttachmentMessage: {
    color: theme.colors['dark-gray']
  }
}))

const disableEnterSubmit = e => {
  e.key === 'Enter' && e.preventDefault()
}

export const FirstProjectForm = props => {
  const classes = useStyles()

  const fileInputRef = React.useRef(null)
  const imgInputRef = React.useRef(null)
  const photoInputRef = React.useRef(null)
  const videoInputRef = React.useRef(null)

  const [picture, setPicture] = useState(null)

  const oldPicture = props.formData.attachment && props.formData.attachment.url
  const oldFiles = props.formData && props.formData.documents
  const oldPhotos = props.formData && props.formData.photos
  const oldVideos = props.formData && props.formData.videos

  const clickInput = (e, type) => {
    e.preventDefault()
    switch (type) {
      case 'image':
        imgInputRef.current.click()
        break
      case 'file':
        fileInputRef.current.click()
        break
      case 'photo':
        photoInputRef.current.click()
        break
      case 'video':
        videoInputRef.current.click()
        break
    }
  }

  const deleteHandler = async (filePath, type) => {
    await props.deleteFileFromProject(props.formData.projectId, filePath.url, type)
  }

  const cancelHandler = () => {
    props.editting ? props.goToOverview() : window.location.reload()
  }

  const onFormSubmit = (values, { setSubmitting }) => {
    props.handleCreateProject(values, props.editting)
    setSubmitting(false)
  }
  const receivedDescription =
    props.formData && props.formData.projectDescription
      ? props.formData.projectDescription
      : ''
  const [characters, setCharacters] = useState(receivedDescription.length)

  const validateProjectForm = (values) => {
    const errors = {}
    if (!values.projectName) {
      errors.projectName = 'Project name is required'
    }
    if (!values.projectDescription) {
      errors.projectDescription = 'Project description is required'
    }
    if (values.projectDescription && values.projectDescription.length > 250) {
      errors.projectDescription =
        'Description must be no longer than 250 characters'
    }
    if (!values.blockchainType) {
      errors.blockchainType = 'Blockchain type is required'
    }
    if (!oldPicture && !values.attachment) {
      errors.attachment = 'Project photo is required'
    }
    if (!values.blockchainName) {
      errors.blockchainName = 'Blockchain name is required'
    }
    if (!values.stageOfProject) {
      errors.stageOfProject = 'Stage of project is required'
    }
    if (!values.innovationCategory) {
      errors.innovationCategory = 'Innovation category is required'
    }
    if (!values.thematicArea) {
      errors.thematicArea = 'Thematic area is required'
    }
    if (
      values.contactPersonEmail &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        values.contactPersonEmail
      )
    ) {
      errors.contactPersonEmail = 'Invalid email address'
    }
    if (!values.checkedContactPerson && !values.contactPersonEmail) {
      errors.contactPersonEmail =
        'Please also fill out project contact person email'
    }
    if (!values.checkedContactPerson && !values.contactPersonFullName) {
      errors.contactPersonFullName =
        'Please also fill out project contact person name'
    }
    return errors
  }

  return (
    <div className={classes.wrapper}>
      <Typography color="secondary" variant="h3">
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
        initialValues={{
          ...props.formData,
          attachment: picture,
          editting: props.editting
        }}
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
          validateForm,
          ...props
        }) => (
          <form
            className={classes.form}
            onSubmit={props.handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} className={classes.imageWrapper}>
                {values.editting ? (
                  <>
                    <InputLabel
                      className={classes.inputLabel}
                      shrink
                      htmlFor="attachment"
                    >
                      Project photo{' '}
                      <Typography
                        className={classes.editAttachmentMessage}
                        component="span"
                      >
                        (maximum size of 10MB)
                      </Typography>
                    </InputLabel>
                    <Box position="relative" width="100%" height="250px">
                      <Image
                        width="100%"
                        height="250px"
                        borderRadius="5px"
                        sameSize
                        src={oldPicture || ProjectPicture}
                      />
                      <input
                        ref={imgInputRef}
                        type="file"
                        id="attachment"
                        name="attachment"
                        className={classes.fileInput}
                        onChange={e => {
                          setPicture(e.target.files[0])
                          handleChange(e)
                        }}
                      />
                      <Button
                        color="primary"
                        className={classes.myPostButton}
                        onClick={e => clickInput(e, 'image')}
                        disabled={!!picture}
                      >
                        <label
                          htmlFor={'attachment'}
                          className={classes.fileInputLabel}
                          aria-label={'ATTACH IMAGE'}
                          title={'ATTACH IMAGE'}
                        >
                          <img src={MyPost} alt="ProjectPicture" />
                        </label>
                      </Button>
                    </Box>
                    {picture ? (
                      <div className={classes.chosenFile}>
                        <Typography
                          variant="h5"
                          className={classes.documentName}
                        >
                          {picture.name}
                        </Typography>
                        <Button
                          className={classes.eraseButton}
                          onClick={() => {
                            setPicture(null)
                            imgInputRef.current.value = null
                          }}
                        >
                          X
                        </Button>
                      </div>
                    ) : null}
                  </>
                ) : (
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
                      variant="create"
                    />
                  </div>
                )}
                <FormHelperText className={classes.errorMessage}>
                  {!!(touched.attachment && errors.attachment) && !oldPicture
                    ? touched.attachment && errors.attachment
                    : null}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.formElement}
                  id="projectName"
                  variant="outlined"
                  name="projectName"
                  htmlFor="projectName"
                  label="Project name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={disableEnterSubmit}
                  error={!!(touched.projectName && errors.projectName)}
                  errorMessage={touched.projectName && errors.projectName}
                  fullWidth
                  value={values.projectName}
                />
              </Grid>
              <Grid item xs={12}>
                <Box position="relative" width="100%">
                  <TextField
                    id="projectDescription"
                    name="projectDescription"
                    variant="outlined"
                    htmlFor="projectDescription"
                    label="Project description"
                    onChange={e => {
                      handleChange(e)
                      setCharacters(e.target.value.length)
                    }}
                    onBlur={handleBlur}
                    error={
                      !!(touched.projectDescription && errors.projectDescription)
                    }
                    errorMessage={
                      touched.projectDescription && errors.projectDescription
                    }
                    multiline={true}
                    rows="4"
                    fullWidth
                    required
                    characterLimit={250}
                    value={values.projectDescription}
                  />
                  <Box className={classes.counter}>
                    <Typography variant="body2">
                      {characters} / 250
                    </Typography>
                  </Box>
                </Box>
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
                <FormHelperText className={classes.errorMessage}>
                  {!!(touched.blockchainType && errors.blockchainType)
                    ? touched.blockchainType && errors.blockchainType
                    : null}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Select
                  className={classes.selects}
                  id="blockchainName"
                  name="blockchainName"
                  htmlFor="blockchainName"
                  label="Blockchain name"
                  displayEmpty
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.blockchainName && errors.blockchainName)}
                  errorMessage={touched.blockchainName && errors.blockchainName}
                  defaultValue={values.blockchainName}
                  variant="outlined"
                >
                  <MenuItem value="">
                    <Typography className={classes.chooseSelect}>Choose</Typography>
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
                      error={!!(touched.freeForAll && errors.freeForAll)}
                      errorMessage={touched.freeForAll && errors.freeForAll}
                    />
                  }
                  label="Allow this Project to be viewed by non-UN users"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  className={classes.selects}
                  htmlFor="stageOfProject"
                  label="Stage of project"
                  variant="outlined"
                  displayEmpty
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.stageOfProject && errors.stageOfProject)}
                  errorMessage={touched.stageOfProject && errors.stageOfProject}
                  defaultValue={values.stageOfProject}
                  id="stageOfProject"
                  name="stageOfProject"
                >
                  <MenuItem value="">
                    <Typography className={classes.chooseSelect}>Choose</Typography>
                  </MenuItem>
                  <MenuItem value="Research">Research</MenuItem>
                  <MenuItem value="Ideation">Ideation</MenuItem>
                  <MenuItem value="Prototype">Prototype</MenuItem>
                  <MenuItem value="Implementation">Implementation</MenuItem>
                  <MenuItem value="Production">Production</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Select
                  htmlFor="innovationCategory"
                  label="Innovation category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.innovationCategory}
                  className={classes.selects}
                  error={
                    !!(touched.innovationCategory && errors.innovationCategory)
                  }
                  errorMessage={
                    touched.innovationCategory && errors.innovationCategory
                  }
                  variant="outlined"
                  displayEmpty
                  id="innovationCategory"
                  name="innovationCategory"
                >
                  <MenuItem value="">
                    <Typography className={classes.chooseSelect}>Choose</Typography>
                  </MenuItem>
                  <MenuItem value="Blockchain">Blockchain</MenuItem>
                  <MenuItem value="Financial Inclusion">
                    Financial Inclusion
                  </MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="Identity">Identity</MenuItem>
                  <MenuItem value="Supply Chains">Supply Chains</MenuItem>
                  <MenuItem value="Food and Water">Food and Water</MenuItem>
                  <MenuItem value="Marketplaces">Marketplaces</MenuItem>
                  <MenuItem value="Energy">Energy</MenuItem>
                  <MenuItem value="Accounting and Audit">
                    Accounting and Audit
                  </MenuItem>
                  <MenuItem value="Innovative Financing">
                    Innovative Financing
                  </MenuItem>
                  <MenuItem value="Nutrition">Nutrition</MenuItem>
                  <MenuItem value="Emergency Response">
                    Emergency Response
                  </MenuItem>
                  <MenuItem value="Government system">
                    Government system
                  </MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Select
                  id="thematicArea"
                  name="thematicArea"
                  htmlFor="thematicArea"
                  label="Thematic area"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.thematicArea && errors.thematicArea)}
                  errorMessage={touched.thematicArea && errors.thematicArea}
                  defaultValue={values.thematicArea}
                  fullWidth
                  className={classes.selects}
                  displayEmpty
                >
                  <MenuItem value="">
                    <Typography className={classes.chooseSelect}>Choose</Typography>
                  </MenuItem>
                  <MenuItem value="End Poverty">End Poverty</MenuItem>
                  <MenuItem value="Zero Hunger">Zero Hunger</MenuItem>
                  <MenuItem value="Good Health and Well-Being">
                    Good Health and Well-Being
                  </MenuItem>
                  <MenuItem value="Quality Education">
                    Quality Education
                  </MenuItem>
                  <MenuItem value="Gender Equality">Gender Equality</MenuItem>
                  <MenuItem value="Clean Water and Sanitation">
                    Clean Water and Sanitation
                  </MenuItem>
                  <MenuItem value="Affordable and Clean Energy">
                    Affordable and Clean Energy
                  </MenuItem>
                  <MenuItem value="Decent Work and Economic Growth">
                    Decent Work and Economic Growth
                  </MenuItem>
                  <MenuItem value="Industry, Innovation and Infrastructure">
                    Industry, Innovation and Infrastructure
                  </MenuItem>
                  <MenuItem value="Reduced Inequalities">
                    Reduced Inequalities
                  </MenuItem>
                  <MenuItem value="Sustainable Cities and Communities">
                    Sustainable Cities and Communities
                  </MenuItem>
                  <MenuItem value="Responsible Consumption and Production">
                    Responsible Consumption and Production
                  </MenuItem>
                  <MenuItem value="Climate action">Climate action</MenuItem>
                  <MenuItem value="Life Below Water">Life Below Water</MenuItem>
                  <MenuItem value="Life on Land">Life on Land</MenuItem>
                  <MenuItem value="Peace, Justice and Strong Institutions">
                    Peace, Justice and Strong Institutions
                  </MenuItem>
                  <MenuItem value="Partnerships for Goals">
                    Partnerships for Goals
                  </MenuItem>
                </Select>
              </Grid>
              {values.editting ? (

                <Grid item xs={12}>
                  <DocumentUpload
                    htmlFor="documents"
                    name="documents"
                    title="Documents"
                    handleChange={setFieldValue}
                    prevValues={oldFiles}
                    deleteHandler={deleteHandler}
                    type="document"
                  />

                  <DocumentUpload
                    htmlFor="photos"
                    name="photos"
                    title="Photos"
                    handleChange={setFieldValue}
                    prevValues={oldPhotos}
                    deleteHandler={deleteHandler}
                    type="photo"
                  />

                  <DocumentUpload
                    htmlFor="videos"
                    name="videos"
                    title="Videos"
                    handleChange={setFieldValue}
                    prevValues={oldVideos}
                    deleteHandler={deleteHandler}
                    type="video"
                  />
                </Grid>

              ) : null}
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
                      onChange={handleChange}
                      name="checkedContactPerson"
                      id="checkedContactPerson"
                    />
                  }
                  label="I'm the contact person for this project"
                />
              </Grid>
              {values.checkedContactPerson ? null : (
                <>
                  <Grid item xs={12}>
                    <TextField
                      id="contactPersonEmail"
                      type="email"
                      htmlFor="projectOwnerEmail"
                      label="Contact person's e-mail"
                      variant="outlined"
                      name="contactPersonEmail"
                      onChange={handleChange}
                      placeholder="example@atrium.com"
                      onBlur={handleBlur}
                      onKeyPress={disableEnterSubmit}
                      errorMessage={
                        touched.contactPersonFullName &&
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
                    <TextField
                      id="contactPersonFullName"
                      name="contactPersonFullName"
                      htmlFor="contactPersonFullName"
                      label="Contact person's full name"
                      variant="outlined"
                      placeholder="Ivan Ivanov"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyPress={disableEnterSubmit}
                      errorMessage={
                        touched.contactPersonFullName &&
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
              <Button
                className={classes.saveButton}
                color="primary"
                type="submit"
                disabled={isSubmitting || !dirty}
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
