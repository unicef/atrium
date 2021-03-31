import React from 'react'
import { Tabs } from '../../../molecules'
import { SectionContainer } from '../../../templates'
import { makeStyles } from '@material-ui/core/styles'

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
  { label: "Guide", hash: 'guideSection' },
  { label: "Quiz", hash:'quizSection' },
  { label: "Directed learning", hash: 'directLearning' },
  { label: "Smart contracts", hash: 'smartContracts' },
  { label: "The Atrium blockchain", hash: 'atriumBlockchain' },
  { label: "External resources", hash: 'externalResources' }
]

const SectionTabs = () => {
  const classes = useStyles()

  const onTabChange = (index) => {
    const target = document.getElementById(tabs[index].hash)
    window.scrollTo({ top: target.offsetTop - (target.offsetHeight / 2), behavior: 'smooth' })
  }

  return (
    <div className={classes.container}>
      <SectionContainer padding={0} mobilePadding={0} justify="center" lg={10}>
        <Tabs handleChange={onTabChange} tabs={tabs} className={classes.tabs} />
      </SectionContainer>
    </div>
  )
}

export default SectionTabs
