import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(() => ({
  border: {
    border: '1px solid #E7E7E7',
    borderRadius: '5px'
  },
  normal: {
    width: '469px',
    height: '320px'
  },
  large: {
    width: '469px',
    height: '530px'
  },
  top: {
    height: '55px',
    paddingLeft: '5%'
  },
  line: {
    borderBottom: '1px solid #E7E7E7'
  }
}))

function BorderedInfo({ children, size }) {
  const classes = useStyles()
  return (
    <div
      className={[
        classes.border,
        size === 'large' ? classes.large : classes.normal
      ].join(' ')}
    >
      <div className={classes.top}>{children[0]}</div>
      <div className={classes.line} />
      <div>{children[1]}</div>
    </div>
  )
}

export default BorderedInfo
