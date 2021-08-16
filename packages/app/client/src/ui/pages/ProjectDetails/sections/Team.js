import React from 'react'
import Grid from '@material-ui/core/Grid'
import { refreshToken } from '../../../../actions/authActions'
import { deleteMemberFromProject } from '../../../../actions/projectActions'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { Button, Divider } from '../../../atoms'
import { MembersModal, SECTIONS_NAME, SECTIONS_ID } from '../components'
import { Trash } from '../../../assets'
import { UserInformation, FormTitle } from '../components'

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
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '130%',
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.black,
    marginBottom: '15px 0 39px'
  },
  teamSubtitle: {
    fontSize: '22px',
    fontFamily: theme.typography.fontFamily
  },
  subtitle: {
    margin: '5% 0 3% 0',
    fontSize: '22px',
    fontFamily: theme.typography.fontFamily
  },
  top: {
    margin: '5% 0 3% 0',
    display: 'flex',
    alignItems: 'center'
  },
  deleteButton: {
    width: '22px',
    height: '22px',
    minWidth: 0,
    margin: 0,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  bottomButtons: {
    margin: '5% 0'
  },
  saveButton: {
    marginRight: '2%'
  },
  addMemberRow: {
    marginBottom: '15px',
    marginTop: '30px'
  }
}))

function Team(props) {
  const classes = useDefaultStyles()

  const cancelHandler = () => {
    window.location.reload()
  }
  const clickHandler = () => {
    window.location.reload()
  }
  
  const [team, setTeam] = React.useState(props.team)

  const deleteHandler = async memberId => {
    setTeam(team.filter(user => user.id !== memberId))
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
    <Grid item container xs={12}>
      <FormTitle id={SECTIONS_ID[SECTIONS_NAME.TEAM_DETAILS]} >{SECTIONS_NAME.TEAM_DETAILS}</FormTitle>
      <Typography className={classes.descriptionText}>
        Give a shoutout to all the team members of this project by adding their details.
      </Typography>

      <FormTitle>Contact person</FormTitle>
      <Grid item xs={12}>
        {props.contactPerson ? (
          <UserInformation mode="page" user={props.contactPerson} />
        ) : null}
      </Grid>

      <Grid container item xs={12} spacing={1}>
        <Grid container item xs={12} justify="space-between" className={classes.addMemberRow}>
          <Typography
            color="secondary"
            className={classes.teamSubtitle}
            variant="subtitle1"
          >
            Team members
          </Typography>
          <Button
            onClick={handleOpen}
            color="primary"
          >
            + Add members
          </Button>
        </Grid>

        
        {team && team.map(member => (
          <Grid item xs={12}>
            <UserInformation mode="page" key={Math.random()} user={member}>
              <Button
                onClick={() => deleteHandler(member._id)}
                color="secondary"
                className={classes.deleteButton}
              >
                <img alt="delete icon" src={Trash} />
              </Button>
            </UserInformation>
          </Grid>
        ))}

        <MembersModal
          projectId={props._id}
          team={team}
          setTeam={setTeam}
          open={open}
          setOpen={setOpen}
          onClose={handleClose}
        />
      </Grid>
      <Divider mt="25px" mb="28px" />
    </Grid>
  )
}

Team.propTypes = {
  refreshToken: PropTypes.func.isRequired,
  deleteMemberFromProject: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => (
  {
    ...state.projects.selectedProject,
    auth: state.auth
  }
)

export default compose(
  connect(mapStateToProps, { refreshToken, deleteMemberFromProject })
)(Team)
