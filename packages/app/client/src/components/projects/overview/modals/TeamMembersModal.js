import React, { useState } from 'react'
import CommonModal from '../../../../ui/atoms/CommonModal'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { SearchBar } from '../../../../ui'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { getFilteredUsers as getFilteredUsersActions } from '../../../../actions/authActions'

const useDefaultStyles = makeStyles(theme => ({
  wrapper: {
    padding: '5%',
    justifyContent: 'center'
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
  personInfo: {
    borderBottom: '1.6px solid #E7E7E7',
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
}))

function TeamMembersModal(props) {
  const [users, setUsers] = useState([])
  const classes = useDefaultStyles()
  const { open, onClose } = props
  // const [count, setCount] = useState(0)

  const handleChange = async e => {
    const filteredUsers = await props.getFilteredUsers(e.target.value)
    setUsers(filteredUsers.data.users)
    // setCount(count+1)
  }

  return (
    <CommonModal open={open} onClose={onClose}>
      <div className={classes.wrapper}>
        <Typography className={classes.header} variant="h3" color="secondary">
          Add team member
        </Typography>
        <Typography component="h5" className={classes.descriptionText}>
          Choose collaborators that you trust. Each member needs to have an
          Atrium account. Include the address associated with their login so we
          can confirm them.
        </Typography>
        <SearchBar placeholder="start" onChange={handleChange} />
        {users.map(member => (
          <div className={classes.personInfo}>
            <img className={classes.avatar} alt="Avatar" src={member.avatar} />
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
    </CommonModal>
  )
}

export default compose(
  connect(null, { getFilteredUsers: getFilteredUsersActions })
)(TeamMembersModal)
