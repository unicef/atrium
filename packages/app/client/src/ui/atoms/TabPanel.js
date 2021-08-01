import React from 'react'
import Fade from '@material-ui/core/Fade'
import Box from '@material-ui/core/Box'

const TabPanel = ({ value, index, children }) => {
  const shouldRender = value === index

  return (
    <Fade in={shouldRender} mountOnEnter unmountOnExit>
      <Box width="100%" minHeight="30vh">{children}</Box>
    </Fade>
  )
}

export default TabPanel
