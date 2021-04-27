import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { TextField, Button } from '../../../../ui'
import { Formik } from 'formik'
import { useHistory } from 'react-router-dom'

const useDefaultStyles = makeStyles(theme => ({
  wrapper: {
    width: '50%',
    height: '100%',
    paddingTop: '5%'
  },
  counter: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '-40px 0 3% 0',
    paddingRight: '10px',
    color: '#636767',
    fontSize: 13
  },
  header: {
    textAlign: 'left'
  },
  descriptionText: {
    margin: '5% 0',
    paddingRight: '25%',
    fontSize: 18
  },
  button: {
    marginTop: '2%',
    width: '100%'
  },
  disabledButton: {
    marginBottom: '2%',
    width: '100%',
    height: '50px',
    alignItems: 'left',
    backgroundColor: '#F2F2F2',
    textTransform: 'none'
  },
  inputs: {
    marginBottom: '3%'
  },
  bottomButtons: {
    marginTop: '5%'
  },
  saveButton: {
    marginRight: '2%'
  }
}))

const validateProjectForm = values => {
  const errors = {}

  return errors
}

function StoryForm(props) {
  const classes = useDefaultStyles()
  const [characters, setCharacters] = useState(0)
  const [challengeCharacters, setChallengeCharacters] = useState(0)

  const [story, setStory] = useState(false)
  const [challenges, setChallenges] = useState(false)
  const [benefits, setBenefits] = useState(false)
  const [needs, setNeeds] = useState(false)
  const [section, setSection] = useState(false)
  const history = useHistory()

  const cancelHandler = () => {
    history.push('/projects')
  }

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
                variant="h3"
                color="secondary"
              >
                Edit story
              </Typography>
              <Typography component="h5" className={classes.descriptionText}>
                Tell people why they should be excited about your project. Get
                specific but be clear and be brief.
                <Link href="#"> need help?</Link>
              </Typography>
            </div>
            <div>
              {story ? (
                <>
                  <TextField
                    onChange={e => {
                      handleChange(e)
                      setCharacters(e.target.value.length)
                    }}
                    id="story"
                    name="story"
                    className={classes.inputs}
                    multiline={true}
                    onBlur={handleBlur}
                    defaultValue={values.story}
                    placeholder="1. Write Story"
                    variant="outlined"
                    rows="10"
                    fullWidth
                  />
                  <Typography variant="body1" className={classes.counter}>
                    {characters}/250
                  </Typography>
                </>
              ) : (
                <Button
                  onClick={() => setStory(!story)}
                  className={classes.button}
                  color="secondary"
                  variant="outlined"
                >
                  + Talk about the project
                </Button>
              )}
            </div>
            <div>
              {challenges ? (
                <>
                  <TextField
                    onChange={e => {
                      handleChange(e)
                      setChallengeCharacters(e.target.value.length)
                    }}
                    id="challenges"
                    name="challenges"
                    className={classes.inputs}
                    variant="outlined"
                    onBlur={handleBlur}
                    defaultValue={values.challenges}
                    placeholder="1. Write Challenges"
                    multiline={true}
                    rows="10"
                    fullWidth
                  />
                  <Typography variant="body1" className={classes.counter}>
                    {challengeCharacters}/250
                  </Typography>
                </>
              ) : (
                <Button
                  onClick={() => setChallenges(!challenges)}
                  className={classes.button}
                  color="secondary"
                  variant="outlined"
                >
                  + Add Challenges
                </Button>
              )}
            </div>
            <div>
              {benefits ? (
                <>
                  <TextField
                    className={classes.inputs}
                    id="benefits"
                    name="benefits"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.benefits}
                    placeholder="1. Write Benefits"
                    multiline={true}
                    rows="10"
                    fullWidth
                  />
                </>
              ) : (
                <Button
                  onClick={() => setBenefits(!benefits)}
                  className={classes.button}
                  color="secondary"
                  variant="outlined"
                >
                  + Add Benefits
                </Button>
              )}
            </div>
            <div>
              {needs ? (
                <>
                  <TextField
                    id="needs"
                    name="needs"
                    className={classes.inputs}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.needs}
                    placeholder="1. Write Needs"
                    multiline={true}
                    rows="10"
                    fullWidth
                  />
                </>
              ) : (
                <Button
                  onClick={() => setNeeds(!needs)}
                  className={classes.button}
                  color="secondary"
                  variant="outlined"
                >
                  + Add Needs
                </Button>
              )}
            </div>
            <div>
              {section ? (
                <>
                  <TextField
                    id="section"
                    name="section"
                    className={classes.inputs}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.section}
                    variant="outlined"
                    placeholder="1. Write Section"
                    multiline={true}
                    rows="10"
                    fullWidth
                  />
                </>
              ) : (
                <Button
                  onClick={() => setSection(!section)}
                  className={classes.button}
                  color="secondary"
                  variant="outlined"
                >
                  + Add Section
                </Button>
              )}
            </div>
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

export default StoryForm
