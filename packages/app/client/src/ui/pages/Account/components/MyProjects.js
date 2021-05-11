import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Loader, SearchListWrapper } from '../../Search/components'
import { useSelector } from 'react-redux'
import {
  getSearchContext,
  getSearchedUserProjects,
  getUserId,
  searchCurrentPage,
  searchSort
} from '../../../../selectors'
import {
  useUserProjectsAsyncActions,
  useSearchActions,
  useIsAuthenticated,
  useProjectViewActions
} from '../../../hooks'
import combineUserItemsQueryStrings from '../../../../utils/combineUserItemsQueryStrings'
import ProjectCard from './ProjectCard'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  greeting: {
    marginBottom: '2%',
    fontSize: '34px'
  }
}))

const MAX_PROJECTS_PER_PAGE = 6
const SEARCH_CONTEXT = 'PROJECTS'

function MyProjects(props) {
  const classes = useStyles()
  const { setCurrentPageContext, resetSearch } = useSearchActions()
  const { setCurrentProject } = useProjectViewActions()
  const history = useHistory()
  const userId = useSelector(getUserId)

  const { fetchSearchedUserProjects } = useUserProjectsAsyncActions()
  const projects = useSelector(getSearchedUserProjects)
  const isUserAuthenticated = useIsAuthenticated()

  const sort = useSelector(searchSort)
  const page = useSelector(searchCurrentPage)
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

  if (!Array.isArray(projects)) return null
  return (
    <>
      <SearchListWrapper
        headerText={`My projects (${projects.length})`}
        sortBy="date"
      >
        {projects.map(project => (
          <ProjectCard
            count={2}
            disableActions={!isUserAuthenticated}
            project={project}
            key={project.id}
            onClick={() => {
              setCurrentProject({ project, userId })
              history.push(`projects/${project.id}`)
            }}
          />
        ))}
        <Loader />
      </SearchListWrapper>
    </>
  )
}

export default MyProjects
