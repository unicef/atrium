import React from 'react'
import { compose } from 'recompose'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/styles/withStyles'

import { ShevronInactiveIcon, ShevronActiveIcon } from '../../../assets'

const styles = theme => ({
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 200
  },
  button: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.colors['dark-forest-green'],
    lineHeight: 0,
    letterSpacing: 1,
    '&$disabled': {
      color: theme.colors['warm-gray']
    }
  },
  chevronLeft: {
    transform: 'rotate(180deg)',
    marginLeft: 2
  },
  chevronRight: {
    marginRight: 2
  }
})

const Navigation = ({ onPrev, onNext, activeSlide, count, classes }) => (
  <div className={classes.navigation}>
    <Button
      type="button"
      onClick={onPrev}
      className={classes.button}
      disabled={activeSlide === 0}
    >
      {activeSlide === 0 ? (
        <ShevronInactiveIcon className={classes.chevronLeft} />
      ) : (
        <ShevronActiveIcon className={classes.chevronLeft} />
      )}
      Previous
    </Button>
    <Button
      type="button"
      onClick={onNext}
      className={classes.button}
      disabled={activeSlide === count - 1}
    >
      Next
      {activeSlide === count - 1 ? (
        <ShevronInactiveIcon className={classes.chevronRight} />
      ) : (
        <ShevronActiveIcon className={classes.chevronRight} />
      )}
    </Button>
  </div>
)

export default compose(React.memo, withStyles(styles))(Navigation)
