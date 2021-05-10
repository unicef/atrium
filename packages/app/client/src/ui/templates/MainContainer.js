import React from 'react'
import Container from '@material-ui/core/Container'
import { useContainerStyle } from '../hooks'

const MainContainer = ({ size, mt, children, margin, ...props }) => {
  const containerStyle = useContainerStyle({ size, mt, margin })

  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters={true}
      className={containerStyle}
      {...props}
    >
      {children}
    </Container>
  )
}

export default MainContainer
