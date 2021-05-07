import useHandledRequest from './useHandledRequest'
import useIsAuthenticated from '../useIsAuthenticated'
import * as ProjectApi from '../../../api/projects'
import { useSearchActions, useProjectsMainActions, useProjectViewActions } from '../actions'
import { useSelector } from 'react-redux'
import { getUserId } from '../../../selectors'

const useProjectsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const userId = useSelector(getUserId)
  const { showLoading, dismissLoading, setNumberOfPages } = useSearchActions()
  const { saveSearchedProjects, toggleProjectLike } = useProjectsMainActions()
  const { setCurrentProject, deleteUpdate } = useProjectViewActions()
  const isUserAuthenticated = useIsAuthenticated()

  return {
    fetchSearchedProjects: handledRequest(
      { 
        request: ProjectApi.getAllProjects,
        onSuccess: ({ projects, pageCounter }) => {
          saveSearchedProjects({ projects, registeredUser: isUserAuthenticated, userId })
          setNumberOfPages(pageCounter)
        },
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
    getProjectById: handledRequest(
      { 
        request: ProjectApi.getProject,
        onSuccess: ({ project }) => setCurrentProject({ project: project[0], userId }),
        showFullPageLoading: true
      }
    ),
    deleteUpdate: handledRequest(
      { 
        request: ProjectApi.removeUpdate,
        showFullPageLoading: true,
        successMessage: 'Update successfully removed'
      }
    ),
    addComment: handledRequest(
      { 
        request: ProjectApi.addComment,
        showFullPageLoading: true,
        successMessage: 'Comment successfully added'
      }
    ),
    removeComment: handledRequest(
      { 
        request: ProjectApi.deleteComment,
        showFullPageLoading: true,
        successMessage: 'Comment successfully removed'
      }
    ),
    editComment: handledRequest(
      { 
        request: ProjectApi.editComment,
        showFullPageLoading: true,
        //successMessage: 'Update successfully removed'
      }
    ),
  }
}

export default useProjectsAsyncActions
