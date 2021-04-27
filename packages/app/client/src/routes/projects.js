import React from 'react'
import PrivateRoute from './PrivateRoute'
import ProjectOverviewPage from '../components/projects/overview/ProjectOverviewPage'
import { Route } from 'react-router-dom'
import { ProjectsMain, ProjectView } from '../ui/pages'

const projectsRoutes = () => (
  <Route path="/projects">
    <Route exact path="/projects" component={ProjectsMain} />
    <PrivateRoute
      exact
      path="/projects/:id"
      component={ProjectView}
    />
   
    <PrivateRoute
      exact
      path="/projects/overview/:id"
      component={ProjectOverviewPage}
    />
  </Route>
)

export default projectsRoutes
