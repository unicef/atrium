import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'

import { StandardVerticalTemplate } from '../../ui'
import { ReactComponent as ErrorSVG } from './assets/Error.svg'

const styles = theme => ({
  text: {
    fontSize: 21,
    maxWidth: '80%',
    alignSelf: 'center'
  }
})

const ErrorPage = ({ history, classes }) => {
  React.useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type === 1) {
        history.push('/')
      }
    }
  }, [history])

  return (
    <StandardVerticalTemplate size={6}>
      <ErrorSVG />
      <Typography component="p" variant="body1" className={classes.text}>
        Oops, looks like something went wrong there! Please refresh your browser
        to continue.
      </Typography>
    </StandardVerticalTemplate>
  )
}

ErrorPage.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object
}
export default compose(withStyles(styles), withRouter)(ErrorPage)
