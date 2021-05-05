import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Loader, SearchListWrapper } from '../../Search/components'
import { useSelector } from 'react-redux'
import {
  getSearchContext,
  getSearchedUserProjects,
  searchCurrentPage,
  searchSort
} from '../../../../selectors'
import { useUserProjectsAsyncActions, useSearchActions } from '../../../hooks'
import combineUserItemsQueryStrings from '../../../../utils/combineUserItemsQueryStrings'

const useStyles = makeStyles(() => ({
  greeting: {
    marginBottom: '2%',
    fontSize: '34px'
  }
}))

const MAX_PROJECTS_PER_PAGE = 9
const SEARCH_CONTEXT = 'PROJECTS'

function MyProjects(props) {
  const classes = useStyles()
  const { setCurrentPageContext, resetSearch } = useSearchActions()

  const { fetchSearchedUserProjects } = useUserProjectsAsyncActions()
  const projects = useSelector(getSearchedUserProjects)

  const sort = useSelector(searchSort)
  const page = useSelector(searchCurrentPage)
  const searchContextName = useSelector(getSearchContext)

  React.useEffect(() => {
    const query = combineUserItemsQueryStrings({
      limit: MAX_PROJECTS_PER_PAGE,
      offset: page === 1 ? 0 : page * MAX_PROJECTS_PER_PAGE,
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

  if (!Array.isArray(projects)) return null

  return (
    <>
      <SearchListWrapper
        headerText={`My projects (${projects.length})`}
        sortBy="date"
      >
        <div>List</div>
        <Loader />
      </SearchListWrapper>
    </>
  )
}

export default MyProjects
