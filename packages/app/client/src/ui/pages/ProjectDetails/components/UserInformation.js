import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { Avatar } from "../../../atoms";

const useDefaultStyles = makeStyles(theme => ({
  personInfo: {
    borderBottom: '1.6px solid #E7E7E7',
    height: '69px',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  personFullName: {
    fontSize: '17px',
    marginBottom: '2%',
    textAlign: 'left'
  },
  avatar: {
    marginRight: '5%'
  },
  noBorder: {
    border: 'none'
  },
  fullBorder: {
    border: '1.6px solid #E7E7E7',
    height: '100px',
    margin: '0 0 3% 0',
    padding: '5%'
  },
  wrapper: {
    display: 'flex',
    width: '100%'
  }
}))

function UserInformation({ children, user, mode }) {
  const classes = useDefaultStyles()
  return (
    <>
      <div
        className={
          mode === 'lastInModal'
            ? [classes.personInfo, classes.noBorder].join(' ')
            : mode === 'page'
            ? [classes.personInfo, classes.fullBorder].join(' ')
            : classes.personInfo
        }
      >
        <div className={classes.wrapper}>
          <Avatar
            growthTimes={10}
            src={user.avatar}
            className={classes.avatar}
            name={user.name}
          />
          <div>
            <Typography
              color="secondary"
              className={classes.personFullName}
              variant="subtitle1"
            >
              {user.name}
            </Typography>
            <Typography color="secondary" variant="body1">
              {user.email}
            </Typography>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default UserInformation
