import React, { useState } from 'react'
import MuiTabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { mergeClassNames } from '../utils'

const useDefaultStyles = makeStyles(theme => ({
  tab: props => ({
    textTransform: 'none',
    width: '100%',
    maxWidth: props.tabMaxWidth
  }),
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    width: '100%',
    borderBottom: `1.2px solid ${theme.colors['light-gray']}`
  },
  tabs: {
    width: '100%'
  }
}))

const Tabs = ({ handleChange, tabs, className }) => {
  const classes = useDefaultStyles({ tabMaxWidth: `${parseInt(100 / tabs.length)}%` })
  const [tabIndex, setTabIndex] = useState(0)
  const containerClassName = mergeClassNames(className, classes.tabsContainer)

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
        className={classes.tabs}
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
