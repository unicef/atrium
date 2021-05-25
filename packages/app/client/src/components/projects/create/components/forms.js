import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'

import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import Checkbox from '@material-ui/core/Checkbox'
import RadioGroup from '@material-ui/core/RadioGroup'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Button, TextField, AttachmentUploader, Select } from '../../../../ui'
import MenuItem from '@material-ui/core/MenuItem'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { DeleteButton, MyPost, ProjectPicture } from '../../overview/assets'

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
    display: 'flex',
    marginTop: '5%'
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
  saveButton: {
    marginRight: '2%'
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
    margin: '-35% 0 0 -40%',
    minWidth: 0,
    borderRadius: '50%'
  },
  addFileButton: {
    margin: '5% 0'
  },
  image: {
    width: '400px',
    height: '220px',
    borderRadius: '5px'
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
  const [file, setFile] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [video, setVideo] = useState(null)

  const [oldPicture, setOldPicture] = useState(props.formData.attachment)
  const [oldFiles, setOldFiles] = useState(props.formData.documents)
  const [oldPhotos, setOldPhotos] = useState(props.formData.documents)
  const [oldVideos, setOldVideos] = useState(props.formData.documents)

  useEffect(() => {
    setOldPicture(props.formData.attachment)
  }, [props.formData.attachment])

  useEffect(() => {
    setOldFiles(props.formData.documents)
  }, [props.formData.documents])

  useEffect(() => {
    setOldPhotos(props.formData.photos)
  }, [props.formData.photos])

  useEffect(() => {
    setOldVideos(props.formData.videos)
  }, [props.formData.videos])

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
    await props.deleteFileFromProject(props.formData.projectId, filePath, type)
    props.refreshToken()
    if (type === 'document') {
      setOldFiles(oldFiles.filter(file => file !== filePath))
    } else if (type === 'video') {
      setOldVideos(oldVideos.filter(file => file !== filePath))
    } else {
      setOldPhotos(oldPhotos.filter(file => file !== filePath))
    }
  }

  const history = useHistory()
  const cancelHandler = () => {
    history.push('/projects')
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

  const validateProjectForm = values => {
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
    if (!contactPerson && !values.contactPersonEmail) {
      errors.contactPersonEmail =
        'Please also fill out project contact person email'
    }
    if (!contactPerson && !values.contactPersonFullName) {
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
          documents: file,
          photos: photo,
          videos: video,
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
          ...props
        }) => (
          <form
            className={classes.form}
            onSubmit={props.handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {values.editting ? (
                  <>
                    <InputLabel
                      className={classes.inputLabel}
                      shrink
                      htmlFor="attachment"
                    >
                      Project photo
                    </InputLabel>
                    <img
                      className={classes.image}
                      src={oldPicture || ProjectPicture}
                      alt="LoadProjectImage"
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
                    ? !!touched.attachment && errors.attachment
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
                  errorMessage={!!touched.projectName && errors.projectName}
                  fullWidth
                  autoFocus
                  value={values.projectName}
                />
              </Grid>
              <Grid item xs={12}>
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
                    !!touched.projectDescription && errors.projectDescription
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
                <FormHelperText className={classes.errorMessage}>
                  {!!(touched.blockchainType && errors.blockchainType)
                    ? !!touched.blockchainType && errors.blockchainType
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
                  errorMessage={
                    !!touched.blockchainName && errors.blockchainName
                  }
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
                <Select
                  className={classes.selects}
                  htmlFor="stageOfProject"
                  label="Stage of project"
                  variant="outlined"
                  displayEmpty
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.stageOfProject && errors.stageOfProject)}
                  errorMessage={
                    !!touched.stageOfProject && errors.stageOfProject
                  }
                  defaultValue={values.stageOfProject}
                  id="stageOfProject"
                  name="stageOfProject"
                >
                  <MenuItem value="">
                    <em className={classes.chooseSelect}>Choose</em>
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
                    !!touched.innovationCategory && errors.innovationCategory
                  }
                  variant="outlined"
                  displayEmpty
                  id="innovationCategory"
                  name="innovationCategory"
                >
                  <MenuItem value="">
                    <em className={classes.chooseSelect}>Choose</em>
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
                  errorMessage={!!touched.thematicArea && errors.thematicArea}
                  defaultValue={values.thematicArea}
                  fullWidth
                  className={classes.selects}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em className={classes.chooseSelect}>Choose</em>
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
                <>
                  <Grid item xs={12}>
                    <InputLabel
                      className={classes.inputLabel}
                      shrink
                      htmlFor="documents"
                    >
                      Documents
                    </InputLabel>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="documents"
                      name="documents"
                      className={classes.fileInput}
                      onChange={e => {
                        setFile(e.target.files[0])
                        handleChange(e)
                      }}
                    />
                    <Button
                      className={classes.addFileButton}
                      color="primary"
                      onClick={e => clickInput(e, 'file')}
                      disabled={!!file}
                    >
                      <label
                        htmlFor={'documents'}
                        className={classes.fileInputLabel}
                        aria-label={'ATTACH FILE'}
                        title={'ATTACH FILE'}
                      >
                        + Add document file
                      </label>
                    </Button>
                    {file ? (
                      <div className={classes.chosenFile}>
                        <Typography
                          variant="h5"
                          className={classes.documentName}
                        >
                          {file.name}
                        </Typography>
                        <Button
                          className={classes.eraseButton}
                          onClick={() => {
                            setFile(null)
                            fileInputRef.current.value = null
                          }}
                        >
                          X
                        </Button>
                      </div>
                    ) : null}
                    {oldFiles && oldFiles[0]
                      ? oldFiles.map(el => (
                          <div key={Math.random()} className={classes.document}>
                          <Typography
                              variant="h5"
                              className={classes.documentName}
                            >
                              {el.name.substr(el.name.indexOf('-') + 1)}
                            </Typography>
                          <Button
                              color="secondary"
                              className={classes.deleteButton}
                              onClick={e => deleteHandler(el, 'document')}
                            >
                              <img alt="delete icon" src={DeleteButton} />
                            </Button>
                        </div>
                        ))
                      : null}
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel
                      className={classes.inputLabel}
                      shrink
                      htmlFor="photos"
                    >
                      Photos
                    </InputLabel>
                    <input
                      ref={photoInputRef}
                      type="file"
                      id="photos"
                      name="photos"
                      className={classes.fileInput}
                      onChange={e => {
                        setPhoto(e.target.files[0])
                        handleChange(e)
                      }}
                    />
                    <Button
                      className={classes.addFileButton}
                      color="primary"
                      onClick={e => clickInput(e, 'photo')}
                      disabled={!!photo}
                    >
                      <label
                        htmlFor={'photos'}
                        className={classes.fileInputLabel}
                        aria-label={'ATTACH FILE'}
                        title={'ATTACH FILE'}
                      >
                        + Add photo file
                      </label>
                    </Button>
                    {photo ? (
                      <div className={classes.chosenFile}>
                        <Typography
                          variant="h5"
                          className={classes.documentName}
                        >
                          {photo.name}
                        </Typography>
                        <Button
                          className={classes.eraseButton}
                          onClick={() => {
                            setPhoto(null)
                            photoInputRef.current.value = null
                          }}
                        >
                          X
                        </Button>
                      </div>
                    ) : null}
                    {oldPhotos && oldPhotos[0]
                      ? oldPhotos.map(el => (
                          <div key={Math.random()} className={classes.document}>
                          <Typography
                              variant="h5"
                              className={classes.documentName}
                            >
                              {el.name.substr(el.name.indexOf('-') + 1)}
                            </Typography>
                          <Button
                              color="secondary"
                              className={classes.deleteButton}
                              onClick={e => deleteHandler(el, 'photo')}
                            >
                              <img alt="delete icon" src={DeleteButton} />
                            </Button>
                        </div>
                        ))
                      : null}
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel
                      className={classes.inputLabel}
                      shrink
                      htmlFor="videos"
                    >
                      Videos
                    </InputLabel>
                    <input
                      ref={videoInputRef}
                      type="file"
                      id="videos"
                      name="videos"
                      className={classes.fileInput}
                      onChange={e => {
                        setVideo(e.target.files[0])
                        handleChange(e)
                      }}
                    />
                    <Button
                      className={classes.addFileButton}
                      color="primary"
                      onClick={e => clickInput(e, 'video')}
                      disabled={!!video}
                    >
                      <label
                        htmlFor={'videos'}
                        className={classes.fileInputLabel}
                        aria-label={'ATTACH FILE'}
                        title={'ATTACH FILE'}
                      >
                        + Add video file
                      </label>
                    </Button>
                    {video ? (
                      <div className={classes.chosenFile}>
                        <Typography
                          variant="h5"
                          className={classes.documentName}
                        >
                          {video.name}
                        </Typography>
                        <Button
                          className={classes.eraseButton}
                          onClick={() => {
                            setVideo(null)
                            photoInputRef.current.value = null
                          }}
                        >
                          X
                        </Button>
                      </div>
                    ) : null}
                    {oldVideos && oldVideos[0]
                      ? oldVideos.map(el => (
                          <div key={Math.random()} className={classes.document}>
                          <Typography
                              variant="h5"
                              className={classes.documentName}
                            >
                              {el.name.substr(el.name.indexOf('-') + 1)}
                            </Typography>
                          <Button
                              color="secondary"
                              className={classes.deleteButton}
                              onClick={e => deleteHandler(el, 'video')}
                            >
                              <img alt="delete icon" src={DeleteButton} />
                            </Button>
                        </div>
                        ))
                      : null}
                  </Grid>
                </>
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
                        !!touched.contactPersonFullName &&
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
              <Button
                className={classes.saveButton}
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
