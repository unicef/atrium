import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { BadgeRow } from '../components'
import { makeStyles} from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { getProfileBadges } from '../../../../selectors'

const useStyles = makeStyles(() => ({
  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '27px',
    marginTop: 40,
    marginBottom: 30
  },
  subText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '180%',
    marginBottom: 49
  }
}))

const ProfileBadges = () => {
  const classes = useStyles()
  const badges = useSelector(getProfileBadges)

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Typography className={classes.title}>BADGES</Typography>
        <Typography className={classes.subText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        </Typography>
        {badges.map((applied, index) => (
          applied && <BadgeRow id={`profileBadge_${index}`} index={index} />
        ))}
      </Grid>
    </Grid>
  )
}

export default ProfileBadges
