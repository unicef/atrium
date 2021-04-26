import useHandledRequest from './useHandledRequest'
import useIsAuthenticated from '../useIsAuthenticated'
import * as ProjectApi from '../../../api/projects'
import { useSearchActions, useProjectsMainActions, useProjectViewActions } from '../actions'
import { useSelector } from 'react-redux'
import { getUserId } from '../../../selectors'

const useProjectsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const userId = useSelector(getUserId)
  const { showLoading, dismissLoading } = useSearchActions()
  const { saveSearchedProjects, toggleProjectLike } = useProjectsMainActions()
  const { setCurrentProject } = useProjectViewActions()
  const isUserAuthenticated = useIsAuthenticated()

  return {
    fetchSearchedProjects: handledRequest(
      { 
        request: ProjectApi.getAllProjects,
        onSuccess: ({ projects }) => saveSearchedProjects({ projects, registeredUser: isUserAuthenticated, userId }),
        specificLoading: {
          show: showLoading,
          dismiss: dismissLoading
        }
      }
    ),
    toggleLike: handledRequest(
      { 
        request: ProjectApi.toggleProjectLike,
        onSuccess: ({ project }) => {
          toggleProjectLike(project)
        },
        successMessage: 'Action successfully performed'
      }
    ),
    getProjectById:  handledRequest(
      { 
        request: ProjectApi.getProject,
        onSuccess: ({ project }) => setCurrentProject({ project: project[0], userId }),
        showFullPageLoading: true
      }
    )
  }
}

export default useProjectsAsyncActions
