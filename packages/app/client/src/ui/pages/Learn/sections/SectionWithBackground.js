import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { DescriptionBox, Section } from '../components'

const SectionWithBackground = ({ ImageComponent, boxTitle, boxDescription, actionLabel }) => {
  return (
    <Section bgColor="section-bg">
      <Grid item container xs={12} md={8}>
        <ImageComponent />
      </Grid>
      <Grid container item xs={12} md={8}>
        <Typography  variant="h3">
          {boxTitle}
        </Typography>
       <DescriptionBox buttonLabel={actionLabel}>
          {boxDescription}
       </DescriptionBox>
      </Grid>
    </Section>
  )
}

export default SectionWithBackground
