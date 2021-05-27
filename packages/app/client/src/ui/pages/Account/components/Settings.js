import React, { useState } from 'react'
import { MainContainer } from '../../../templates'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '../../../atoms'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ActionDialog } from '../../../organisms'
import { deleteUser } from '../../../../api/users'
import { useSearchActions, useUserProjectsAsyncActions } from '../../../hooks'
import { useSelector } from 'react-redux'
import {
  getSearchContext,
  getSearchedUserProjects,
  searchCurrentPage,
  searchSort
} from '../../../../selectors'
import combineUserItemsQueryStrings from '../../../../utils/combineUserItemsQueryStrings'

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
          // onConfirm={() => deleteHandler(props.id)}
          handleClose={() => setOpen(false)}
        />
      </Grid>
    </MainContainer>
  )
}

export default Settings
