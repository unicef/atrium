import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import propTypes from 'prop-types'

const useStyles = makeStyles(theme => 
  ({
    subtitle: props => ({
      marginBottom: '35px',
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      lineHeight: '180%',
      textAlign: props.subtitleAlign,
      [theme.breakpoints.down('xs')]: {
        textAlign: props.subtitleAlignMobile || props.subtitleAlign,
      }
    })
  })
)

const Subtitle = ({ children, ...props }) => {
  const classes = useStyles(props)

  return (
    <Typography className={classes.subtitle} variant="subtitle1">
      {children}
    </Typography>
  )
}

Subtitle.propTypes = {
  subtitleAlign: propTypes.string,
  subtitleAlignMobile: propTypes.string
}

Subtitle.defaultProps = {
  subtitleAlign: 'center',
  subtitleAlignMobile: 'center',
}

export default Subtitle