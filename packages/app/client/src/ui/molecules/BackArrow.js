import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  contentText: {
    whiteSpace: 'pre-wrap'
  },
  backArrow: {
    display: 'flex',
    fontSize: 'xx-large',
    '&:hover': {
      color: theme.colors['shamrock-green'],
      cursor: 'pointer'
    }
  }
}))

const BackArrow = ({ dest, history }) => {
  const classes = useStyles()

  return (
    <div onClick={() => history.push(dest)} className={classes.backArrow}>
      <ArrowBackIcon />
      <Typography variant="body1" className={classes.contentText}>
        {' back'}
      </Typography>
    </div>
  )
}

BackArrow.propTypes = {
  tags: PropTypes.array
}

export default withRouter(BackArrow)
