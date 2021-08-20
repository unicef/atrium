import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { LearnGuideSVG, LearnRemixSVG } from '../assets'
import { SectionWithBorderedText, MainContainer } from '../templates'
import { makeStyles } from '@material-ui/core/styles'
import { ActionDialog } from '../organisms'

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
        maxWidth: 280
      },
      [theme.breakpoints.only('md')]: {
        justifyContent: 'center',
        maxHeight: 300,
        maxWidth: 300
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
  const [showDialog, setDialogVisibility] = React.useState(false)
  const [showBountiesDialog, setBountiesDialogVisibility] = React.useState(
    false
  )
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
        onClick={() => setDialogVisibility(true)}
        otherComponent={
          <SectionIcon>
            <LearnRemixSVG />
          </SectionIcon>
        }
        borderedTextFirst
      />
      <SectionWithBorderedText
        id="guideSection"
        bgColor="section-bg"
        boxDescription={`If you're interested in being guided through tasks that build on basic blockchain concepts, 
        the Directed Learning section allows you to follow different learning paths and earn points at the same time.`}
        boxTitle="Directed Learning"
        actionLabel="View learning paths"
        onClick={() => setBountiesDialogVisibility(true)}
        otherComponent={
          <SectionIcon>
            <LearnGuideSVG />
          </SectionIcon>
        }
      />
      <ActionDialog
        title="You are leaving Atrium"
        content="On confirm you will be redirected to Remix"
        buttonLabel="Confirm"
        onConfirm={() => window.location.replace('remix')}
        open={showDialog}
        handleClose={() => setDialogVisibility(false)}
      />
      <ActionDialog
        title="You are leaving Atrium"
        content="On confirm you will be redirected to Bounties"
        buttonLabel="Confirm"
        onConfirm={() => window.location.replace('bounties')}
        open={showBountiesDialog}
        handleClose={() => setBountiesDialogVisibility(false)}
      />
    </MainContainer>
  )
}

export default WhatsNew
