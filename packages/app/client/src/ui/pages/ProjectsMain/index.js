import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { useContainerStyle } from '../../hooks/useStyles'
import { ProjectMainCard } from '../../organisms'
import { SearchBar, SectionHeader } from './components'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  projectsList: {
    justifyContent: 'flex-start',
    [theme.breakpoints.down("xs")]: {
      justifyContent: 'center',
    }
  }
}))

const projects = new Array(8).fill(
  {
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting ',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...",
    author: 'Paweł Bartosz',
    date: '22.03.2020',
    code: 'View Code',
    imageTitle: 'Random Image',
    imageAlt: 'Random Image',
    id: 'random'
  }
)

const sections = [{name: 'Featured Projects', sortable: false }, { name: 'All projects', sortable: true }]

const ProjectsMain = () => {
  const containerStyle = useContainerStyle({ size: 'regular'})
  const classes = useStyles()

  return (
    <>
      <SearchBar />
      <Container component="main" className={containerStyle}>
        <Grid container spacing={3} classes={classes.projectsList}>
          {sections.map((section) => (
            <>
              <SectionHeader {...section} />
              {projects.map(
                (project, index) => (
                  <Grid item xs={12} sm={4} container justify="center">
                    <ProjectMainCard
                      key={`${project.id}_${index}`}
                      commentsCount={index * 20}
                      likesCount={index * 25}
                      src={`https://picsum.photos/id/${index * 5}/200/200`}
                      {...project}
                    />
                  </Grid>
                )
              )}
            </>
          ))}
          
        </Grid>
      </Container>
    </>
  )
}

export default ProjectsMain
