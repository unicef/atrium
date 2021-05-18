import React, { useState } from 'react'
import { MainContainer } from '../../../templates'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '../../../atoms'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { DeleteActionDialog } from '../../../organisms'
import { deleteUser } from '../../../../api/users'

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    marginBottom: '7%'
  },
  changePasswordButton: {
    width: '184px',
    marginBottom: '7%'
  },
  deleteAccountButton: {
    backgroundColor: 'red',
    width: '184px'
  }
}))

function Settings(props) {
  const classes = useStyles()
  const history = useHistory()
  const [open, setOpen] = useState(false)

  const deleteHandler = async userId => {
    // await deleteUser(userId)
    window.location.reload()
  }

  return (
    <MainContainer size="small" mt="-50px" margin="0">
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.title}>
          Security
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes.changePasswordButton}
          color="primary"
          onClick={() => history.push(`change-password`)}
        >
          Change password
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes.deleteAccountButton}
          color="primary"
          onClick={() => setOpen(true)}
        >
          Delete account
        </Button>
        <DeleteActionDialog
          open={open}
          onConfirm={() => deleteHandler(props.id)}
        />
      </Grid>
    </MainContainer>
  )
}

export default Settings
