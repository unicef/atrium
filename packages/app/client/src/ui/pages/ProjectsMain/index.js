import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { useContainerStyle, useProjectsAsyncActions } from '../../hooks'
import { ProjectMainCard } from '../../organisms'
import { SearchBar, SectionHeader, Filters } from './components'
import { makeStyles } from '@material-ui/core/styles'
import { getAllProjects } from '../../../selectors'

const drawerWidth = 240 
const useStyles = makeStyles(theme => ({
  projectsList: {
    justifyContent: 'flex-start',
    [theme.breakpoints.down("xs")]: {
      justifyContent: 'center',
    }
  },
  content: {
    maxWidth: 1200,
    marginTop: 10
  },
  contentShift: {
   
  },
}))

// const projects = new Array(8).fill(
//   {
//     name: 'Lorem Ipsum is simply dummy text of the printing and typesetting ',
//     details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...",
//     owner: 'Paweł Bartosz',
//     createdAt: '22.03.2020',
//     code: 'View Code',
//     imageTitle: 'Random Image',
//     imageAlt: 'Random Image',
//     id: 'random'
//   }
// )

const sections = [{ name: 'Featured Projects', sortable: false }, { name: 'All projects', sortable: true }]

const ProjectsMain = () => {
  const [areFiltersVisible, setFiltersVisibility] = React.useState(false)
  const containerStyle = useContainerStyle({ size: 'regular'})
  const classes = useStyles()
  const { fetchAllProjects } = useProjectsAsyncActions()
  const projects = useSelector(getAllProjects)

  React.useEffect(() => {
    fetchAllProjects()
  }, [])

  return (
    <div style={{ height: 'auto'}}>
      <SearchBar toggleFilters={() => setFiltersVisibility(isVisible => !isVisible)} areFiltersVisible={areFiltersVisible} />
      <div style={{ display: 'flex' }}>

      <div style={{ display: 'flex', flex: 1 }}>
      <div style={{ display: 'flex', flexGrow: areFiltersVisible ? 1 : 0, flexShrink: 1, flexBasis: areFiltersVisible ? '15%' :'0%', transition: 'all 0.3s ease' }} >
        <Filters visible={areFiltersVisible} />
      </div>
        <div style={{ display: 'flex', flexGrow: areFiltersVisible ? 0 : 1, flexShrink: 1, flexBasis: areFiltersVisible ? '0%' :'0%', transition: 'all 0.3s ease' }} />
        <div className={classnames(containerStyle, {
            [classes.contentShift]: areFiltersVisible,
            [classes.content]: true
        })}>
          <Grid item xs={12} container spacing={3} classes={classes.projectsList}>
          {projects.map(
                  (project, index) => (
                    <Grid item xs={12} sm={4} container justify="center">
                      <ProjectMainCard
                        key={`${project.id}_${index}`}
                        commentsCount={project.comments.length}
                        likesCount={project.likes.length}
                        src={project.attachment}
                        {...project}
                      />
                    </Grid>
                  )
                )}
            {/* {sections.map((section) => (
              <>
                <SectionHeader {...section} />
                {projects.map(
                  (project, index) => (
                    <Grid item xs={12} sm={4} container justify="center">
                      <ProjectMainCard
                        key={`${project.id}_${index}`}
                        commentsCount={project.comments.length}
                        likesCount={project.likes.length}
                        src={project.attachment}
                        {...project}
                      />
                    </Grid>
                  )
                )}
              </>
            ))} */}
            
          </Grid>
        </div>
        <div style={{ display: 'flex', flexGrow: 1, flexShrink: 1, flexBasis: areFiltersVisible ? '3%' :'0%', transition: 'all 0.3s ease' }}></div>
      </div>
      {/* <div className={classnames(containerStyle, {
          [classes.contentShift]: areFiltersVisible,
          [classes.content]: true
        })}> */}
          {/* <Grid item xs={12} container spacing={3} classes={classes.projectsList}>
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
            
          </Grid> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default ProjectsMain
