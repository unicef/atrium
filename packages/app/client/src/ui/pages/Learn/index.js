import React from 'react'
import Container from '@material-ui/core/Container'
import { useContainerStyle } from '../../hooks'
import { SectionWithBorderedText } from '../../templates'
import { Introduction, Quiz, AtriumBlockchain, ExternalResources, SectionTabs } from './sections'
import { SectionIcon } from './components'

const Learn = () => {
  const containerStyle = useContainerStyle({ size: "full" })
  
  return (
    <Container component="main" className={containerStyle}>
      <Introduction />
      <SectionTabs />
      <SectionWithBorderedText
        id="guideSection"
        bgColor="section-bg"
        boxDescription={`We have created an easy-to-use, practical guide for the UN and public sector, complete with definitions, 
        decision-making tools and use cases, helping you to evaluate if blockchain is the correct tool for your next solution.`}
        boxTitle="The Atrium is a UN-wide platform, enabled by blockchain"
        actionLabel="View document (PDF, 456 KB)"
        otherComponent={<SectionIcon iconName="guide" />}
      />
      <Quiz />
      <SectionWithBorderedText
        id="smartContracts"
        bgColor="section-bg"
        boxDescription={`Are you a developer interested in writing digital rules for blockchain? 
        Remix is an open-source tool that allows individuals to easily write and test smart contracts on The Atrium blockchain (Quorum blockchain). 
        Test out your contract development skills with Remix now.`}
        boxTitle="Write your first smart contract with Remix"
        actionLabel="Open Remix"
        otherComponent={<SectionIcon iconName="remix" />}
        borderedTextFirst
      />
      <AtriumBlockchain />
      <ExternalResources />
    </Container>
  )
}

export default Learn
