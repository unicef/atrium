import React from 'react'
import Grid from '@material-ui/core/Grid'
import combineProjectsQueryStrings from '../../../../utils/combineProjectsQueryStrings'
import { useSelector } from 'react-redux'
import { useProjectsAsyncActions, useIsAuthenticated, useSearchActions } from '../../../hooks'
import { ProjectVerticalCard } from '../../../organisms'
import { 
  getSearchedProjects,
  projectsSearchSelectedFilters,
  searchSort,
  searchCurrentPage,
  getSearchText,
  getSearchContext
} from '../../../../selectors'
import { useHistory } from 'react-router'

const PAGINATION_LIMIT = 10
const SEARCH_CONTEXT = 'PROJECTS'

const ProjectsList = ({ WrapperComponent }) => {
  const { fetchSearchedProjects, toggleLike } = useProjectsAsyncActions()
  const { setCurrentPageContext, resetSearch } = useSearchActions()
  const history = useHistory()

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
           <Grid item xs={12} sm={4} container justify="center">
             <ProjectVerticalCard
               key={`${project.id}_${index}`}
               commentsCount={project.comments.length}
               likesCount={project.likes.length}
               src={project.attachment}
               onLike={toggleLike}
               disableActions={!isUserAuthenticated}
               onClick={() => history.push(`projects/${project.id}`)}
               {...project}
             />
           </Grid>
         )
       )}
    </WrapperComponent>
  )
}

export default React.memo(ProjectsList)
