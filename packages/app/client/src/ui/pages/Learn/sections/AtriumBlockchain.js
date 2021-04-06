import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { SectionContainer } from '../../../templates'
import { CollapsableQuestion, SectionDescription } from '../components'
import { BorderedTextBoxWithButton } from '../../../molecules'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  link: {
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20
    }
  }
}))

const questions = [
  {
    title: 'What is a blockchain node?',
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing"
  },
  {
    title: 'What does it mean to "run a node"?',
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing"
  },
  {
    title: 'Why run a blockchain node?',
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing"
  }
]

const AtriumBlockchain = () => {
  const classes = useStyles()

  return (
    <SectionContainer id="atriumBlockchain" spacing={4} md={8} lg={6}>
      <SectionDescription
        title="The Atrium Blockchain"
        text="The Atrium is hosted on a private Quorum (Ethereum) network. That means that when you're earning points, claiming a badge, or writing a smart contract on Remix, you're interacting with private The Atrium blockchain.
        Currently, UNDP, UNICEF and WFP host nodes, but The Atrium is always looking for new organisations to join. By participating, you'll increase the resiliency of The Atrium, and gain experience on what is needed to run a node in a blockchain. If interested, please contact:"
      >
        <Link
            component="a"
            variant="h3"
            href="mailto:blockchain@uninnovation.network"
            className={classes.link}
          >
            blockchain@uninnovation.network
        </Link>
      </SectionDescription>

      <Grid item container xs={12}>
        {questions.map(question => <CollapsableQuestion key={question.title} {...question} />)}
      </Grid>

      <Grid id="directLearning" item xs={12}>
        <div>
          <Typography variant="h3">
            Directed learning
          </Typography>
        </div>

        <BorderedTextBoxWithButton hideBorder buttonLabel="View learning paths">
          If you're interested in being guided through tasks that build on basic blockchain concepts, the Directed Learning section allows you to follow different learning paths and earn points at the same time.
        </BorderedTextBoxWithButton>
      </Grid>

    </SectionContainer>
  )
}

export default AtriumBlockchain
