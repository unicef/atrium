import React, { useEffect, useState } from 'react'
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
                      onClick={e => clickInput(e,'image')}
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
                      onClick={e => clickInput(e,'file')}
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
                              {el.substr(el.indexOf('-') + 1)}
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
                              {el.substr(el.indexOf('-') + 1)}
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
                      onClick={e => clickInput(e,'video')}
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
                              {el.substr(el.indexOf('-') + 1)}
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
