import React from 'react'
import { Formik } from 'formik'

import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Select from '@material-ui/core/Select'
import { Button } from '../../../../ui'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

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
  bigSelects: {
    borderRadius: '3px',
    width: '100%',
    fontSize: 12,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium
  },
  selects: {
    borderRadius: '3px',
    width: '60%',
    fontSize: 12,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium
  },
  selectDiv: {
    width: '60%'
  },
  monthSelect: {
    width: '67%',
    marginRight: '3%'
  },
  yearSelect: {
    width: '30%'
  },
  inputLabel: {
    color: 'black',
    margin: '3% 0 1% 0'
  },
  chooseSelect: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: 15,
    color: 'grey'
  }
}))

const validateProjectForm = values => {
  const errors = {}

  return errors
}

function AdditionalInformationForm(props) {
  const classes = useDefaultStyles()

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
                component="h1"
                variant="h2"
                color="secondary"
              >
                Edit additional information
              </Typography>
              <Typography component="h5" className={classes.descriptionText}>
                Your project can now be shared with the world. Add more
                information to reach more people. You can edit this data at any
                point
                <Link href="#"> need help?</Link>
              </Typography>
            </div>
            <div>
              <InputLabel
                className={classes.inputLabel}
                shrink
                htmlFor="country"
              >
                Country
              </InputLabel>
              <Select
                className={classes.bigSelects}
                id="country"
                name="country"
                displayEmpty
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.country}
                variant="outlined"
              >
                <MenuItem value="">
                  <em className={classes.chooseSelect}>Choose</em>
                </MenuItem>
                <MenuItem value="FirstCountry">FirstCountry</MenuItem>
                <MenuItem value="SecondCountry">SecondCountry</MenuItem>
                <MenuItem value="ThirdCountry">ThirdCountry</MenuItem>
              </Select>
            </div>
            <div>
              <InputLabel
                className={classes.inputLabel}
                shrink
                htmlFor="organization"
              >
                Organization
              </InputLabel>
              <Select
                className={classes.bigSelects}
                name="organization"
                id="organization"
                displayEmpty
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.organization}
                variant="outlined"
              >
                <MenuItem value="">
                  <em className={classes.chooseSelect}>Choose</em>
                </MenuItem>
                <MenuItem value="FirstOrganization">FirstOrganization</MenuItem>
                <MenuItem value="SecondOrganization">
                  SecondOrganization
                </MenuItem>
                <MenuItem value="ThirdOrganization">ThirdOrganization</MenuItem>
              </Select>
            </div>
            <div className={classes.selectDiv}>
              <InputLabel
                className={classes.inputLabel}
                shrink
                htmlFor="launchDateMonth"
              >
                Target launch date
              </InputLabel>
              <Select
                className={classes.monthSelect}
                name="launchDateMonth"
                id="launchDateMonth"
                displayEmpty
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.launchDateMonth}
                variant="outlined"
              >
                <MenuItem value="">
                  <em className={classes.chooseSelect}>Choose month</em>
                </MenuItem>
                <MenuItem value="January">January</MenuItem>
                <MenuItem value="February">February</MenuItem>
                <MenuItem value="March">March</MenuItem>
              </Select>
              <Select
                className={classes.yearSelect}
                name="launchDateYear"
                id="launchDateYear"
                displayEmpty
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.launchDateYear}
                variant="outlined"
              >
                <MenuItem value="">
                  <em className={classes.chooseSelect}>2021</em>
                </MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
              </Select>
            </div>
            <div>
              <InputLabel
                className={classes.inputLabel}
                shrink
                htmlFor="numberOfNodes"
              >
                Number of nodes
              </InputLabel>
              <Select
                className={classes.selects}
                id="numberOfNodes"
                name="numberOfNodes"
                displayEmpty
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.numberOfNodes}
                variant="outlined"
              >
                <MenuItem value="">
                  <em className={classes.chooseSelect}>Choose</em>
                </MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </Select>
            </div>
            <div>
              <InputLabel
                className={classes.inputLabel}
                shrink
                htmlFor="license"
              >
                License
              </InputLabel>
              <Select
                className={classes.selects}
                name="license"
                id="license"
                displayEmpty
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.license}
                variant="outlined"
              >
                <MenuItem value="">
                  <em className={classes.chooseSelect}>Choose</em>
                </MenuItem>
                <MenuItem value="FirstLicense">FirstLicense</MenuItem>
                <MenuItem value="SecondLicense">SecondLicense</MenuItem>
                <MenuItem value="ThirdLicense">ThirdLicense</MenuItem>
              </Select>
            </div>
            <div>
              <Button color="primary" type="submit">Save</Button>
              <Button color="secondary" variant="outlined" >Cancel</Button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default AdditionalInformationForm
