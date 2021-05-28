import React from 'react'
import Grid from '@material-ui/core/Grid'
import { LearnGuideSVG, LearnRemixSVG } from '../assets'
import { SectionWithBorderedText, MainContainer } from '../templates'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  icon: {
    '& svg': {
      width: '100%',
      height: '100%',
      maxHeight: 430,
      maxWidth: 430,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        maxHeight: 280,
        maxWidth: 280,
      },
      [theme.breakpoints.only('md')]: {
        justifyContent: 'center',
        maxHeight: 300,
        maxWidth: 300,
      }
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginBottom: 30
    }
  }
}))

const SectionIcon = ({ children }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.icon} item container xs={12}>
      {children}
    </Grid>
  )
}

const WhatsNew = () => {

  return (
    <MainContainer size="full">
       <SectionWithBorderedText
        id="smartContracts"
        bgColor="white"
        boxDescription={`Are you a developer interested in writing digital rules for blockchain? 
        Remix is an open-source tool that allows individuals to easily write and test smart contracts on The Atrium blockchain (Quorum blockchain). 
        Test out your contract development skills with Remix now.`}
        boxTitle="Write your first smart contract with Remix"
        actionLabel="Open Remix"
        otherComponent={<SectionIcon><LearnRemixSVG /></SectionIcon>}
        borderedTextFirst
      />
      <SectionWithBorderedText
        id="guideSection"
        bgColor="section-bg"
        boxDescription={`We have created an easy-to-use, practical guide for the UN and public sector, complete with definitions, 
        decision-making tools and use cases, helping you to evaluate if blockchain is the correct tool for your next solution.`}
        boxTitle="Directed Learning"
        actionLabel="View learning paths"
        otherComponent={<SectionIcon><LearnGuideSVG /></SectionIcon>}
      />
    </MainContainer>
  )
}

export default WhatsNew
