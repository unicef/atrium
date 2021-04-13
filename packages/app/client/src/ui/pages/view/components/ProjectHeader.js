import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { StandardVerticalTemplate } from '../../../templates'
import { Button } from '../../../atoms'
import { BackArrow } from '../../../molecules'
import makeStyles from '@material-ui/core/styles/makeStyles'
//impor } from '../../overview/assets'
import {Cloud, Flag, Like} from "../assets";

const useStyles = makeStyles(theme => ({
  image: {
    width: '969px',
    height: '386px',
    borderRadius: '5px',
    margin: '2% 0 5% 0'
  },
  headerButton: {
    width: '203px',
    margin: '0 0 5% 0'
  },
  projectInfo: {
    margin: '3% 0 6% 0'
  },
  personInfo: {
    height: '60px',
    display: 'flex',
    width: '258px',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3%'
  },
  personFullName: {
    fontSize: '17px',
    marginBottom: '2%',
    textAlign: 'left'
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    marginRight: '4%'
  },
  buttonImage: {
    marginRight: '5%'
  }
}))

function ProjectHeader(props) {
  const classes = useStyles()
  const contactPerson = props.contactPerson || {}
  const team = props.team || []
  return (
    <>
      <BackArrow dest={'/view-projects'} />
      <Grid item xs={12}>
        <img
          src={props.attachment}
          alt="project picture"
          className={classes.image}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Typography variant="h3">{props.name}</Typography>
        <Typography variant="body1">{props.details}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1">PROJECT WEBSITE</Typography>
        <Typography
          className={classes.projectInfo}
          color="primary"
          variant="body1"
        >
          {props.websiteLink}
        </Typography>
        <Typography variant="subtitle1">PROJECT CODE</Typography>
        <Typography
          className={classes.projectInfo}
          color="primary"
          variant="body1"
        >
          {props.linkToRepository}
        </Typography>
        <Typography variant="subtitle1">CONTACT PERSON</Typography>
        <div className={classes.personInfo}>
          <div style={{ display: 'flex' }}>
            <img
              className={classes.avatar}
              alt="Avatar"
              src={contactPerson.avatar || null}
            />
            <div style={{ paddingLeft: '10px' }}>
              <Typography
                color="secondary"
                className={classes.personFullName}
                variant="subtitle1"
              >
                {contactPerson.name || null /* then + surname*/}
              </Typography>
              <Typography color="secondary" variant="body1">
                Project menager
                {/* {props.contactPerson.role}*/}
              </Typography>
              <Typography color="primary" variant="body1">
                {contactPerson.email || null}
              </Typography>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={3}>
        <Button className={classes.headerButton} color="primary">
          <img className={classes.buttonImage} src={Like} />
          <div>Liked</div>
        </Button>
        <Button
          className={classes.headerButton}
          variant="outlined"
          color="secondary"
        >
          <img className={classes.buttonImage} src={Cloud} />
          <div>Add comment</div>
        </Button>
        <Button
          className={classes.headerButton}
          variant="outlined"
          color="secondary"
        >
          <img className={classes.buttonImage} src={Flag} />
          <div>Add to Bookmarks</div>
        </Button>
        <Typography variant="subtitle1">TEAM</Typography>
        <div>
          {team.map((member, i) => {
            if (i > 4) return null
            if (i > 3) return <div>+{props.team - i}</div>
            return (
              <img
                className={classes.avatar}
                src={member.avatar}
                alt="Avatar"
              />
            )
          })}
        </div>
      </Grid>
    </>
  )
}

export default ProjectHeader
