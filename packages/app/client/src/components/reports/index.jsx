import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Password from './Password'

export default class Reports extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: ''
    }
  }

  setPassword = password => {
    this.setState({ password })
  }

  render() {
    const { authSuccess } = this.state
    return (
      <Container maxWidth="lg" style={{ height: '100vh' }}>
        <Grid container style={{ marginTop: '5em' }}>
          <Grid item xs={12}>
            <Password
              setPassword={this.setPassword}
              password={this.state.password}
            />
          </Grid>
        </Grid>
      </Container>
    )
  }
}
