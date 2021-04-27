import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Tabs } from '../../../molecules'
import { SectionContainer } from '../../../templates'
import { makeStyles } from '@material-ui/core/styles'
import { useIsAuthenticated } from '../../../hooks'
import { smoothVerticalScrolling } from '../../../utils'

const useStyles = makeStyles(() => 
  ({
    container: {
      position: 'sticky',
      top: 50,
      zIndex: 99
    }
  })
)

const tabs = [
  { label: "Guide", hash: 'guideSection', public: true },
  { label: "Quiz", hash:'quizSection', public: true },
  { label: "Directed learning", hash: 'directLearning', public: true },
  { label: "Smart contracts", hash: 'smartContracts', public: false },
  { label: "The Atrium blockchain", hash: 'atriumBlockchain', public: true },
  { label: "External resources", hash: 'externalResources', public: true }
]

const SectionTabs = () => {
  const classes = useStyles()
  const userIsAuthenticated = useIsAuthenticated()
  const filteredTabs = tabs.filter((tab) => {
    if (!tab.public) return userIsAuthenticated
    return tab.public
  })

  const onTabChange = (index) => {
    const target = document.getElementById(filteredTabs[index].hash)
    smoothVerticalScrolling({ element: target, time: 300, otherFixedElementsHeight: 130 })
  }

  return (
    <div className={classes.container}>
      <SectionContainer padding={0} mobilePadding={0} justify="center">
        <Grid item xs={12} md={11}>
          <Tabs handleChange={onTabChange} tabs={filteredTabs} className={classes.tabs} />
        </Grid>
      </SectionContainer>
    </div>
  )
}

export default SectionTabs
