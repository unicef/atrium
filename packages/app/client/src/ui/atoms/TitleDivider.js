import React from 'react'
import { withStyles } from '@material-ui/styles'
import { Grid, Divider, Typography } from '@material-ui/core'

function TitleDivider({ classes, title }) {
  return (
    <Grid container className={classes.container}>
      <Typography variant="subtitle2">{title}</Typography>
      <Divider className={classes.divider} />
    </Grid>
  )
}

const styles = theme => ({
  container: {
    marginTop: 40,
    marginBottom: 18
  },
  divider: {
    background: theme.colors['warm-gray'],
    flex: 1,
    alignSelf: 'center',
    marginLeft: 8
  }
})

export default withStyles(styles)(TitleDivider)
