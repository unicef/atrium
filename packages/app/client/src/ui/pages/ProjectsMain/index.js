import React from 'react'
import { ProjectsList, Filters } from './components'
import Search from '../Search'

const ProjectsMain = () => {
  
  return (
    <Search
      Menu={Filters}
      List={ProjectsList}
      title="Projects"
    />
  )
}

export default ProjectsMain
