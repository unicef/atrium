import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/styles/withStyles'

import { CarretLightGreenIcon as ActiveIcon } from '../assets'
import { ShevronInactiveIcon as InactiveIcon } from '../../components/layout/assets'

const styles = theme => ({
  button: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.colors['shamrock-green'],
    lineHeight: 1,
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

const SliderNavButton = ({
  classes,
  direction,
  children,
  disabled,
  ...props
}) => {
  const chevronStyle =
    direction === 'next' ? classes.chevronRight : classes.chevronLeft
  const chevron = disabled ? (
    <InactiveIcon className={chevronStyle} />
  ) : (
    <ActiveIcon className={chevronStyle} />
  )

  const contentBtn = {
    next: (
      <>
        {children}
        {chevron}
      </>
    ),
    prev: (
      <>
        {chevron}
        {children}
      </>
    )
  }[direction]

  return (
    <Button
      type="button"
      className={classes.button}
      disabled={disabled}
      {...props}
    >
      {contentBtn}
    </Button>
  )
}

SliderNavButton.propTypes = {
  direction: PropTypes.oneOf(['next', 'prev']).isRequired
}

export default compose(React.memo, withStyles(styles))(SliderNavButton)
