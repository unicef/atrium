import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { SectionContainer } from '../../../templates'
import { TitleAndSubtitle } from '../../../molecules'
import { SectionIcon } from '../components'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  text: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '180%',
  }
})

const Introduction = () => {
  const classes = useStyles()

  return (
    <SectionContainer justify="space-between" xs={12}>
      <Grid item xs={12} sm={10} md={5} lg={5}>
        <TitleAndSubtitle
          title="Learning resources"
          subtitle="Are you curious to learn about different UN use cases? Have you ever wondered how your entity could apply blockchain?"
          titleProps={{ align: 'left', alignMobile: 'left' }}
          subtitleProps={{ align: 'left', alignMobile: 'left' }}
        />
       <Typography variant="subtitle2" className={classes.text}>
          Welcome to the Learn section of The Atrium. We have curated a list of the best blockchain resources for you. You'll find a mix of UN specific resources and public content.
       </Typography>
      </Grid>
      <Grid item container xs={12} sm={10} md={5} lg={5}>
        <SectionIcon iconName="introduction" />
      </Grid>
    </SectionContainer>
  )
}

export default Introduction
