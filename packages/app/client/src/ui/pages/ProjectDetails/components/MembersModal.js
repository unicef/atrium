import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import makeStyles from '@material-ui/core/styles/makeStyles'
import UserInformation from './UserInformation'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { addMembersToProject } from '../../../../actions/projectActions'
import { refreshToken } from '../../../../actions/authActions'
import { compose } from 'recompose'
import { connect, useSelector } from 'react-redux'
import { getFilteredUsers as getFilteredUsersActions } from '../../../../actions/authActions'
import { CommonModal, Button } from '../../../atoms'
import { SearchBar } from '../../../molecules'
import { getUserId } from '../../../../selectors'
import { Email } from '../../../assets'

const useDefaultStyles = makeStyles(theme => ({
  wrapper: {
    padding: '5%',
    textAlign: 'center'
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  descriptionText: {
    margin: '5% 0',
    fontSize: 18,
    textAlign: 'center'
  },
  usersList: {
    width: '90%',
    maxHeight: '207px',
    height: '207px',
    margin: 'auto',
    overflowY: 'scroll'
  },
  conditionButton: {
    width: '76px',
    height: '28px',
    borderRadius: '15px',
    margin: '0 0 0 0',
    border: '1px solid #E63232'
  },
  inviteSection: {
    borderTop: '1.6px solid #E7E7E7',
    paddingTop: '15px',
    width: '90%',
    margin: '0 5%',
    display: 'flex',
    alignItems: 'center'
  },
  inviteButton: {
    width: '39px',
    height: '39px',
    borderRadius: '50%',
    margin: 0,
    minWidth: 0
  },
  rightPart: {
    display: 'flex',
    width: '80%',
    alignItems: 'center',
    marginLeft: '3%'
  },
  emailImage: {
    width: '19px',
    height: '17px',
    margin: '0 4% 0 0'
  },
  sendInvite: {
    width: '52px',
    height: '28px',
    color: 'black',
    margin: '0 0 0 5%',
    borderRadius: '15px',
    border: '1px solid #202625'
  },
  errorText: {
    color: '#E63232',
    margin: '2% 0',
    fontSize: '13px',
    textAlign: 'left'
  },
  errorPlace: {
    marginBottom: '-25px'
  }
}))

function MembersModal(props) {
  const [users, setUsers] = useState([])
  const classes = useDefaultStyles()
  const { open, onClose, setOpen, projectId, team, setTeam } = props
  const [addState, setAddState] = useState({})
  const [openEmail, setOpenEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [count, setCount] = useState(0)
  const [error, setError] = useState(false)
  const [userError, setUserError] = useState(false)
  const userId = useSelector(getUserId)

  const filtering = user => {
    if (user.id === userId) return false
    if (!Array.isArray(team)) return true
    return team.findIndex(member => user._id === member._id) === -1
  }

  const handleChange = async e => {
    if (e.target.value !== '') {
      const result = await props.getFilteredUsers(e.target.value)
      const filteredUsers = result.data.users.filter(filtering)
      setUsers(filteredUsers)
      setUserError(filteredUsers.length === 0)
      return
    }

    setUsers([])
  }

  const clickHandler = async userId => {
    const tmp = { ...addState }
    tmp[userId] = !addState[userId]
    if (tmp[userId]) setCount(count + 1)
    else setCount(count - 1)
    await setAddState(tmp)
  }

  const submitHandler = async () => {
    const usersToAdd = Object.keys(addState).filter(memberId => addState[memberId])
    const populatedUsers = users.filter(user => usersToAdd.includes(user._id))
    setTeam([...team, ...populatedUsers])
    await props.addMembersToProject(projectId, usersToAdd)
    props.refreshToken()
    setOpen(false)
  }

  return (
    <CommonModal
      open={open}
      onClose={() => {
        onClose()
        setOpenEmail(false)
        setUsers([])
      }}
    >
      <div className={classes.wrapper}>
        <Typography className={classes.header} variant="h3" color="secondary">
          Add team member
        </Typography>
        <Typography component="h5" className={classes.descriptionText}>
          Choose collaborators that you trust. Each member needs to have an
          Atrium account. Include the address associated with their login so we
          can confirm them.
        </Typography>
        <SearchBar placeholder="Search" onChange={handleChange} />
        <div className={classes.usersList}>
          {!userError ? (
            users.map((member, i) => (
              <UserInformation
                mode={i === users.length - 1 ? 'lastInModal' : 'modal'}
                key={member._id}
                user={member}
              >
                <div>
                  {addState[member._id] ? (
                    <Button
                      color="secondary"
                      className={classes.conditionButton}
                      onClick={() => clickHandler(member._id)}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      color="secondary"
                      className={classes.conditionButton}
                      onClick={() => clickHandler(member._id)}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </UserInformation>
            ))
          ) : (
            <Typography variant="body2" className={classes.errorText}>
              No such user exists or it has already been added to your team
            </Typography>
          )}
        </div>
        <div className={classes.inviteSection}>
          <Button
            color="primary"
            className={classes.inviteButton}
            onClick={() => {
              setOpenEmail(!openEmail)
              setError(false)
            }}
          >
            +
          </Button>
          {openEmail ? (
            <div className={classes.rightPart}>
              <div style={{ width: '100%' }}>
                <OutlinedInput
                  placeholder="@atrium.com"
                  fullWidth
                  onChange={e => {
                    setEmail(e.target.value)
                    if (
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                        e.target.value
                      ) ||
                      e.target.value.length === 0
                    )
                      setError(false)
                    else setError(true)
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <img
                        className={classes.emailImage}
                        src={Email}
                        alt="Email image"
                      />
                    </InputAdornment>
                  }
                />
                {error ? (
                  <Typography
                    variant="body2"
                    className={[classes.errorText, classes.errorPlace].join(
                      ' '
                    )}
                  >
                    Wrong email
                  </Typography>
                ) : null}
              </div>
              <Button
                type="submit"
                color="secondary"
                disabled={error}
                className={classes.sendInvite}
                onClick={() => (document.location.href = `mailto:${email}`)}
              >
                Invite
              </Button>
            </div>
          ) : (
            <div className={classes.rightPart}>
              <img
                className={classes.emailImage}
                src={Email}
                alt="Email image"
              />
              <Typography variant="body1">
                Not listed above invite by email address...
              </Typography>
            </div>
          )}
        </div>
        {count === 0 ? null : (
          <Button color="primary" onClick={submitHandler}>
            Add {count} members
          </Button>
        )}
      </div>
    </CommonModal>
  )
}

export default compose(
  connect(null, {
    getFilteredUsers: getFilteredUsersActions,
    refreshToken,
    addMembersToProject
  })
)(MembersModal)
