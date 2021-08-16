import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({
  divider: props => ({
    background: '#E7E7E7',//theme.colors['warm-gray'],
    marginTop: props.mt,
    marginBottom: props.mb,
    width: props.width
  })
})

const Dividers = ({ mt, mb, width,...props }) => {
  const classes = useStyles({ mt, mb, width })

  return (
    <Divider className={classes.divider} {...props} />
  )
}

Dividers.defaultProps = {
  mt: 0,
  mb: 0,
  width: '100%'
}

export default Dividers

