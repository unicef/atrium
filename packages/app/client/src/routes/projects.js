import React from 'react'
import PrivateRoute from './PrivateRoute'
import { Route } from 'react-router-dom'
import { ProjectsMain, ProjectView, ProjectDetails } from '../ui/pages'

const projectsRoutes = () => (
  <Route path="/projects">
    <Route exact path="/projects" component={ProjectsMain} />
   
    <PrivateRoute
      exact
      path="/projects/overview/:id"
      component={(props) => <ProjectDetails {...props} editing={true} />}
    />

    <PrivateRoute
      exact
      path="/projects/view/:id/:tab/:query?"
      component={ProjectView}
    />
  </Route>
)

export default projectsRoutes
