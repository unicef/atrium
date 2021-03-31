import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => 
  ({
    container: props => ({
      margin: 0,
      backgroundColor: theme.colors[props.bgColor],
      padding: props.padding,
      [theme.breakpoints.down("xs")]: {
        padding: props.mobilePadding
      },
      [theme.breakpoints.only("md")]: {
        padding: 40
      },
    })
  })
)

const SectionContainer = ({ id, ...props}) => {
  const classes = useStyles(props)

  return (
    <Grid id={id} container item xs={12} justify="center" className={classes.container}>
      <Grid container item xs={12} md={12} lg={8} {...props}>
       {props.children}
      </Grid>
    </Grid>
  )
}

SectionContainer.defaultProps = {
  bgColor: 'white',
  containerProps: {},
  padding: 80,
  mobilePadding: 20
}

export default SectionContainer
