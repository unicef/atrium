import React from 'react'
import Container from '@material-ui/core/Container'
import { useContainerStyle } from '../hooks'

const MainContainer = ({ size, mt, children, ...props }) => {
  const containerStyle = useContainerStyle({ size, mt })

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
