import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { MainContainer } from '../templates'

const PageNotFound = () => (
  <MainContainer size="small">
    <Box height="100%" display="flex" flex={1} alignItems="center" justifyContent="center">
      <Typography align="center" variant="h3">PAGE NOT FOUND</Typography>
    </Box>
  </MainContainer>
)

export default PageNotFound
