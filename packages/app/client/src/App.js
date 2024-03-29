// Creating the theme
import { ThemeProvider, withStyles } from '@material-ui/styles'

import Box from '@material-ui/core/Box'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { getUserInformation } from './actions/authActions'
import Dashboard from './components/dashboard/Dashboard'
import Reports from './components/reports'
import ManualInvite from './components/manual-invite'
// New pages
import GitHubPage from './components/github/GitHubPage'
import { Header } from './components/layout/Header'
import Landing from './components/layout/Landing'
import ModalMessage from './components/modal-message/ModalMessage'
import CreatePollPage from './components/polls/create/CreatePoll'
import About from './components/about'
// Poll pages
import PrivateRoute from './components/private-route/PrivateRoute'
// Project pages
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
  Toast,
  Footer,
  FullPageLoader,
  PageNotFound
} from './ui'

// pages
import {
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  ChangePassword,
  Learn,
  Account,
  Profile,
  WhatsNew
} from './ui/pages'
import projectsRoutes from './routes/projects'
import AdminRoute from './components/admin-route/AdminRoute'
import AdminPanel from './components/admin-panel'

require('./utils/configureRequests')

const App = () => {
  const [userInfoSet, setUserInfoSet] = useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      await getUserInformation()
      setUserInfoSet(true)
    }
    fetchUser()
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {userInfoSet && (
          <Provider store={store}>
            <Box
              display="flex"
              flexDirection="column"
              position="relative"
              height="100%"
              width="100%"
              minHeight="100vh"
              minWidth="100vw"
            >
              <ModalMessage />
              <Header />
              <Toast />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/learn/:tab" component={Learn} />
                <Route exact path="/whatsnew" component={WhatsNew} />
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                />
                <Route
                  exact
                  path="/reset-password/"
                  component={ResetPassword}
                />
                <Route
                  exact
                  path="/change-password"
                  component={ChangePassword}
                />
                {projectsRoutes()}
                <PrivateRoute
                  exact
                  path="/profile/:id/:tab"
                  component={Profile}
                />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/github" component={GitHubPage} />
                <PrivateRoute exact path="/twitter" component={TwitterPage} />
                <PrivateRoute exact path="/profile/:tab" component={Account} />
                <PrivateRoute exact path="/settings" component={Technical} />
                <PrivateRoute exact path="/statistics" component={Stats} />
                <PrivateRoute exact path="/reports" component={Reports} />
                <PrivateRoute exact path="/invite" component={ManualInvite} />
                <PrivateRoute exact path="/about" component={About} />
                <PrivateRoute
                  exact
                  path="/create-projects"
                  component={(props) => <ProjectDetails {...props} editing={false} />}
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
                {/* admin routes */}
                <AdminRoute exact path="/admin" component={AdminPanel} />
                <Route path="*" component={PageNotFound} />
              </Switch>
              <Footer />
              <FullPageLoader />
            </Box>
          </Provider>
        )}
      </Router>
    </ThemeProvider>
  )
}
export default withStyles(globalStyles)(App)
