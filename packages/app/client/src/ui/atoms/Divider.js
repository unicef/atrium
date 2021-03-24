import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({
  divider: props => ({
    background: '#E7E7E7',//theme.colors['warm-gray'],
    marginTop: props.mt,
    marginBottom: props.mb,
  })
})

const Dividers = ({ mt, mb, ...props }) => {
  const classes = useStyles({ mt, mb })

  return (
    <Divider className={classes.divider} {...props} />
  )
}

Dividers.defaultProps = {
  mt: 0,
  mb: 0
}

export default Dividers

