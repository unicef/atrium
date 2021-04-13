import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProjectsMain, ProjectViewPage } from '../ui/pages'
import PrivateRoute from './PrivateRoute'

const ProjectsRoute = () => (
  <Switch>
    <Route exact path="/projects" component={ProjectsMain} />
    <PrivateRoute
      path="/projects/:id"
      component={ProjectViewPage}
    />
  </Switch>
)

export default ProjectsRoute
