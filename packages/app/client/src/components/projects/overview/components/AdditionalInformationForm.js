import React from 'react'
import { Formik } from 'formik'

import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Select from '@material-ui/core/Select'
import { Button, TextField } from '../../../../ui'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { AGENCIES_LIST } from '../../../../unin-constants'
import { getNames } from 'country-list'

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
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: 15,
    color: 'grey'
  },
  bottomButtons: {
    margin: '5% 0'
  },
  saveButton: {
    marginRight: '2%'
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

  const cancelHandler = () => {
    window.location.reload()
  }

  const years = []
  for (
    let i = new Date().getFullYear();
    i < new Date().getFullYear() + 10;
    i++
  ) {
    years.push(i)
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
                {getNames()
                  .sort()
                  .map(country => (
                    <MenuItem key={Math.random()} value={country}>
                      {country}
                    </MenuItem>
                  ))}
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
                {AGENCIES_LIST.map(company => (
                  <MenuItem value={company.name}>{company.name}</MenuItem>
                ))}
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
                <MenuItem value="April">April</MenuItem>
                <MenuItem value="May">May</MenuItem>
                <MenuItem value="June">June</MenuItem>
                <MenuItem value="July">July</MenuItem>
                <MenuItem value="August">August</MenuItem>
                <MenuItem value="September">September</MenuItem>
                <MenuItem value="October">October</MenuItem>
                <MenuItem value="November">November</MenuItem>
                <MenuItem value="December">December</MenuItem>
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
                {years.map(year => (
                  <MenuItem key={Math.random()} value={year}>
                    {year}
                  </MenuItem>
                ))}
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
            <InputLabel
              className={classes.inputLabel}
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
              className={classes.inputLabel}
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

export default AdditionalInformationForm
