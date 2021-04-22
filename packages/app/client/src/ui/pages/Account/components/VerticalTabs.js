import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
const useDefaultStyles = makeStyles(() => ({
  top: {
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tab: {
    textTransform: 'none'
  },
  tabs: {
    marginTop: '5%'
  },
  avatar: {
    height: '70px',
    width: '70px'
  }
}))

function VerticalTabs({ tabIndex, handleChange }) {
  const classes = useDefaultStyles()
  return (
    <Grid
      style={{ borderRight: '1px solid #E7E7E7' }}
      item
      xs={12}
      sm={12}
      md={2}
    >
      <div className={classes.top}>
        <img className={classes.avatar} alt="Avatar" />
        <div>
          <Typography
              variant="subtitle1"
          >
            Hardname
          </Typography>
          <Typography
              variant="subtitle1"
          >
            Hardsurname
          </Typography>
          <Typography
              style={{fontSize: '16px'}}
              variant="body1"
          >
            Hardrole
          </Typography>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid #E7E7E7' }} />
      <Typography
        variant="h3"
        style={{ textAlign: 'center', fontSize: '20px' }}
      >
        My account
      </Typography>
      <div className={classes.tabs}>
        <Tabs value={tabIndex} onChange={handleChange} orientation="vertical">
          <Tab className={classes.tab} label="Dashboard" />
          <Tab className={classes.tab} label="Profile" />
          <Tab className={classes.tab} label="Settings" />
          <Tab className={classes.tab} label="My Post" />
          <Tab className={classes.tab} label="My Projects" />
          <Tab className={classes.tab} label="My Comments" />
          <Tab className={classes.tab} label="Badges" />
          <Tab className={classes.tab} label="Bookmarks" />
          <Tab className={classes.tab} label="Notifications" />
        </Tabs>
      </div>
    </Grid>
  )
}

export default VerticalTabs
