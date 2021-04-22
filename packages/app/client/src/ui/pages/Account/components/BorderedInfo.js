import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(() => ({
  border: {
    border: '1px solid #E7E7E7',
    borderRadius: '5px',
    width: '469px',
    height: '334px'
  },
  top: {
    height: '20%',
    padding: '5%'
  },
  line: {
    borderBottom: '1px solid #E7E7E7'
  },
  bottom: {
    padding: '5%'
  }
}))

function BorderedInfo({ children }) {
  const classes = useStyles()

  return (
    <div className={classes.border}>
      <div className={classes.top}>{children[0]}</div>
      <div className={classes.line} />
      <div className={classes.bottom}>{children[1]}</div>
    </div>
  )
}

export default BorderedInfo
