import useHandledRequest from './useHandledRequest'
import useIsAuthenticated from '../useIsAuthenticated'
import * as ProjectApi from '../../../api/projects'
import {
  useSearchActions,
  useProjectsMainActions,
  useProjectViewActions,
  useCommentsActions
} from '../actions'
import { useSelector } from 'react-redux'
import { getUserId } from '../../../selectors'

const useProjectsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const userId = useSelector(getUserId)
  const { showLoading, dismissLoading, setNumberOfPages } = useSearchActions()
  const { saveSearchedProjects, toggleProjectLike } = useProjectsMainActions()
  const { setCurrentProject } = useProjectViewActions()
  const { saveComments } = useCommentsActions()
  const isUserAuthenticated = useIsAuthenticated()

  return {
    fetchSearchedProjects: handledRequest({
      request: ProjectApi.getAllProjects,
      onSuccess: ({ projects, pageCounter }) => {
        saveSearchedProjects({
          projects,
          registeredUser: isUserAuthenticated,
          userId
        })
        setNumberOfPages(pageCounter)
      },
      specificLoading: {
        show: showLoading,
        dismiss: dismissLoading
      }
    }),
    toggleLike: handledRequest({
      request: ProjectApi.toggleProjectLike,
      onSuccess: ({ project }) => {
        toggleProjectLike(project)
      },
      successMessage: 'Action successfully performed'
    }),
    getProjectById: handledRequest({
      request: ProjectApi.getProject,
      onSuccess: ({ project }) =>
        setCurrentProject({ project: project[0], userId }),
      showFullPageLoading: true
    }),
    getComments: handledRequest({
      request: ProjectApi.getComments,
      onSuccess: res => saveComments(res),
      showFullPageLoading: true
    }),
    // TODO: RE-EVALUATE THE PROJECT UPDATE REQUESTS
    deleteUpdate: handledRequest({
      request: ProjectApi.removeUpdate,
      showFullPageLoading: true,
      successMessage: 'Update successfully removed'
    }),
    transferOwnership: handledRequest({
      request: ProjectApi.transferOwnership,
      onSuccess: () => window.location.reload(),
      showFullPageLoading: true,
      successMessage: 'Ownership successfully transfered'
    }),
    deleteProject: handledRequest({
      request: ProjectApi.deleteProject,
      onSuccess: () => window.location.reload(),
      showFullPageLoading: true,
      successMessage: 'Project successfully deleted'
    }),
    editUpdateBE: handledRequest({
      request: ProjectApi.editUpdate,
      showFullPageLoading: true,
      successMessage: 'Update successfully edited'
    }),
    reportUpdateBE: handledRequest({
      request: ProjectApi.reportUpdate,
      onSuccess: () => window.location.reload(),
      showFullPageLoading: true,
      successMessage: 'Update successfully reported'
    }),
    reportComment: handledRequest({
      request: ProjectApi.reportComment,
      onSuccess: () => window.location.reload(),
      showFullPageLoading: true,
      successMessage: 'Comment successfully reported'
    })
  }
}

export default useProjectsAsyncActions
