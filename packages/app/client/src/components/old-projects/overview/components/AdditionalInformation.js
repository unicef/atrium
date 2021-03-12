import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
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
    fontSize: 18,
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
    width: '60%',
  },
  monthSelect: {
    width: '67%',
    marginRight: '3%'
  },
  yearSelect: {
    width: '30%',
  },
  inputLabel: {
    color: 'black',
    margin: '3% 0 1% 0',
  },
  chooseSelect: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: 15,
    color: 'grey'
  },
}))

function AdditionalInformation(props) {
  const classes = useDefaultStyles()

  return (
    <div className={classes.wrapper}>
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
          Your project can now be shared with the world. Add more information to
          reach more people. You can edit this data at any point
          <Link href="#"> need help?</Link>
        </Typography>
      </div>
      <div>
        <InputLabel className={classes.inputLabel} shrink id="country-label">
          Country
        </InputLabel>
        <Select
          className={classes.bigSelects}
          labelId="country-label"
          id="country-name"
          displayEmpty
          variant="outlined"
          defaultValue=""
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
          id="organization-label"
        >
          Organization
        </InputLabel>
        <Select
          className={classes.bigSelects}
          labelId="organization-label"
          id="organization-name"
          displayEmpty
          variant="outlined"
          defaultValue=""
        >
          <MenuItem value="">
            <em className={classes.chooseSelect}>Choose</em>
          </MenuItem>
          <MenuItem value="FirstOrganization">FirstOrganization</MenuItem>
          <MenuItem value="SecondOrganization">SecondOrganization</MenuItem>
          <MenuItem value="ThirdOrganization">ThirdOrganization</MenuItem>
        </Select>
      </div>
      <div className={classes.selectDiv}>
        <InputLabel
          className={classes.inputLabel}
          shrink
          id="launch-date-label"
        >
          Target launch date
        </InputLabel>
        <Select
          className={classes.monthSelect}
          labelId="launch-date-label"
          id="launch-date-name"
          displayEmpty
          variant="outlined"
          defaultValue=""
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
          labelId="launch-date-label"
          id="launch-date-name"
          displayEmpty
          variant="outlined"
          defaultValue=""
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
          id="number-of-nodes-label"
        >
          Number of noodes
        </InputLabel>
        <Select
          className={classes.selects}
          labelId="number-of-nodes-label"
          id="number-of-nodes-name"
          displayEmpty
          variant="outlined"
          defaultValue=""
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
        <InputLabel className={classes.inputLabel} shrink id="license-label">
          License
        </InputLabel>
        <Select
          className={classes.selects}
          labelId="license-label"
          id="license-name"
          displayEmpty
          variant="outlined"
          defaultValue=""
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
        <Button>Save</Button>
        <Button>Cancel</Button>
      </div>
    </div>
  )
}

export default AdditionalInformation
