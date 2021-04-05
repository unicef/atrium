import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => 
  ({
    subtitle: props => ({
      marginBottom: props.mb,
      textAlign: props.align,
      
      [theme.breakpoints.down('xs')]: {
        textAlign: props.alignMobile || props.align,
      }
    })
  })
)

const Subtitle = ({ children, ...props }) => {
  const classes = useStyles(props)

  return (
    <Typography className={classes.subtitle} variant="body1">
      {children}
    </Typography>
  )
}

Subtitle.propTypes = {
  align: PropTypes.string,
  alignMobile: PropTypes.string,
  mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Subtitle.defaultProps = {
  align: 'center',
  alignMobile: 'center',
  mb: 35
}

export default Subtitle