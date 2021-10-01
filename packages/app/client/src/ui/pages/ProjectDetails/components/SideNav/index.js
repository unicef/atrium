import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import SECTIONS_NAME, { SECTIONS_ID } from '../sectionsName'
import onScroll, { IDS } from './onScroll'
import styles from './styles'
import smoothVerticalScrolling from '../../../../utils/smoothVerticalScrolling'

const SideNav = () => {
  const classes = styles()

  useEffect(() => {
    document.addEventListener('scroll', onScroll)

    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleClick = (id) => () => {
    const element = document.getElementById(id)

    smoothVerticalScrolling({ element, time: 300 })
  }

  return (
    <Grid className={classes.stickContainer} item container xs={12}>
      <div className={classes.wrapper}>
        <Typography className={classes.grayText} component="h4">
          REQUIRED INFORMATION
        </Typography>

        <Typography id={IDS[SECTIONS_NAME.PROJECT]} data-marked={false} className={classes.blackText} onClick={handleClick(SECTIONS_ID[SECTIONS_NAME.PROJECT])}>
          {SECTIONS_NAME.PROJECT}
        </Typography>

        <Typography id={IDS[SECTIONS_NAME.CONTACT_PERSON]} data-marked={false} className={classes.blackText} onClick={handleClick(SECTIONS_ID[SECTIONS_NAME.CONTACT_PERSON])}>
          {SECTIONS_NAME.CONTACT_PERSON}
        </Typography>
      </div>

      <div className={classes.wrapper}>
        <Typography className={classes.grayText} component="h4">
          EXTRA INFORMATION
        </Typography>

        <Typography id={IDS[SECTIONS_NAME.STORY]} data-marked={false} className={classes.blackText} onClick={handleClick(SECTIONS_ID[SECTIONS_NAME.STORY])}>
          {SECTIONS_NAME.STORY}
        </Typography>

        <Typography id={IDS[SECTIONS_NAME.TEAM_DETAILS]} data-marked={false} className={classes.blackText} onClick={handleClick(SECTIONS_ID[SECTIONS_NAME.TEAM_DETAILS])}>
          {SECTIONS_NAME.TEAM_DETAILS}
        </Typography>

        <Typography id={IDS[SECTIONS_NAME.LINKS]} data-marked={false} className={classes.blackText} onClick={handleClick(SECTIONS_ID[SECTIONS_NAME.LINKS])}>
          {SECTIONS_NAME.LINKS}
        </Typography>

        <Typography id={IDS[SECTIONS_NAME.DOCUMENTS]} data-marked={false} className={classes.blackText} onClick={handleClick(SECTIONS_ID[SECTIONS_NAME.DOCUMENTS])}>
          {SECTIONS_NAME.DOCUMENTS}
        </Typography>
      </div>
    </Grid>
  )
}

export default SideNav
