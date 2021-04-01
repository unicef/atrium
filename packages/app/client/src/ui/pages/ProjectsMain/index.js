import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { useContainerStyle } from '../../hooks/useStyles'
import { CardWithImage } from '../../organisms'

const ProjectsMain = () => {
  const containerStyle = useContainerStyle({ size: 'regular'})
  
  return (
    <>
      <Grid style={{ border: '2px solid red'}} container xs={12}>

      </Grid>
      <Container style={{ border: '2px solid blue'}} component="main" className={containerStyle}>
        <CardWithImage />
      </Container>
    </>
  )
}

export default ProjectsMain
