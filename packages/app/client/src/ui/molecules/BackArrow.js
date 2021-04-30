import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  contentText: {
    whiteSpace: 'pre-wrap'
  },
  backArrow: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: theme.colors['shamrock-green'],
      cursor: 'pointer'
    }
  },
  icon: {
    width: 20,
    height: 20
  }
}))

const BackArrow = ({ dest, history }) => {
  const classes = useStyles()

  return (
    <div onClick={() => history.push(dest)} className={classes.backArrow}>
      <ArrowBackIosIcon className={classes.icon} />
      <Typography variant="body1" className={classes.contentText}>
        {'Back to projects'}
      </Typography>
    </div>
  )
}

BackArrow.propTypes = {
  tags: PropTypes.array
}

export default withRouter(BackArrow)
