import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/styles/makeStyles'

const keccak256 = require('keccak256')

const useStyles = makeStyles(theme => ({
  form: {
    textAlign: 'center',
    marginTop: '2em'
  }
}))

export default function({ setPassword, password }) {
  const classes = useStyles()

  const reportLogin = async () => {
    let res, authSuccessKey
    try {
      res = await fetch(`/api/reports/login`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          password: keccak256(password).toString('hex')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      authSuccessKey = await res.json()
    } catch (e) {
      return console.log(e)
    }

    if (authSuccessKey) {
      const { key } = authSuccessKey
      window.location = `/api/reports/download/${key}`
      setPassword('')
    }

    if (!authSuccessKey) {
      alert('Invalid Password')
      setPassword('')
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} className={classes.form}>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              reportLogin()
            }
          }}
        />
        <br />
        <Button color="primary" onClick={reportLogin}>
          Download Reports
        </Button>
      </Grid>
    </Grid>
  )
}
