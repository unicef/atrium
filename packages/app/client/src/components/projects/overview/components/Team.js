import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { refreshToken } from '../../../../actions/authActions'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { Button } from '../../../../ui'
import { useHistory } from 'react-router-dom'
import TeamMembersModal from "../modals/TeamMembersModal";

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
    paddingRight: '20%',
    fontSize: 18
  },
  teamSubtitle: {
    fontSize: '22px'
  },
  subtitle: {
    margin: '5% 0 3% 0',
    fontSize: '22px'
  },
  personInfo: {
    border: '1.6px solid #E7E7E7',
    borderRadius: '5px',
    height: '100px',
    display: 'flex',
    padding: '4%'
  },
  personFullName: {
    fontSize: '17px',
    marginBottom: '2%'
  },
  avatar: {
    width: '53px',
    height: '53px',
    borderRadius: '50%',
    marginRight: '2%'
  },
  top: {
    margin: '5% 0 3% 0',
    display: 'flex',
    alignItems: 'center'
  },
  memberButton: {
    margin: '0 0 0 52%'
  }
}))

function Team(props) {
  const classes = useDefaultStyles()

  const history = useHistory()
  const cancelHandler = () => {
    history.push('/view-projects')
  }
  const clickHandler = () => {
    window.location.reload()
  }

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container>
      <div className={classes.wrapper}>
        <div>
          <Typography className={classes.header} variant="h3" color="secondary">
            Edit team
          </Typography>
          <Typography component="h5" className={classes.descriptionText}>
            Tell people why they should be excited about your project. Get
            specific but be clear and be brief.
            <Link href="#"> need help?</Link>
          </Typography>
        </div>
        <div>
          <Typography
            color="secondary"
            className={classes.subtitle}
            variant="subtitle1"
          >
            Contact person
          </Typography>
          {props.contactPerson ? (
            <div className={classes.personInfo}>
              <img
                className={classes.avatar}
                alt="Avatar"
                src={props.contactPerson.avatar}
              />
              <div>
                <Typography
                  color="secondary"
                  className={classes.personFullName}
                  variant="subtitle1"
                >
                  {props.contactPerson.name /* then + surname*/}
                </Typography>
                <Typography color="secondary" variant="body1">
                  {props.contactPerson.email}
                </Typography>
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <div className={classes.top}>
            <Typography
              color="secondary"
              className={classes.teamSubtitle}
              variant="subtitle1"
            >
              Team members
            </Typography>
            <Button
              onClick={handleOpen}
              className={classes.memberButton}
              color="primary"
            >
              + Add members
            </Button>
            <TeamMembersModal open={open} onClose={handleClose} />
          </div>
          {props.team.map(member => (
            <div className={classes.personInfo}>
              <img
                className={classes.avatar}
                alt="Avatar"
                src={member.avatar}
              />
              <div>
                <Typography
                  color="secondary"
                  className={classes.personFullName}
                  variant="subtitle1"
                >
                  {member.name /* then + surname*/}
                </Typography>
                <Typography color="secondary" variant="body1">
                  {member.email}
                </Typography>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Button color="primary" onClick={clickHandler}>
            Save
          </Button>
          <Button onClick={cancelHandler} color="secondary" variant="outlined">
            Cancel
          </Button>
        </div>
      </div>
    </Container>
  )
}

Team.propTypes = {
  refreshToken: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(connect(mapStateToProps, { refreshToken }))(Team)
