import React from 'react'
import Slide from '@material-ui/core/Slide'
import Box from '@material-ui/core/Box'

const TabPanel = ({ value, index, children, slideSide }) => {
  //const slideSide = index > value ? 'left' : 'right'
  const shouldRender = value === index

  return (
    <Slide direction={slideSide} in={shouldRender} mountOnEnter unmountOnExit>
      <div style={{ width: '100%'}}>{children}</div>
    </Slide>
  )
}

TabPanel.defaultProps = {
  slideSide: 'right'
}

export default TabPanel
