// Creating the theme
import { withStyles } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import jwt_decode from 'jwt-decode'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { logoutUser, setCurrentUser } from './actions/authActions'
import Dashboard from './components/dashboard/Dashboard'
import ErrorPage from './components/ErrorPage/ErrorPage'
import Reports from './components/reports'
import ManualInvite from './components/manual-invite'
// New pages
import GitHubPage from './components/github/GitHubPage'
import { Header } from './components/layout/Header'
import Landing from './components/layout/Landing'
import LearnPage from './components/learn/Learn'
import ModalMessage from './components/modal-message/ModalMessage'
import CreatePollPage from './components/polls/create/CreatePoll'
import About from './components/about'
// Poll pages
import PrivateRoute from './components/private-route/PrivateRoute'
// Project pages
import ProjectOverviewPage from './components/projects/overview/ProjectOverviewPage'
import CreateProject from './components/projects/create/CreateProject'
import ProjectPage from './components/projects/ProjectPage'
import Stats from './components/stats/Stats'
import Technical from './components/technical/Technical'
import TwitterPage from './components/twitter/TwitterPage'
import store from './store'
import {
  globalStyles,
  theme,
  DiscussionPage,
  DiscussionDetails,
  ProjectDetails,
  ProfilePage,
  Toast,
  Footer,
  FullPageLoader
} from './ui'
import setAuthToken from './utils/setAuthToken'

// pages
import { Register, Login, ForgotPassword, ResetPassword, Learn } from './ui/pages'
import ProjectsRoutes from './routes/projects'

require('./utils/configureRequests')

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  // Decode token and get user info and exp
  const decoded = jwt_decode(token)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())

    // Redirect to login
    window.location.href = './login'
  }
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <div style={{ position: 'relative', height: '100%', width: '100%'}}>
            <ModalMessage />
            <Header />
            <Toast />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/learn" component={Learn} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/reset-password/:token" component={ResetPassword} />
              <PrivateRoute exact path="/learn" component={LearnPage} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/github" component={GitHubPage} />
              <PrivateRoute exact path="/twitter" component={TwitterPage} />
              <PrivateRoute exact path="/profile" component={ProfilePage} />
              <PrivateRoute exact path="/settings" component={Technical} />
              <PrivateRoute exact path="/statistics" component={Stats} />
              <PrivateRoute exact path="/reports" component={Reports} />
              <PrivateRoute exact path="/invite" component={ManualInvite} />
              <PrivateRoute exact path="/about" component={About} />
              <PrivateRoute
                exact
                path="/create-projects"
                component={CreateProject}
              />
              <PrivateRoute
                exact
                path="/view-projects"
                component={ProjectPage}
              />
              <PrivateRoute
                exact
                path="/project-overview/:id"
                component={ProjectOverviewPage}
              />
              <PrivateRoute
                exact
                path="/project-details/:id"
                component={ProjectDetails}
              />

              <PrivateRoute exact path="/engage" component={DiscussionPage} />
              <PrivateRoute
                exact
                path="/discussion-details/:id"
                component={DiscussionDetails}
              />
              <PrivateRoute
                exact
                path="/create-polls"
                component={CreatePollPage}
              />
              <ProjectsRoutes />
              <Route component={ErrorPage} />
            </Switch>
            <Footer />
            <FullPageLoader />
          </div>
        </Provider>
      </Router>
    </ThemeProvider>
  )
}
export default withStyles(globalStyles)(App)
