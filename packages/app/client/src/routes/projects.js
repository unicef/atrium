import React from 'react'
import PrivateRoute from './PrivateRoute'
import ProjectOverviewPage from '../components/projects/overview/ProjectOverviewPage'
import { Route, Switch } from 'react-router-dom'
import { ProjectsMain, ProjectView } from '../ui/pages'

const ProjectsRoute = () => (
  <Switch>
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
  </Switch>
)

export default ProjectsRoute
