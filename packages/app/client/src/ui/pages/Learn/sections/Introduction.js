import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { LearnIntroductionSVG } from '../../../assets'
import { TwoPartySection } from '../../../templates'
import { TitleAndSubtitle } from '../../../molecules'

const Introduction = () => {
  return (
    <TwoPartySection
    >
      <Grid item xs={12} lg={8}>
        <TitleAndSubtitle
          title="Learning resources"
          subtitle="Are you curious to learn about different UN use cases? Have you ever wondered how your entity could apply blockchain?"
          titleProps={{ align: 'left', alignMobbile: 'left' }}
          subtitleProps={{ align: 'left', alignMobbile: 'left' }}
        />
       <Typography variant="subtitle2">
        Welcome to the Learn section of The Atrium. We have curated a list of the best blockchain resources for you. You'll find a mix of UN specific resources and public content.
       </Typography>
      </Grid>
      <Grid item container xs={12} lg={8}>
        <LearnIntroductionSVG />
      </Grid>
    </TwoPartySection>
  )
}

export default Introduction
