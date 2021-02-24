import React from 'react'
import { compose } from 'recompose'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/styles/withStyles'

const styles = theme => ({
  navigation: {
    marginBottom: 10
  }
})

const PollsNav = ({ classes }) => (
  <Grid
    container
    item
    justify="space-between"
    alignItems="center"
    className={classes.navigation}
  >
    <Typography variant="h4">Closed polls</Typography>
    {/* <SortDropdownMenu
      label="Sort list"
    /> */}
  </Grid>
)

export default compose(React.memo, withStyles(styles))(PollsNav)
