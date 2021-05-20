import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import InfoCellTitle from './InfoCellTitle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  content: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '18px',
  }
}))

const InfoCell = ({ title, content, ...props }) => {
  const classes = useStyles()

  return (
    <Grid item xs={5} {...props}>
      <InfoCellTitle>{title}</InfoCellTitle>
      <Typography className={classes.content}>{content}</Typography>
    </Grid>
  )
}

export default InfoCell
