import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import makeStyles from '@material-ui/core/styles/makeStyles'
import InputLabel from '@material-ui/core/InputLabel'
import { TextField } from '../../../../ui'
import Grid from '@material-ui/core/Grid'
import Button from "@material-ui/core/Button";

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
  inputLabel: {
    color: 'black',
    margin: '3% 0 1% 0',
  },
}))

function Updates(props) {
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
          Add Update
        </Typography>
        <Typography component="h5" className={classes.descriptionText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum
          <Link href="#"> need help?</Link>
        </Typography>
      </div>
      <div>
        <InputLabel className={classes.inputLabel} shrink id="title-label">
          Title
        </InputLabel>
        <TextField
          variant="outlined"
          placeholder="Example"
          fullWidth
          className={classes.formElement}
          labelId="title-label"
        />
      </div>
      <div>
        <InputLabel className={classes.inputLabel} shrink id="text-label">
          Text
        </InputLabel>
        <TextField
          variant="outlined"
          multiline={true}
          rows="15"
          fullWidth
          className={classes.formElement}
          labelId="text-label"
        />
      </div>
      <div>
        <Button>Save</Button>
        <Button>Cancel</Button>
      </div>
    </div>
  )
}

export default Updates
