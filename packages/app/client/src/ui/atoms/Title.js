import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import propTypes from 'prop-types'

const useStyles = makeStyles(theme => 
  ({
    title: props => ({
      marginBottom: '17px',
      textAlign: props.titleAlign,
      fontWeight: 'bold',
      [theme.breakpoints.down('xs')]: {
        textAlign: props.titleAlignMobile || props.titleAlign,
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
  titleAlign: propTypes.string,
  titleAlignMobile: propTypes.string
}

Title.defaultProps = {
  titleAlign: 'center',
  titleAlignMobile: 'center'
}

export default Title