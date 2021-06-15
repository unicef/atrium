import React from 'react'
import { useIsAuthenticated } from '../../hooks'
import { SectionWithBorderedText, JoinAtrium, MainContainer } from '../../templates'
import { Introduction, Quiz, AtriumBlockchain, ExternalResources, SectionTabs } from './sections'
import { SectionIcon } from './components'
import { ActionDialog } from '../../organisms'

const Learn = () => {
  const userIsAuthenticated = useIsAuthenticated()
  const [showDialog, setDialogVisibility] = React.useState(false)

  return (
    <MainContainer size="full">
      <Introduction />
      <SectionTabs />
      <SectionWithBorderedText
        id="guideSection"
        bgColor="section-bg"
        boxDescription={`We have created an easy-to-use, practical guide for the UN and public sector, complete with definitions, 
        decision-making tools and use cases, helping you to evaluate if blockchain is the correct tool for your next solution.`}
        boxTitle="The Atrium is a UN-wide platform, enabled by blockchain"
        actionLabel="View document (PDF, 456 KB)"
        onClick={() => window.open('https://atrium.network/guide')}
        otherComponent={<SectionIcon iconName="guide" />}
      />
      <Quiz />
      {userIsAuthenticated &&
        <SectionWithBorderedText
          id="smartContracts"
          bgColor="section-bg"
          boxDescription={`Are you a developer interested in writing digital rules for blockchain? 
          Remix is an open-source tool that allows individuals to easily write and test smart contracts on The Atrium blockchain (Quorum blockchain). 
          Test out your contract development skills with Remix now.`}
          boxTitle="Write your first smart contract with Remix"
          actionLabel="Open Remix"
          onClick={()=> setDialogVisibility(true)}
          otherComponent={<SectionIcon iconName="remix" />}
          borderedTextFirst
        />
      }
      <AtriumBlockchain />
      <ExternalResources />
      {!userIsAuthenticated && <JoinAtrium LeftImageComponent={<SectionIcon iconName="butterflyLeft" />} RightImageComponent={<SectionIcon iconName="butterflyRight" />} />}
      <ActionDialog
        title="You are leaving Atrium"
        content="On confirm you will be redirected to Remix"
        buttonLabel="Confirm"
        onConfirm={()=> window.location.replace('remix')}
        open={showDialog}
        handleClose={() => setDialogVisibility(false)}
      />
    </MainContainer>
  )
}

export default Learn
