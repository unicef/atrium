import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { AGENCIES_LIST } from '../../unin-constants'
const keccak256 = require('keccak256')

export default class Reports extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      role: '',
      company: '',
      email: '',
      password: '',
      adminPassword: ''
    }
  }

  setName = e => {
    this.setState({ name: e.target.value })
  }

  setPassword = e => {
    this.setState({ password: e.target.value })
  }

  setEmail = e => {
    this.setState({ email: e.target.value })
  }

  setCompany = e => {
    this.setState({ company: e.target.value })
  }

  setRole = e => {
    this.setState({ role: e.target.value })
  }

  setAdminPassword = e => {
    this.setState({ adminPassword: e.target.value })
  }

  submitUser = async () => {
    let res
    try {
      res = await fetch(`/api/users/invite`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name,
          role: this.state.role,
          company: this.state.company,
          email: this.state.email,
          password: this.state.password,
          adminPassword: keccak256(this.state.adminPassword).toString('hex')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (e) {
      return console.log(e)
    }

    if (res.status === 200) {
      this.setState({
        name: '',
        role: '',
        company: '',
        email: '',
        password: '',
        adminPassword: ''
      })
    } else if (res.status === 403) {
      alert('Admin Password is incorrect')
    }
  }

  render() {
    return (
      <Container maxWidth="lg" style={{ height: '100vh' }}>
        <Grid container style={{ marginTop: '6em' }}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} style={{ textAlign: 'center' }}>
            <TextField
              value={this.state.name}
              label="Full Name"
              onChange={this.setName}
            />
            <br />
            <Select
              name="company"
              vale={this.state.company}
              onChange={this.setCompany}
              style={{ width: 200 }}
            >
              <MenuItem value={''}></MenuItem>
              {AGENCIES_LIST.map(agency => (
                <MenuItem value={agency.shortName}>{agency.shortName}</MenuItem>
              ))}
            </Select>
            <br />
            <TextField
              value={this.state.role}
              label="Role"
              onChange={this.setRole}
            />
            <br />
            <TextField
              value={this.state.email}
              label="Email"
              onChange={this.setEmail}
            />
            <br />
            <TextField
              value={this.state.password}
              label="User Password"
              onChange={this.setPassword}
            />
            <br />

            <TextField
              label="Admin Password"
              value={this.state.adminPassword}
              onChange={this.setAdminPassword}
            />
            <br />
            <Button color="primary" onClick={this.submitUser}>
              Create User
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  }
}
