import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import { setError } from '../../actions/errorActions'
import { CommonModal } from '../../ui/'
import { updateUserDetails, changeUserPassword } from '../../api/users'
import { UserPasswordForm } from './UserPasswordForm'
import { UserDetailsForm } from './UserDetailsForm'

const styles = theme => ({
  content: {
    padding: '40px 45px 45px 45px',
    display: 'flex',
    flexDirection: 'column'
  },
  img: {
    maxWidth: 445,
    width: '100%',
    height: 'auto',
    margin: '0 auto 36px auto'
  },
  link: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 2
  }
})

const ModalEditUser = ({
  classes,
  auth,
  open,
  onClose,
  setErrorMessage,
  ...props
}) => {
  const [isChangingPassword, setIsChangingPassword] = React.useState(false)

  // This isn't unmounted. Everytime we open it, reset to the details form
  React.useEffect(() => {
    if (open) {
      setIsChangingPassword(false)
    }
  }, [open])

  /**
   * Submit user details. Close modal if successfull
   *
   * @param {UserDetails} userDetails
   */
  const handleUpdateUserDetails = async userDetails => {
    try {
      await updateUserDetails(userDetails)
      onClose()
    } catch (err) {
      setErrorMessage(err.response)
    }
  }

  /**
   * Submit passwords to be changed
   *
   * @param {Passwords} userPassword
   */
  const handleChangeUserPassword = async userPassword => {
    try {
      await changeUserPassword(userPassword)
      onClose()
    } catch (err) {
      setErrorMessage(err.response)
    }
  }

  return (
    <CommonModal open={open} onClose={onClose}>
      <div className={classes.content}>
        {isChangingPassword ? (
          <UserPasswordForm onSubmit={handleChangeUserPassword} />
        ) : (
            <UserDetailsForm
              auth={auth}
              onSubmit={handleUpdateUserDetails}
              setIsChangingPassword={() => setIsChangingPassword(true)}
            />
          )}
      </div>
    </CommonModal>
  )
}

ModalEditUser.propTypes = {
  auth: PropTypes.object.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  classes: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  connect(mapStateToProps, { setErrorMessage: setError }),
  withStyles(styles)
)(ModalEditUser)
