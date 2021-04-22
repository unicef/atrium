import React from 'react'
import combineProjectsQueryStrings from '../../../../utils/combineProjectsQueryStrings'
import { useSelector } from 'react-redux'
import { useProjectsAsyncActions, useIsAuthenticated, useSearchActions, useProjectViewActions } from '../../../hooks'
import { 
  getSearchedProjects,
  projectsSearchSelectedFilters,
  searchSort,
  searchCurrentPage,
  getSearchText,
  getSearchContext,
  getUserId
} from '../../../../selectors'
import { useHistory } from 'react-router'
import ProjectCard from './ProjectCard'

const PAGINATION_LIMIT = 10
const SEARCH_CONTEXT = 'PROJECTS'

const ProjectsList = ({ WrapperComponent }) => {
  const { fetchSearchedProjects } = useProjectsAsyncActions()
  const { setCurrentPageContext, resetSearch } = useSearchActions()
  const { setCurrentProject } = useProjectViewActions()
  const history = useHistory()
  
  const userId = useSelector(getUserId)
  const isUserAuthenticated = useIsAuthenticated()
  const projects = useSelector(getSearchedProjects)
  const filters = useSelector(projectsSearchSelectedFilters)
  const sort = useSelector(searchSort)
  const searchText = useSelector(getSearchText)
  const page = useSelector(searchCurrentPage)
  const searchContextName = useSelector(getSearchContext)

  React.useEffect(() => {
    const query = combineProjectsQueryStrings(
      {
        limit: PAGINATION_LIMIT,
        offset: page === 1 ? 0 : page * PAGINATION_LIMIT,
        filters,
        sort,
        search: searchText
      }
    )

    if (searchContextName !== SEARCH_CONTEXT) {
      resetSearch()
      setCurrentPageContext(SEARCH_CONTEXT)
    }

    const requestProjects = async () => {
      await fetchSearchedProjects(query)
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

  return (
    <WrapperComponent numberOfPages={2} headerText={handleHeaderText()}>
      {projects.map(
         (project, index) => (
           <ProjectCard
            disableActions={!isUserAuthenticated}
            id={project.id}
            key={`${project.id}_${index}`}
            onClick={() => {
              history.push(`projects/${project.id}`)
              setCurrentProject({ project, userId })
            }}
          />
         )
       )}
    </WrapperComponent>
  )
}

export default React.memo(ProjectsList)
