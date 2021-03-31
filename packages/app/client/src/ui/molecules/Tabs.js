import React, { useState } from 'react'
import MuiTabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { mergeClassNames } from '../utils'

const useDefaultStyles = makeStyles(theme => ({
  tab: {
    textTransform: 'none'
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    width: '100%',
    borderBottom: `1.2px solid ${theme.colors['light-gray']}`
  }
}))

const Tabs = ({ handleChange, tabs, className }) => {
  const classes = useDefaultStyles()
  const [tabIndex, setTabIndex] = useState(0)
  const containerClassName = mergeClassNames(className, classes.tabs)

  const onTabChange = (e, index) => {
    e.preventDefault()
    setTabIndex(index)
    handleChange(index)
  }

  return (
    <div className={containerClassName}>
      <MuiTabs
        value={tabIndex}
        variant="fullWidth"
        onChange={onTabChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
      >
        {tabs.map(tab => <Tab key={tab.id} className={classes.tab} label={tab.label} />)}
      </MuiTabs>
    </div>
  )
}

Tabs.defaultProps = {
  handleChange: () => {},
  tabs: [],
  className: ''
}

export default Tabs