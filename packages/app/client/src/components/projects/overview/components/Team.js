import React from 'react'
import Container from '@material-ui/core/Container'
import { refreshToken } from '../../../../actions/authActions'
import { deleteMemberFromProject } from '../../../../actions/projectActions'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { Button } from '../../../../ui'
import { useHistory } from 'react-router-dom'
import TeamMembersModal from '../modals/TeamMembersModal'
import { DeleteButton } from '../assets'
import PersonInformation from './PersonInformation'

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
  top: {
    margin: '5% 0 3% 0',
    display: 'flex',
    alignItems: 'center'
  },
  memberButton: {
    margin: '0 0 0 52%'
  },
  deleteButton: {
    width: '22px',
    height: '22px',
    minWidth: 0,
    margin: 0
  },
  bottomButtons: {
    marginTop: '5%'
  },
  saveButton: {
    marginRight: '2%'
  }
}))

function Team(props) {
  const classes = useDefaultStyles()

  const history = useHistory()
  const cancelHandler = () => {
    history.push('/projects')
  }
  const clickHandler = () => {
    window.location.reload()
  }

  const deleteHandler = async memberId => {
    await props.deleteMemberFromProject(props._id, memberId)
    props.refreshToken()
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
            <PersonInformation mode="page" user={props.contactPerson} />
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
            <TeamMembersModal
              projectId={props._id}
              team={props.team}
              open={open}
              setOpen={setOpen}
              onClose={handleClose}
            />
          </div>
          {props.team.map(member => (
            <PersonInformation mode="page" key={Math.random()} user={member}>
              <Button
                onClick={() => deleteHandler(member._id)}
                color="secondary"
                className={classes.deleteButton}
              >
                <img alt="delete icon" src={DeleteButton} />
              </Button>
            </PersonInformation>
          ))}
        </div>
        <div className={classes.bottomButtons}>
          <Button
            className={classes.saveButton}
            color="primary"
            onClick={clickHandler}
          >
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
  refreshToken: PropTypes.func.isRequired,
  deleteMemberFromProject: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  connect(mapStateToProps, { refreshToken, deleteMemberFromProject })
)(Team)
