import React from 'react'
import { useHistory, useParams } from 'react-router'

const useTabsOnUrl = ({ tabs, baseRoute }) => {
  const { tab } = useParams()
  const history = useHistory()
  
  React.useEffect(() => {
    if (Array.isArray(tabs) && tabs.length > 0) {
      const nextTabIndex = tabs.findIndex(tb => tb.hash === tab)
      if (nextTabIndex >= 0) setTabIndex(nextTabIndex)
    }
  }, [tab, tabs])
  
  const [tabIndex, setTabIndex] = React.useState(0)
  
  const handleChange = (newIndex, routeConfig) => {
    const nextTab = tabs[newIndex]
    history.push({ pathname: `${baseRoute}/${nextTab.hash}`, ...routeConfig })
  }

  return { handleChange, tabIndex }
}

export default useTabsOnUrl
