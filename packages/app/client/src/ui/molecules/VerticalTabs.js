import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import {getUser} from "../../selectors";
import {Avatar} from "../atoms";
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
    marginRight: '5%'
  },
  role: {
    fontSize: '16px',
    color: '#919492'
  }
}))

function VerticalTabs({ tabIndex, handleChange, tabsList }) {
  const classes = useDefaultStyles()
  const user = useSelector(getUser)
  return (
    <Grid
      style={{ borderRight: '1px solid #E7E7E7' }}
      item
      xs={12}
      sm={12}
      md={2}
    >
      <div className={classes.top}>
        <Avatar src={user.avatar} className={classes.avatar} name={user.name} />
        <div>
          <Typography variant="subtitle1">{user.name.split(' ')[0]}</Typography>
          <Typography variant="subtitle1">{user.name.split(' ')[1]}</Typography>
          <Typography className={classes.role} variant="body1">
            {user.role}
          </Typography>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid #E7E7E7' }} />
      <Typography
        variant="h3"
        style={{ textAlign: 'center', fontSize: '20px', marginTop: '5%' }}
      >
        My account
      </Typography>
      <div className={classes.tabs}>
        <Tabs value={tabIndex} onChange={handleChange} orientation="vertical">
          {tabsList.map((tab, i) => (
            <Tab key={tab.replace(/s/g, '') + "HorizontalTabItem" + i} className={classes.tab} label={tab} />
          ))}
        </Tabs>
      </div>
    </Grid>
  )
}

export default VerticalTabs
