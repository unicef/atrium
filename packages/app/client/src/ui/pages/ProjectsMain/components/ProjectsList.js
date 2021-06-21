import React from 'react'
import combineProjectsQueryStrings from '../../../../utils/combineProjectsQueryStrings'
import { useSelector } from 'react-redux'
import {
  useProjectsAsyncActions,
  useProjectsMainActions,
  useIsAuthenticated,
  useSearchActions,
  useProjectViewActions,
  useQueryParams
} from '../../../hooks'
import {
  getSearchedProjects,
  projectsSearchSelectedFilters,
  searchSort,
  searchCurrentPage,
  getSearchText,
  getSearchContext,
  getUserId,
  getNumberOfPages
} from '../../../../selectors'
import { useHistory } from 'react-router'
import ProjectCard from './ProjectCard'
import { EmptyResults } from '../../../molecules'
import {Grid} from "@material-ui/core";

const MAX_PROJECTS_PER_PAGE = 9
const SEARCH_CONTEXT = 'PROJECTS'

const ProjectsList = ({ WrapperComponent }) => {
  const { fetchSearchedProjects, fetchSearchedProjectsUnreg } = useProjectsAsyncActions()
  const { setCurrentPageContext, resetSearch } = useSearchActions()
  const { setCurrentProject } = useProjectViewActions()
  const { clearFilters } = useProjectsMainActions()
  const history = useHistory()
  const { onChangeParam, getString, getEntriesObj } = useQueryParams()

  const userId = useSelector(getUserId)
  const isUserAuthenticated = useIsAuthenticated()
  const projects = useSelector(getSearchedProjects)
  const filters = useSelector(projectsSearchSelectedFilters)
  const { sort = 'asc', page } = getEntriesObj()
  const pagesCounter = useSelector(getNumberOfPages)
  const searchText = useSelector(getSearchText)
  const searchContextName = useSelector(getSearchContext)

  React.useEffect(() => {
    // TODO: MAKE THE QUERY BE PART OF THE BROWSER URL
    const query = combineProjectsQueryStrings({
      limit: MAX_PROJECTS_PER_PAGE,
      offset: page === 1 ? 0 : (page - 1) * MAX_PROJECTS_PER_PAGE,
      filters,
      sort,
      search: searchText
    })

    if (searchContextName !== SEARCH_CONTEXT) {
      resetSearch()
      setCurrentPageContext(SEARCH_CONTEXT)
    }

    const requestProjects = async () => {
      isUserAuthenticated
        ? await fetchSearchedProjects(query)
        : await fetchSearchedProjectsUnreg(query)
    }

    requestProjects()
  }, [filters, sort, searchText, page])

  if (!Array.isArray(projects)) return null

  const handleHeaderText = () => {
    const hasFilters = Object.keys(filters).length > 0
    if (searchText || hasFilters) {
      if (searchText) return `${projects.length} results "${searchText}"`

      return `${projects.length} results`
    }

    return ''
  }

  const resultsAreEmpty = projects.length === 0

  if (resultsAreEmpty) {
    return (
      <EmptyResults
        handleClick={() => {
          resetSearch()
          setCurrentPageContext(SEARCH_CONTEXT)
          clearFilters()
        }}
        mainMessage="No Projects found"
        buttonLabel="All Projects"
        suggestiontext={'See All Projects or add Projects'}
      />
    )
  }

  return (
    <WrapperComponent
      currentpage={page}
      onChangeParam={onChangeParam}
      getString={getString}
      numberOfPages={pagesCounter}
      withHeader
      headerProps={{
        withPrefix: false,
        name: handleHeaderText(),
        sortDirection: sort,
        sortBy: 'Name'
      }}
    >
      {projects.map(project => (
        <ProjectCard
          disableActions={!isUserAuthenticated}
          id={project.id}
          key={project.id}
          onClick={() => {
            setCurrentProject({ project, userId })
            history.push(`/projects/view/${project.id}/about`)
          }}
        />
      ))}
    </WrapperComponent>
  )
}

export default React.memo(ProjectsList)
