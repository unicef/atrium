import React, { useState } from 'react'
import { MainContainer } from '../../../templates'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '../../../atoms'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ActionDialog, SimpleFormWithHeader } from '../../../organisms'
import { changeUserPassword, deleteUser } from '../../../../api/users'
import {
  useSearchActions,
  useToast,
  useUserProjectsAsyncActions
} from '../../../hooks'
import { useSelector } from 'react-redux'
import {
  getSearchContext,
  getSearchedUserProjects,
  searchCurrentPage,
  searchSort
} from '../../../../selectors'
import combineUserItemsQueryStrings from '../../../../utils/combineUserItemsQueryStrings'
import {
  confirmPassword,
  currentPassword,
  password
} from '../../../../utils/formFields'
import {
  validateConfirmPassword,
  validatePassword
} from '../../../../utils/validators'

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    marginBottom: '7%'
  },
  deleteAccountButton: {
    backgroundColor: 'red',
    width: '475px',
    marginTop: '5%'
  }
}))
const SEARCH_CONTEXT = 'PROJECTS'

function Settings(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [openWish, setOpenWish] = useState(false)
  const [test, setTest] = useState(false)

  const { setCurrentPageContext, resetSearch } = useSearchActions()
  const history = useHistory()

  const { fetchSearchedUserProjects } = useUserProjectsAsyncActions()
  const projects = useSelector(getSearchedUserProjects)

  const sort = useSelector(searchSort)
  const page = useSelector(searchCurrentPage)
  const searchContextName = useSelector(getSearchContext)

  React.useEffect(() => {
    const query = combineUserItemsQueryStrings({
      limit: 1,
      offset: 0,
      sort
    })

    if (searchContextName !== SEARCH_CONTEXT) {
      resetSearch()
      setCurrentPageContext(SEARCH_CONTEXT)
    }

    const requestProjects = async () => {
      await fetchSearchedUserProjects(query)
    }

    requestProjects()
  }, [sort, page])

  React.useEffect(() => {
    if (!Array.isArray(projects) || projects.length === 0) setTest(true)
    else setTest(false)
  }, [projects])

  const deleteHandler = async userId => {
    await deleteUser(userId)
    window.location.reload()
  }

  const fields = [
    currentPassword,
    {
      ...password,
      label: 'New password'
    },
    confirmPassword
  ]

  const validate = ({ password, confirmPassword }) => {
    return {
      ...validatePassword(password),
      ...validateConfirmPassword(password, confirmPassword)
    }
  }

  const { showToast } = useToast()
  const submitHandler = async ({ currentPassword, password }) => {
    try {
      await changeUserPassword(currentPassword, password)
      showToast({ message: 'Password changed', severity: 'success' })
      history.push('profile')
    } catch (e) {
      showToast({ message: e.message, severity: 'danger' })
    }
  }

  return (
    <MainContainer size="small" mt="-50px" margin="0">
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.title}>
          Security
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Change password</Typography>
        <SimpleFormWithHeader
          onSubmit={submitHandler}
          submitLabel="Save"
          fields={fields}
          validate={validate}
        />
      </Grid>
      <Grid item xs={12}>
        <ActionDialog
          open={openWish}
          title="You need to transfer ownership of all your projects first."
          content="By click 'Got it' you will be send to projects page"
          buttonLabel="Got it"
          onConfirm={e => props.handleChange(e, 4)}
          handleClose={() => setOpenWish(false)}
        />
        <Button
          className={classes.deleteAccountButton}
          color="primary"
          onClick={() => {
            if (test) setOpen(true)
            else setOpenWish(true)
          }}
        >
          Delete account
        </Button>
        <ActionDialog
          open={open}
          onConfirm={() => deleteHandler(props.id)}
          handleClose={() => setOpen(false)}
        />
      </Grid>
    </MainContainer>
  )
}

export default Settings
