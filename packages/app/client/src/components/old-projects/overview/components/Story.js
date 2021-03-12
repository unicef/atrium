import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { TextField } from '../../../../ui'
import Grid from '@material-ui/core/Grid'

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
    paddingRight: '25%',
    fontSize: 18
  },
  button: {
    marginTop: '2%',
    width: '100%',
    color: '#15B54A',
    border: '1.2px solid',
    textTransform: 'none',
    borderColor: '#15B54A'
  },
  inputs: {
    marginBottom: '3%'
  }
}))
function Story(props) {
  const classes = useDefaultStyles()
  const [challengeCharacters, setChallengeCharacters] = useState(0)

  const [characters, setCharacters] = useState(0)

  return (
    <div className={classes.wrapper}>
      <div>
        <Typography
          className={classes.header}
          component="h1"
          variant="h2"
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
        {/* <Button>Talk about the project</Button>*/}
        <TextField
          onChange={e => {
            setCharacters(e.target.value.length)
          }}
          className={classes.inputs}
          multiline={true}
          variant="outlined"
          rows="10"
          fullWidth
        />
        <div>{characters}/250</div>
      </div>
      <div>
        {/* <Button>+ Challenges</Button>*/}
        <TextField
          onChange={e => {
            setChallengeCharacters(e.target.value.length)
          }}
          className={classes.inputs}
          variant="outlined"
          placeholder="1. Write Challenges"
          multiline={true}
          rows="10"
          fullWidth
        />
        <div>{challengeCharacters}/250</div>
      </div>
      <div>
        <Button className={classes.button}>
          + Add Benefits
        </Button>
      </div>
      <div>
        <Button className={classes.button}>
          + Add Needs
        </Button>
      </div>
      <div>
        <Button className={classes.button}>
          + Add Section
        </Button>
      </div>
      <div>
        <Button>Save</Button>
        <Button>Cancel</Button>
      </div>
    </div>
  )
}

export default Story
