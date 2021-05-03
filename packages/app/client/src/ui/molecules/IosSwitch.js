import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Switch } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    width: 54,
    height: 24,
    padding: 0,
    margin: '3% 3% 3% 0'
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(30px)',
      color: 'white',
      '& + $track': {
        backgroundColor: '#15B54A',
        opacity: 1,
        border: 'none'
      }
    },
    '&$focusVisible $thumb': {
      color: '#15B54A',
      border: '6px solid #fff'
    }
  },
  thumb: {
    width: 22,
    height: 22
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid #BCBEBE`,
    backgroundColor: '#BCBEBE',
    opacity: 1
  },
  checked: {},
  focusVisible: {}
}))

function IosSwitch({ checked, onChange }) {
  const classes = useStyles()

  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      checked={checked}
      onChange={onChange}
    />
  )
}

export default IosSwitch
