import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Avatar, Grid, Typography } from '@material-ui/core'
import classnames from 'classnames'

const styles = theme => ({
  container: {
    '&:not-first-of-type': {
      borderTop: 'solid 1px #e2e2e2'
    },
    padding: 8
  },
  containerFocused: {
    backgroundColor: theme.colors['white-smoke']
  }
})

const MentionRow = ({ display, id, avatar, focused, classes }) => {
  const rowClassNames = classnames(classes.container, {
    [classes.containerFocused]: focused
  })

  return (
    <Grid container className={rowClassNames} alignItems={'center'}>
      <Grid item style={{ marginRight: 8 }}>
        <Avatar alt={display} src={avatar || ''} />
      </Grid>
      <Grid item>
        <Typography variant="body1">{display}</Typography>
      </Grid>
    </Grid>
  )
}

MentionRow.propTypes = {
  classes: PropTypes.object,
  display: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
}

export default withStyles(styles)(MentionRow)
