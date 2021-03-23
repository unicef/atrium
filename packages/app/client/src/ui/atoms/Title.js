import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => 
  ({
    title: props => ({
      marginBottom: props.mb,
      textAlign: props.align,
      fontWeight:'bold',
      [theme.breakpoints.down('xs')]: {
        textAlign: props.alignMobile || props.align,
        fontSize: 20
      }
    })
  })
)

const Title = ({ children, ...props }) => {
  const classes = useStyles(props)

  return (
    <Typography className={classes.title} variant="h4">
      {children}
    </Typography>
  )
}

Title.propTypes = {
  align: PropTypes.string,
  alignMobile: PropTypes.string,
  mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Title.defaultProps = {
  align: 'center',
  alignMobile: 'center',
  mb: 17
}

export default Title