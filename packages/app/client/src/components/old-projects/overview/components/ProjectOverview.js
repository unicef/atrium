import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { AttachmentUploader } from '../../../../ui'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress/'
import Link from '@material-ui/core/Link'
import { ProjectPicture } from '../assets'

const useDefaultStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    paddingTop: '5%'
  },
  header: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  leftBlock: {
    width: '50%',
    paddingRight: '10%'
  },
  rightBlock: {
    paddingLeft: '5%'
  },
  descriptionText: {
    margin: '10% 0',
    fontSize: 18
  },
  card: {
    backgroundColor: '#F1F1F1',
    height: '100px',
    borderRadius: '5px',
    marginBottom: '3%',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  circle: {
    margin: '0 5%'
  },
  image: {
    margin: '5% 0'
  },
  input: {
    color: 'black',
    marginTop: '5%'
  }
}))

function ProjectOverview(props) {
  const classes = useDefaultStyles()
  return (
    <div className={classes.wrapper}>
      <div className={classes.leftBlock}>
        <Typography
          className={classes.header}
          component="h1"
          variant="h2"
          color="secondary"
        >
          Project Overview
        </Typography>
        <Typography component="h5" className={classes.descriptionText}>
          Your project can now be shared with the world. Add more information to
          reach more people. You can edit this data at any point
          <Link href="#"> need help?</Link>
        </Typography>
        <div>
          <div className={classes.card}>
            <CircularProgress
              variant="determinate"
              value={100}
              className={classes.circle}
            />
            Required information
          </div>
          <div className={classes.card}>
            <CircularProgress
              variant="determinate"
              value={100}
              className={classes.circle}
            />
            Additional information
          </div>
          <div className={classes.card}>
            <CircularProgress
              variant="determinate"
              value={100}
              className={classes.circle}
            />
            Story
          </div>
          <div className={classes.card}>
            <CircularProgress
              variant="determinate"
              value={100}
              className={classes.circle}
            />
            Team
          </div>
          <div className={classes.card}>
            <CircularProgress
              variant="determinate"
              value={100}
              className={classes.circle}
            />
            Update
          </div>
        </div>
        <div>
          <Button >Save</Button>
          <Button >Cancel</Button>
        </div>
      </div>
      <div className={classes.rightBlock}>
        <Typography
          className={classes.header}
          component="h2"
          variant="h2"
          color="secondary"
        >
          Project Photo
        </Typography>
        <div className={classes.image}><img src={ProjectPicture}/></div>
        <Typography
          className={classes.header}
          component="h2"
          variant="h2"
          color="secondary"
        >
          Documents
        </Typography>
        <AttachmentUploader
        // attachment={values.attachment}
        // setAttachment={val => setFieldValue('attachment', val)}
        />
        <Typography
          className={classes.header}
          component="h2"
          variant="h2"
          color="secondary"
        >
          Links
        </Typography>

        <InputLabel className={classes.input} id="repository-link-id" shrink>Repository link</InputLabel>
        <TextField
          id="repositoryLink"
          type="text"
          variant="outlined"
          fullWidth
          labelId="repository-link-id"
          name="repositoryLink"
          placeholder="Http://atrium.com/project1234567"
        />
        <InputLabel  className={classes.input} id="website-link-id" shrink>Project website link</InputLabel>
        <TextField
          id="websiteLink"
          type="text"
          fullWidth
          labelId="website-link-id"
          variant="outlined"
          name="websiteLink"
          placeholder="Http:// ...."
        />
      </div>
    </div>
  )
}

export default ProjectOverview
