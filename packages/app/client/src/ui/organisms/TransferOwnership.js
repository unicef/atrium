import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Button, CommonModal } from '../atoms'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { getFilteredUsers as getFilteredUsersActions } from '../../actions/authActions'
import { useProjectsAsyncActions } from '../hooks'
import { UserInformationRow, SearchBar } from '../molecules'

const useStyles = makeStyles(() => ({
  transferOwnership: {
    width: '139px',
    height: '42px'
  },
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
  errorText: {
    color: '#E63232',
    margin: '2% 0',
    fontSize: '13px',
    textAlign: 'left'
  }
}))

function TransferOwnership({ id, ...props }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [userError, setUserError] = useState(false)
  const [userToTransfer, setUserToTransfer] = useState(null)
  const { transferOwnership } = useProjectsAsyncActions()

  const handleChange = async e => {
    const result = await props.getFilteredUsers(e.target.value)
    const filteredUsers = result.data.users
    setUsers(filteredUsers)
    setUserError(filteredUsers.length < 1)
  }

  const clickHandler = async user => {
    setUserToTransfer(user)
  }

  const submitHandler = async () => {
    await transferOwnership(id, userToTransfer._id)
    setOpen(false)
  }

  return (
    <>
      <Button
        className={classes.transferOwnership}
        color="primary"
        variant="outlined"
        onClick={() => setOpen(true)}
      >
        Transfer ownership
      </Button>
      <CommonModal
        open={open}
        onClose={() => {
          setOpen(false)
          setUsers([])
        }}
      >
        <div className={classes.wrapper}>
          <Typography component="h5" className={classes.descriptionText}>
            Choose person who will be a new owner of this project
          </Typography>
          <SearchBar placeholder="Search" onChange={handleChange} />
          <div className={classes.usersList}>
            {!userError ? (
              userToTransfer ? (
                <UserInformationRow
                  mode={'lastInModal'}
                  key={Math.random()}
                  user={userToTransfer}
                >
                  <div>
                    <Button
                      color="primary"
                      className={classes.conditionButton}
                      onClick={() => setUserToTransfer(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </UserInformationRow>
              ) : (
                users.map((member, i) => (
                  <UserInformationRow
                    mode={i === users.length - 1 ? 'lastInModal' : 'modal'}
                    key={Math.random()}
                    user={member}
                  >
                    <div>
                      <Button
                        color="secondary"
                        className={classes.conditionButton}
                        onClick={() => clickHandler(member)}
                      >
                        Transfer
                      </Button>
                    </div>
                  </UserInformationRow>
                ))
              )
            ) : (
              <Typography variant="body2" className={classes.errorText}>
                No such user exists or it has already been added to your team
              </Typography>
            )}
          </div>
          <Button
            color="primary"
            onClick={submitHandler}
            disabled={!userToTransfer}
          >
            Transfer Ownership
          </Button>
        </div>
      </CommonModal>
    </>
  )
}

export default compose(
  connect(null, {
    getFilteredUsers: getFilteredUsersActions
  })
)(TransferOwnership)
