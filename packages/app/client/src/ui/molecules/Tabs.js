import React from 'react'
import MuiTabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { mergeClassNames } from '../utils'

const useDefaultStyles = makeStyles(theme => ({
  tab: props => ({
    textTransform: 'none',
    width: '100%',
    maxWidth: props.tabMaxWidth,
    backgroundColor: theme.colors.white
  }),
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    width: '100%',
    borderBottom: `1.2px solid ${theme.colors['light-gray']}`,
    zIndex: 99
  },
  tabs: {
    width: '100%'
  }
}))

const Tabs = ({ handleChange, tabs, className, currentIndex }) => {
  const classes = useDefaultStyles({ tabMaxWidth: `${parseInt(100 / tabs.length)}%` })
  const shouldUseIndexFromProps = currentIndex !== undefined
  const [tabIndex, setTabIndex] = React.useState(shouldUseIndexFromProps ? currentIndex : 0)
  const containerClassName = mergeClassNames(className, classes.tabsContainer)

  const onTabChange = (e, index) => {
    e.preventDefault()
    if (!shouldUseIndexFromProps) {
      setTabIndex(index)
    }
    handleChange(index)
  }

  return (
    <div className={containerClassName}>
      <MuiTabs
        value={shouldUseIndexFromProps ? currentIndex : tabIndex}
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
