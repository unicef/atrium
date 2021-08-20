import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { Tabs } from '../../../molecules'
import { SectionContainer } from '../../../templates'
import { makeStyles } from '@material-ui/core/styles'
import { useIsAuthenticated, useTabsOnUrl } from '../../../hooks'
import { smoothVerticalScrolling } from '../../../utils'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  container: {
    position: 'sticky',
    top: 50,
    zIndex: 99
  }
}))

const tabs = [
  { label: 'Guide', hash: 'guideSection', public: true },
  { label: 'Quiz', hash: 'quizSection', public: true },
  { label: 'Smart contracts', hash: 'smartContracts', public: false },
  { label: 'The Atrium blockchain', hash: 'atriumBlockchain', public: true },
  { label: 'Directed learning', hash: 'directLearning', public: true },
  { label: 'External resources', hash: 'externalResources', public: true }
]

const SectionTabs = () => {
  const classes = useStyles()
  const userIsAuthenticated = useIsAuthenticated()
  const filteredTabs = tabs.filter(tab => {
    if (!tab.public) return userIsAuthenticated
    return tab.public
  })

  const { handleChange, tabIndex } = useTabsOnUrl({
    tabs: filteredTabs,
    baseRoute: `/learn`
  })

  const onTabChange = newIndex => {
    const nextTab = filteredTabs[newIndex]

    if (nextTab !== undefined) {
      const target = document.getElementById(nextTab.hash)
      smoothVerticalScrolling({
        element: target,
        time: 300,
        otherFixedElementsHeight: 130
      })
      handleChange(newIndex)
    }
  }

  return (
    <div className={classes.container}>
      <SectionContainer padding={0} mobilePadding={0} justify="center">
        <Grid item xs={12} md={11}>
          <Tabs
            currentIndex={tabIndex}
            handleChange={onTabChange}
            tabs={filteredTabs}
            className={classes.tabs}
          />
        </Grid>
      </SectionContainer>
    </div>
  )
}

export default SectionTabs
