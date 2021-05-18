import React from 'react'
import Slide from '@material-ui/core/Slide'
import Box from '@material-ui/core/Box'

const TabPanel = ({ value, index, children, slideSide }) => {
  const shouldRender = value === index

  return (
    <Slide direction={slideSide} in={shouldRender} mountOnEnter unmountOnExit>
      <Box width="100%" minHeight="30vh">{children}</Box>
    </Slide>
  )
}

TabPanel.defaultProps = {
  slideSide: 'right'
}

export default TabPanel
