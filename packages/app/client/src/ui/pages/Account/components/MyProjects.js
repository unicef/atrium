import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Loader } from '../../Search/components'
import { useSelector } from 'react-redux'
import {
  getSearchContext,
  getSearchedUserProjects,
  getUserId,
  getNumberOfPages
} from '../../../../selectors'
import {
  useUserProjectsAsyncActions,
  useSearchActions,
  useIsAuthenticated,
  useProjectViewActions,
  useQueryParams
} from '../../../hooks'
import combineUserItemsQueryStrings from '../../../../utils/combineUserItemsQueryStrings'
import ProjectCard from './ProjectCard'
import { useHistory } from 'react-router-dom'
import { EmptyResults } from '../../../molecules'
import { SearchPaginatedList } from '../../../templates'

const useStyles = makeStyles(() => ({
  button: {
    marginTop: '5%'
  }
}))

const MAX_PROJECTS_PER_PAGE = 6
const SEARCH_CONTEXT = 'PROJECTS'

function MyProjects(props) {
  const classes = useStyles()
  const history = useHistory()

  const { setCurrentPageContext, resetSearch } = useSearchActions()
  const { onChangeParam, getString, getEntriesObj } = useQueryParams()
  const { fetchSearchedUserProjects } = useUserProjectsAsyncActions()
  const { sort = 'asc', page } = getEntriesObj()
  const { setCurrentProject } = useProjectViewActions()

  const userId = useSelector(getUserId)
  const projects = useSelector(getSearchedUserProjects)
  const pagesCounter = useSelector(getNumberOfPages)
  const isUserAuthenticated = useIsAuthenticated()
  const searchContextName = useSelector(getSearchContext)

  React.useEffect(() => {
    const query = combineUserItemsQueryStrings({
      limit: MAX_PROJECTS_PER_PAGE,
      offset: page === 1 ? 0 : (page - 1) * MAX_PROJECTS_PER_PAGE,
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

  if (!Array.isArray(projects) || projects.length === 0)
    return (
      <EmptyResults
        mainMessage="You don’t have any projects yet"
        buttonLabel="Add project"
        handleClick={() => history.push('/create-projects')}
        buttonProps={{ className: classes.button }}
      />
    )

  return (
    <SearchPaginatedList
      currentpage={page}
      onChangeParam={onChangeParam}
      getString={getString}
      numberOfPages={pagesCounter}
      withHeader
      headerProps={{
        withPrefix: false,
        name: `My projects (${projects.length})`,
        sortDirection: sort,
        sortBy: 'Date'
      }}
    >
      {projects.map(project => (
        <ProjectCard
          count={2}
          disableActions={!isUserAuthenticated}
          project={project}
          key={project.id}
          onClick={() => {
            setCurrentProject({ project, userId })
            history.push(`/projects/view/${project.id}/about`)
          }}
        />
      ))}
      <Loader />
    </SearchPaginatedList>
  )
}

export default MyProjects
