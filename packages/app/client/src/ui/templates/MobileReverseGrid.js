import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useIsMobileViewPort } from '../hooks'

const MobileReverseGrid = ({ children, secondColumnProps }) => {
  const isMobileViewPort = useIsMobileViewPort()

  return (
    <Grid container spacing={2} direction={isMobileViewPort ? 'column-reverse' : 'row'}>
      <Grid item container xs={12} sm={6}>
        {children[0]}
      </Grid>

      <Grid item container {...secondColumnProps} xs={12} sm={6}>
        {children[1]}
      </Grid>
    </Grid>
  )
}

export default MobileReverseGrid
