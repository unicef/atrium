import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Information, Activities } from '../components'

const AboutProfile = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Information />
      </Grid>

      <Grid item xs={12} md={6}>
        <Activities />
      </Grid>
    </Grid>
  )
}

export default AboutProfile
