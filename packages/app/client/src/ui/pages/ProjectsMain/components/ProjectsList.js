import React from 'react'
import Grid from '@material-ui/core/Grid'
import combineProjectsQueryStrings from '../../../../utils/combineProjectsQueryStrings'
import { useSelector } from 'react-redux'
import { useProjectsAsyncActions, useHandledRequest, useIsAuthenticated } from '../../../hooks'
import { ProjectMainCard } from '../../../organisms'
import { 
  getSearchedProjects,
  projectsSearchSelectedFilters,
  searchSort,
  searchCurrentPage,
  getSearchText
} from '../../../../selectors'
import { toggleProjectLike } from '../../../../api/projects'

const PAGINATION_LIMIT = 10

const ProjectsList = ({ WrapperComponent }) => {
  const { fetchSearchedProjects } = useProjectsAsyncActions()
  const handledRequest = useHandledRequest()

  const isUserAuthenticated = useIsAuthenticated()
  const projects = useSelector(getSearchedProjects)
  const filters = useSelector(projectsSearchSelectedFilters)
  const sort = useSelector(searchSort)
  const searchText = useSelector(getSearchText)
  const page = useSelector(searchCurrentPage)

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
    const requestProjects = async () => {
      await fetchSearchedProjects(query)
    }
    
    requestProjects()
  }, [filters, sort, searchText, page])

  const handleLike = handledRequest({
    request: toggleProjectLike,
    successMessage: 'Action successfully performed'
  })

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
             <ProjectMainCard
               key={`${project.id}_${index}`}
               commentsCount={project.comments.length}
               likesCount={project.likes.length}
               src={project.attachment}
               onLike={handleLike}
               disableActions={!isUserAuthenticated}
               {...project}
             />
           </Grid>
         )
       )}
    </WrapperComponent>
  )
}

export default React.memo(ProjectsList)
