import React from 'react'
import Grid from '@material-ui/core/Grid'

function InfoSection({ children }) {
  return (
    <Grid style={{ marginLeft: '5%', paddingTop: '50px' }} item container xs={12} sm={12} md={8} >
      {children}
    </Grid>
  )
}

export default InfoSection
