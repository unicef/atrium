import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/styles/withStyles'

import { SliderNavButton } from '../../../../ui'

const styles = theme => ({
  title: {
    paddingLeft: 8,
    fontSize: 23,
    fontWeight: 700,
    marginBottom: 15
  },
  navigation: {
    display: 'flex',
    marginBottom: 30
  }
})

const ActualPollNav = ({ classes, count, actualIndex, onNext, onPrev }) => (
  <Grid container item justify="space-between">
    <Typography variant="h5" className={classes.title} id="active-polls-count">
      {actualIndex + 1}/{count} active polls
    </Typography>
    <div className={classes.navigation}>
      <SliderNavButton
        direction="prev"
        onClick={onPrev}
        disabled={actualIndex === 0}
        style={{ marginRight: 20 }}
      >
        previous poll
      </SliderNavButton>
      <SliderNavButton
        direction="next"
        onClick={onNext}
        disabled={actualIndex + 1 === count}
      >
        next poll
      </SliderNavButton>
    </div>
  </Grid>
)

ActualPollNav.propTypes = {
  count: PropTypes.number.isRequired,
  actualIndex: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired
}

export default compose(React.memo, withStyles(styles))(ActualPollNav)
