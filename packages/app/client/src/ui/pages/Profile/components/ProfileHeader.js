import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Avatar } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { getProfileAvatar, getProfileName } from '../../../../selectors'

const useStyles = makeStyles(theme => ({
  avatarWrapper: {
    width: 170,
    height: 170,
    borderRadius: '50%',
    backgroundColor: theme.colors.white,
    border: '1px solid #E7E7E7',
    boxSizing: 'border-box'
  },
  userName: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '130%',
    textAlign: 'center',
    color: theme.palette.text.primary,
    marginTop: 20
  },
  background: props => ({
    backgroundImage: `url(${props. bgUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 200,
    borderRadius: 5
  }),
  absoluteWrapper: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}))

const ProfileHeader = () => {
  const classes = useStyles()
  const profileName = useSelector(getProfileName)
  const profileAvatar = useSelector(getProfileAvatar)

  return (
    <Box
      display="flex"
      width="100%"
      height="40vh"
      flexDirection="column"
      mb={5}
      position="relative" 
    >
     <Box
        display="flex"
        position="absolute"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        className={classes.absoluteWrapper}
      >
        <Box className={classes.avatarWrapper} display="flex" justifyContent="center" alignItems="center">
          <Avatar growthTimes={30} src={profileAvatar} name={profileName}/>
        </Box>
        <Typography className={classes.userName}>{profileName}</Typography>
      </Box>
    </Box>
  )
}

export default ProfileHeader
