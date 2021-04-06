import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { TitleAndSubtitle } from '../../../molecules'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  text: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '180%',
  }
})

const SectionDescription = (props) => {
  const classes = useStyles()
  
  return (
    <Grid item container xs={12}>
      <TitleAndSubtitle
        title={props.title}
        subtitle={props.subtitle}
        titleProps={{ align: 'left', alignMobbile: 'left' }}
        subtitleProps={{ align: 'left', alignMobbile: 'left' }}
      />

      <Grid item xs={12}>
        <Typography variant="subtitle1" className={classes.text}>
          {props.text}
        </Typography>
      </Grid>

      {props.children}
    </Grid>
  )
}

SectionDescription.defaultProps = {
  subtitle: ""
}

export default SectionDescription
