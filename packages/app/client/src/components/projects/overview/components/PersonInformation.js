import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'

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
    width: '53px',
    height: '53px',
    borderRadius: '50%',
    marginRight: '2%'
  },
  noBorder: {
    border: 'none'
  },
  fullBorder: {
    border: '1.6px solid #E7E7E7',
    height: '100px',
    margin: '0 0 3% 0',
    padding: '5%'
  }
}))

function PersonInformation({ children, user, mode }) {
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
        <div style={{ display: 'flex' }}>
          <img className={classes.avatar} alt="Avatar" src={user.avatar} />
          <div>
            <Typography
              color="secondary"
              className={classes.personFullName}
              variant="subtitle1"
            >
              {user.name /* then + surname*/}
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

export default PersonInformation
